"use client";
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isToday } from 'date-fns';
import Modal from './Modal';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { Order, Planning } from '@/type';
import { generateClient } from '@aws-amplify/api';
import { createPlanning } from '@/src/graphql/mutations';
import { updatePlanning } from '@/src/graphql/mutations'; // Import the update mutation
import HourView from './HourlyView';
import AddPlanning from './AddPlanning';
import EditPlanning from './EditPlanning';

Amplify.configure(awsconfig);
const client = generateClient();

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  Orders: Order[];
  Planning: Planning[];
  setPlanning: (planning: Planning[]) => void; 
}

type HourFormat = `${number}H${number}`;

const convertToAWSDateFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');

  // Return in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
};

const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose, Orders, Planning, setPlanning }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<HourFormat>();
  const [orderID, setOrderID] = useState<string>('');
  const [showAddPlanning, setShowAddPlanning] = useState<boolean>(false);
  const [showEditPlanning, setShowEditPlanning] = useState<boolean>(false); // New state for edit planning
  const [selectedPlanning, setSelectedPlanning] = useState<Planning | null>(null); // State for selected planning
  const [loading, setLoading] = useState<boolean>(false);

  const createPlanningFunction = async () => {
    if (!selectedDay || !selectedHour || !orderID) return;

    const awsDate = convertToAWSDateFormat(selectedDay);
    console.log("start")
    const input = {
      date: awsDate,
      hour: selectedHour,
      orderID: orderID,
    };

    console.log(input)
    try {
      setLoading(true);
      const result = await client.graphql({
        query: createPlanning,
        variables: { input: input },
      });
      console.log('Planning created:', result);
      const newPlanning = result.data.createPlanning;
      setPlanning((prev) => [...prev, newPlanning]);
      handleBackToCalendar()
    } catch (error) {
      console.error('Error creating planning:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlanning = async (updatedPlanning: Planning) => {
    try {
      const result = await client.graphql({
        query: updatePlanning,
        variables: {
          input: {
            id: updatedPlanning.id,
            date: updatedPlanning.date,
            hour: updatedPlanning.hour,
            orderID: updatedPlanning.orderID,
          },
        },
      });
      console.log('Planning updated:', result);
      setPlanning((prev) =>
        prev.map((plan) => (plan.id === updatedPlanning.id ? updatedPlanning : plan))
      );
      setShowEditPlanning(false);
      setSelectedPlanning(null);
    } catch (error) {
      console.error('Error updating planning:', error);
    }
  };

  const handleDeletePlanning = async (id: string) => {
    try {
      await client.graphql({
        query: /* GraphQL */ `
          mutation DeletePlanning($input: DeletePlanningInput!) {
            deletePlanning(input: $input) {
              id
            }
          }
        `,
        variables: { input: { id: id } },
      });
      console.log('Planning deleted');
      setPlanning((prev) => prev.filter((plan) => plan.id !== id));
      setShowEditPlanning(false);
      setSelectedPlanning(null);
    } catch (error) {
      console.error('Error deleting planning:', error);
    }
  };

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const startOfCalendar = startOfWeek(startOfCurrentMonth);
  const endOfCalendar = endOfWeek(endOfCurrentMonth);

  const daysInMonth = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setShowAddPlanning(false);
  };

  const handleBackToCalendar = () => {
    setSelectedDay(null);
    setShowAddPlanning(false);
  };

  const handlePlanningClick = (planning: Planning) => {
    setSelectedPlanning(planning);
    setShowEditPlanning(true);
  };

  const OrderNameById = (id: string) => {
    let order = Orders.find((item) => item.id === id);
    return order ? order.nom : null;
  };

  const renderCalendar = () => (
    <>
      <div className="h-[70px] w-full border-b border-gray-400 bg-gray-50 rounded-tl-md rounded-tr-md flex items-center justify-between px-5 text-gray-700">
        <button onClick={handlePrevMonth} className="text-blue-500">&lt;</button>
        <h1 className="text-2xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h1>
        <button onClick={handleNextMonth} className="text-blue-500">&gt;</button>
      </div>

      <div className="w-full grid grid-cols-7 text-center border-b border-gray-400 text-gray-700 font-semibold">
        {daysOfWeek.map((day) => (
          <div key={day} className={`py-2 border-r border-gray-400 ${day === 'Sat' ? 'border-r-0' : ''}`}>
            {day}
          </div>
        ))}
      </div>

      <div className="w-full grid grid-cols-7 text-center">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`relative border border-gray-100 h-28 ${
              !isSameMonth(day, currentDate) ? 'bg-gray-100' : ''
            } ${isToday(day) ? 'bg-yellow-100' : ''}`}
           >
            <span className="absolute top-0 left-0 px-2 py-1 text-gray-500 font-medium" onClick={() => handleDayClick(day)}>{format(day, 'd')}</span>
            <div className="absolute bottom-5 w-full flex flex-col items-center">
              {Planning.filter((plan) => convertToAWSDateFormat(day) === plan.date).map((plan) => (
                <button
                  key={plan.id}
                  className="w-3/4 h-8 bg-green-600 rounded-sm text-white flex items-center justify-center mb-1 hover:bg-green-800"
                  onClick={() => handlePlanningClick(plan)}
                >
                  <span>{OrderNameById(plan.orderID)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <button
        onClick={onClose}
        className="bg-red-500 text-white w-16 h-10 rounded-sm mt-[-100px]"
      >
        CLOSE
      </button>
      <div className="w-11/12 min-w-[900px] border border-gray-400 mt-2 flex flex-col rounded-md bg-white">
        {showEditPlanning && selectedPlanning ? (
          <EditPlanning
            planning={selectedPlanning}
            onClose={() => setShowEditPlanning(false)}
            onEdit={handleEditPlanning}
            onDelete={handleDeletePlanning}
            Orders={Orders}
          />
        ) : selectedDay && !showAddPlanning ? (
          <HourView
            selectedDay={selectedDay}
            handleBackToCalendar={handleBackToCalendar}
            onClose={onClose}
            setShowAddPlanning={setShowAddPlanning}
            setSelectedHour={setSelectedHour}
            selectedHour={selectedHour}
          />
        ) : showAddPlanning ? (
          <AddPlanning
            selectedDay={selectedDay}
            setShowAddPlanning={setShowAddPlanning}
            Orders={Orders}
            selectedHour={selectedHour}
            createPlanningFunction={createPlanningFunction}
            loading={loading}
            orderID={orderID}
            setOrderID={setOrderID}
            handleBackToCalendar={handleBackToCalendar}
          />
        ) : (
          renderCalendar()
        )}
      </div>
    </Modal>
  );
};

export default Calendar;
