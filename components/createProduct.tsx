import React, { useState } from 'react';
import Modal from "./Modal";
import awsconfig from '../src/aws-exports';
import { Amplify } from 'aws-amplify';
import { createProduct } from '@/src/graphql/mutations';
import { generateClient } from '@aws-amplify/api';

Amplify.configure(awsconfig);
const client = generateClient();

interface CreateProductProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'productName') {
      setProductName(value);
    } else if (name === 'productPrice') {
      setProductPrice(value);
    } else if (name === 'productDescription') {
      setProductDescription(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
    
        const result = await client.graphql({
          query: createProduct,
          variables: {
            input: {
                name: productName,
                price: productPrice,
               }
          }
        });
 
      console.log('Product created:', result);
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
        <h2 className="mb-4 text-lg font-semibold">Create a New Product</h2>
        <input
          type="text"
          id="productName"
          name="productName"
          value={productName}
          onChange={handleInputChange}
          className="w-80 h-14 border rounded-sm mb-3 p-2 outline-none"
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          id="productPrice"
          name="productPrice"
          value={productPrice}
          onChange={handleInputChange}
          className="w-80 h-14 border rounded-sm mb-3 p-2 outline-none"
          placeholder="Product Price"
          required
        />
        <input
          type="text"
          id="productDescription"
          name="productDescription"
          value={productDescription}
          onChange={handleInputChange}
          className="w-80 h-14 border rounded-sm mb-3 p-2 outline-none"
          placeholder="Product Description"
          required
        />
        <div className="mt-4 flex justify-end">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
            {loading ? 'Creating...' : 'Create Product'}
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

export default CreateProduct;
