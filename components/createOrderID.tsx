import React, { useState } from 'react';
import Modal from "./Modal";
import awsconfig from '../src/aws-exports';
import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import { Order, Product } from '@/type';

Amplify.configure(awsconfig);
const client = generateClient();

interface CreateOrderProps {
  isOpen: boolean;
  onClose: () => void;
  AdvertisersID: string;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  Orders: Order[];
  products: Product[];
}

const CreateOrderID: React.FC<CreateOrderProps> = ({
  isOpen,
  onClose,
  AdvertisersID,
  setOrders,
  Orders,
  products
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [diff, setDiff] = useState(false);
  const [attente, setAttente] = useState(false);
  const [nondiff, setNondiff] = useState(false);
  const [ProductID, setProductID] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      // Find the selected product
      const selectedProduct = products.find(item => item.id === ProductID);

      // Prepare input for GraphQL mutation
      const input = {
        annonceursID:AdvertisersID,
        nom:name,
        diff:diff,
        attente:attente,
        nondiff:nondiff,
        duration:duration,
        file:file,
      };
      console.log(input)
      // Execute GraphQL mutation
      const result = await client.graphql({
        query: createOrder,
        variables: {
          input: input
        }
      });

      const updateProd = await client.graphql({
        query: updateProduct,
        variables: { input:{
          id:ProductID, 
          orderID:result.data.createOrder.id
        } },
      })
 

      // Update local state with new order
      //setOrders([...Orders, newInput]);
      console.log(updateProd)
      onClose(); // Close modal after successful creation
    } catch (error) {
      console.log('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-lg font-semibold">Create a New Order</h2>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <input
            type="text"
            className="w-full h-full p-2 outline-none"
            placeholder="Order Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <select
            className="w-72 m-2 outline-none"
            value={ProductID}
            onChange={(e) => setProductID(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <input
            type="text"
            className="w-full h-full p-2 outline-none"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <input
            type="text"
            className="w-full h-full p-2 outline-none"
            placeholder="File"
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>

        <div className="w-80 flex items-center mb-4">
          <label className="mr-2">Diffusé:</label>
          <input
            type="checkbox"
            checked={diff}
            onChange={(e) => setDiff(e.target.checked)}
          />
        </div>

        <div className="w-80 flex items-center mb-4">
          <label className="mr-2">en attente:</label>
          <input
            type="checkbox"
            checked={attente}
            onChange={(e) => setAttente(e.target.checked)}
          />
        </div>

        <div className="w-80 flex items-center mb-4">
          <label className="mr-2">Non Diffusé:</label>
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

export default CreateOrderID;

const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      annonceursID
      nom
      diff
      attente
      nondiff
      duration
      file
    }
  }
`;

const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      price
      name
      Campagnes {
        nextToken
        __typename
      }
      orderID
      createdAt
      updatedAt
      __typename
    }
  }
`;