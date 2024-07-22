import React, { useState } from 'react';
import { format } from 'date-fns';

interface HourViewProps {
  selectedDay: Date | null;
  handleBackToCalendar: () => void;
  onClose: () => void;
  setShowAddPlanning:any;
  setSelectedHour:any;
  selectedHour:any;
}

const HourView: React.FC<HourViewProps> = ({ selectedDay, handleBackToCalendar, onClose, setShowAddPlanning, setSelectedHour, selectedHour }) => {
  
  if (!selectedDay) return null;

  // Create an array of hours with 25-minute increments
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push(`${i}H00`);
    times.push(`${i}H25`);
  }

  return (
    <div>
      <div className="h-[70px] w-full border-b border-gray-400 bg-gray-50 rounded-tl-md rounded-tr-md flex items-center justify-between px-5 text-gray-700">
        <button onClick={handleBackToCalendar} className="text-blue-500">
          &lt; Back to Calendar
        </button>
        <h1 className="text-2xl font-semibold">
          {format(selectedDay, 'MMMM d, yyyy')}
        </h1>
        <button onClick={onClose} className="text-red-500">
          ✕
        </button>
      </div>

      <div className="w-full max-h-[500px] overflow-y-auto border-b border-gray-400 text-gray-700">
        <div className="w-full grid grid-cols-1 text-center">
          {times.map((time, index) => (
            <div
              key={index}
              className={`border-b border-gray-400 py-2 ${selectedHour === time ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedHour(time)}
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={() => setShowAddPlanning(true)}
          disabled={!selectedHour}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Planning
        </button>
      </div>
    </div>
  );
};

export default HourView;
