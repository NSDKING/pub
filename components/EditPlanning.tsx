import { Order, Planning } from '@/type';
import React, { useState } from 'react';
import { generateClient } from '@aws-amplify/api';
import { deletePlanning, updatePlanning } from '@/src/graphql/mutations'; // Import your mutation

const client = generateClient();

interface EditPlanningProps {
  planning: Planning;
  onClose: () => void;
  onEdit: (updatedPlanning: Planning) => void;
  onDelete: (id: string) => void;
  Orders: Order[];
}

const EditPlanning: React.FC<EditPlanningProps> = ({ planning, onClose, onEdit, onDelete, Orders }) => {
  const [updatedPlanning, setUpdatedPlanning] = useState(planning);
  const [selectedOrder, setSelectedOrder] = useState(planning.orderID);

  const handleEdit = async () => {
    try {
      const result = await client.graphql({
        query: updatePlanning,
        variables: {
          input: {
            id: updatedPlanning.id,
            date: updatedPlanning.date,
            hour: updatedPlanning.hour,
            orderID: selectedOrder,
          },
        },
      });
      console.log('Planning updated:', result);
      onEdit(updatedPlanning); // Notify parent component
    } catch (error) {
      console.error('Error updating planning:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await client.graphql({
        query: deletePlanning,
        variables: {
          input: { id: planning.id },
        },
      });
      console.log('Planning deleted');
      onDelete(planning.id); // Notify parent component
    } catch (error) {
      console.error('Error deleting planning:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedPlanning(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'orderID') {
      setSelectedOrder(value);
    }
  };

  const OrderNameById = (id: string) => {
    let order = Orders.find((item) => item.id === id);
    return order ? order.nom : null;
  };

  return (
    <div className="p-4 bg-white border border-gray-400 rounded-md shadow-lg">
      <h2 className="text-lg font-semibold">Edit Planning</h2>
      <div className="mt-2">
        <div className="mb-2">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={updatedPlanning.date}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Hour:</label>
          <input
            type="text"
            name="hour"
            value={updatedPlanning.hour}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Order:</label>
          <select
            name="orderID"
            value={selectedOrder}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
          >
            {Orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.nom}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded">Delete</button>
        <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default EditPlanning;
