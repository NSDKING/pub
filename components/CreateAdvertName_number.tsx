import React, { useState } from 'react';
import Modal from "./Modal";
import { createAnnonceurs } from '@/src/graphql/mutations'; // Import your mutation
import { generateClient } from '@aws-amplify/api'; // Import your client generation method
import awsconfig from '../src/aws-exports'; // Import your AWS config
import { Amplify } from 'aws-amplify';

// Configure AWS Amplify
Amplify.configure(awsconfig);
const client = generateClient();

interface AddDataProps {
  isOpen: boolean;
  onClose: () => void;
  Name: string;
  setName: (name: string) => void;
  number: number;
  setNumber: (number: number) => void;
  userID:string,
  mail:string,
}

const AddDataAdvertisers: React.FC<AddDataProps> = ({ isOpen, onClose, Name, setName, number, setNumber,userID,mail }) => {
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await client.graphql({
        query: createAnnonceurs,
        variables: { 
          input: { 
            id: userID,
            name: Name, 
            number: number,
            mail:mail,
            // Include other necessary fields here
          }
        }
      });
      console.log('Annonceur created:', result.data.createAnnonceurs);
      onClose(); // Close the modal after successful creation
    } catch (error) {
      console.error('Error creating annonceur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-lg font-semibold">Quelques informations</h2>
        
        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <input
            type="text"
            value={Name}
            onChange={handleNameChange}
            className="w-full h-full p-2 outline-none"
            placeholder="Nom"
          />
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <input
            type="number"
            value={number}
            onChange={handleNumberChange}
            className="w-full h-full p-2 outline-none"
            placeholder="Numero"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
          <button
            type="button"
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

export default AddDataAdvertisers;
