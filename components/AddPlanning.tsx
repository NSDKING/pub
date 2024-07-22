import { Order } from '@/type';
import React, { useState } from 'react';

type HourFormat = `${number}H${number}`;


interface AddPlanningProps {
  selectedDay: Date | null;
  setShowAddPlanning: (show: boolean) => void;
  Orders: Order[];
  selectedHour: HourFormat | undefined;
  createPlanningFunction: () => void;
  handleBackToCalendar: () => void;
  loading: boolean;
  orderID:any;
  setOrderID:any;
}

const AddPlanning: React.FC<AddPlanningProps> = ({
  selectedDay,
  setShowAddPlanning,
  Orders,
  selectedHour,
  createPlanningFunction,
  loading,
  orderID,
  setOrderID
}) => {
 
  if (!selectedDay) return null;

  return (
    <div>
      <div className="h-[70px] w-full border-b border-gray-400 bg-gray-50 rounded-tl-md rounded-tr-md flex items-center justify-between px-5 text-gray-700">
        <button onClick={() => setShowAddPlanning(false)} className="text-blue-500">
          &lt; Back to Hourly View
        </button>
        <h1 className="text-2xl font-semibold">Add Planning</h1>
      </div>

      <div className="p-4">
        <select
          className="w-full mb-4 outline-none"
          value={orderID}
          onChange={(e) => setOrderID(e.target.value)}
        >
          <option value="">Select Order</option>
          {Orders.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nom}
            </option>
          ))}
        </select>
        <button
          onClick={createPlanningFunction}
           className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {loading ? 'Creating...' : 'Create Planning'}
        </button>
      </div>
    </div>
  );
};

export default AddPlanning;
