import React, { useState } from 'react';
import Modal from "./Modal";
import awsconfig from '../src/aws-exports';
import { Amplify } from 'aws-amplify';
import { createAnnonceurs } from '@/src/graphql/mutations';
import { generateClient } from '@aws-amplify/api';

Amplify.configure(awsconfig);
const client = generateClient();

interface CreateAdvertisersProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAdvertiser: React.FC<CreateAdvertisersProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [mail, setMail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (name === 'mail') {
      setMail(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
        const input = {
            Nom: name,
            numero: parseInt(phoneNumber,10),
            mail: mail,
        }
      console.log(input)
      const result = await client.graphql({
        query: createAnnonceurs,
        variables: {
          input: input
        }
      });
      console.log('Advertiser created:', result);
      
      onClose();
    } catch (error) {
      console.error('Error creating advertiser:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
        <h2 className="mb-4 text-lg font-semibold">Create a New Advertiser</h2>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="w-80 h-14 border rounded-sm mb-3 p-2 outline-none"
          placeholder="Name"
          required
        />
        <input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleInputChange}
          className="w-80 h-14 border rounded-sm mb-3 p-2 outline-none"
          placeholder="Phone Number"
          required
        />
        <input
          type="email"
          id="mail"
          name="mail"
          value={mail}
          onChange={handleInputChange}
          className="w-80 h-14 border rounded-sm mb-3 p-2 outline-none"
          placeholder="Email"
          required
        />
        <div className="mt-4 flex justify-end">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
            {loading ? 'Creating...' : 'Create Advertiser'}
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

export default CreateAdvertiser;
