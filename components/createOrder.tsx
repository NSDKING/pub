import React, { useState } from 'react';
import Modal from "./Modal";
import awsconfig from '../src/aws-exports';
import { Amplify } from 'aws-amplify';
import { createOrder } from '@/src/graphql/mutations';
import { generateClient } from '@aws-amplify/api';
import { Order } from '@/type';

Amplify.configure(awsconfig);
const client = generateClient();

interface CreateOrderProps {
  isOpen: boolean;
  onClose: () => void;
  Advertisers: any[];
  setOrders:any;
  Orders:Order[];

}

const CreateOrder: React.FC<CreateOrderProps> = ({ isOpen, onClose, Advertisers, setOrders, Orders}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [diff, setDiff] = useState(false);
  const [attente, setAttente] = useState(false);
  const [nondiff, setNondiff] = useState(false);
  const [selectedAdvertiserId, setSelectedAdvertiserId] = useState<string>(''); // State to store selected advertiser ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const input = {
      nom: name,
      diff: diff,
      attente: attente,
      nondiff: nondiff,
      annonceursID: selectedAdvertiserId
    }
    try {
      const result = await client.graphql({
        query: createOrder,
        variables: {
          input: input,
        }
      });
      setOrders([...Orders, input]);
      console.log('Order created:', result.data.createOrder);
      onClose();
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedAdvertiserId(selectedId); // Update selected advertiser ID state
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-lg font-semibold">Create a New Order</h2>
        
        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <select
            className="w-72 m-2 outline-none"
            onChange={handleSelectChange}
            value={selectedAdvertiserId} // Ensure selected value is controlled
          >
            <option value="">Select Advertiser</option>
            {Advertisers.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.Nom}
              </option>
            ))}
          </select>
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <input
            type="text"
            className="w-full h-full p-2 outline-none"
            placeholder="Order Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-80 flex items-center mb-4">
          <label className="mr-2">Diffused:</label>
          <input
            type="checkbox"
            checked={diff}
            onChange={(e) => setDiff(e.target.checked)}
          />
        </div>

        <div className="w-80 flex items-center mb-4">
          <label className="mr-2">Waiting:</label>
          <input
            type="checkbox"
            checked={attente}
            onChange={(e) => setAttente(e.target.checked)}
          />
        </div>

        <div className="w-80 flex items-center mb-4">
          <label className="mr-2">Not Diffused:</label>
          <input
            type="checkbox"
            checked={nondiff}
            onChange={(e) => setNondiff(e.target.checked)}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button className="bg-green-600 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded mr-2">
            {loading ? 'Creating...' : 'Create Order'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
 
      </form>
    </Modal>
  );
};

export default CreateOrder;
