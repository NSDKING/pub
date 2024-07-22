import React, { useState } from 'react';
import Image from 'next/image';
import edit from '../assets/edit.png';
import save from '../assets/save.png';
import close from '../assets/close.png';
import trash from '../assets/trash.png';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { Order, Product } from '@/type';
import { generateClient } from '@aws-amplify/api';
import { deleteOrder, updateOrder, updateProduct } from '@/src/graphql/mutations';

Amplify.configure(awsconfig);
const client = generateClient();

interface OrderRowProps {
  order: Order;
  products: Product[];
  OrderList: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  products,
  OrderList,
  setOrders,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<Order>(order);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (fieldName: keyof Order, value: any) => {
    setEditValue({ ...editValue, [fieldName]: value });
  };
  const updateOrderFunction = async () => {
    setLoading(true);
    try {
      const input = {
        id: editValue.id,
        nom: editValue.nom,
        duration: editValue.duration,
        file: editValue.file,
        diff: editValue.diff,
        attente: editValue.attente,
        nondiff: editValue.nondiff,
      };
  
      if (editValue.productID !== order.Products.items[0].id) {
        // Detach the previous product
        await client.graphql({
          query: updateProduct,
          variables: {
            input: {
              id: order.Products.items[0].id,
              orderID: null,
            },
          },
        });
  
        // Attach the new product
        await client.graphql({
          query: updateProduct,
          variables: {
            input: {
              id: editValue.productID,
              orderID: order.id,
            },
          },
        });
      }
  
      console.log('Update Input:', input);
      const result = await client.graphql({
        query: updateOrder,
        variables: { input },
      });
      console.log('Order updated successfully:', result);
  
      // Find the new product details
      const newProduct = products.find(item => item.id === editValue.productID);
  
      // Update the order in the OrderList, including the new product details
      const updatedOrders = OrderList.map((item) =>
        item.id === order.id ? { ...item, ...editValue, Products: { items: [newProduct] } } : item
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.log('Error updating order:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async () => {
    try {
      await updateOrderFunction();
      setEditMode(false); // Exit edit mode on successful save
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await client.graphql({
        query: deleteOrder,
        variables: { input: { id: order.id } },
      });
      console.log('Order deleted successfully:', result);

      // Remove the order from OrderList
      const updatedOrders = OrderList.filter(item => item.id !== order.id);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <tr key={order.id}>
      <td className="py-2 px-4 border">
        {!editMode && order.Products?.items && order.Products.items.length > 0 && (
          <>{order.Products.items[0].name}</>
        )}
        {editMode && (
          <select
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.productID}
            onChange={(e) => handleInputChange('productID', e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && order.nom}
        {editMode && (
          <input
            type="text"
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.nom}
            onChange={(e) => handleInputChange('nom', e.target.value)}
          />
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && order.duration}
        {editMode && (
          <input
            type="text"
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
          />
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && order.file}
        {editMode && (
          <input
            type="text"
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.file}
            onChange={(e) => handleInputChange('file', e.target.value)}
          />
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && (order.diff ? 'Oui' : 'Non')}
        {editMode && (
          <input
            type="checkbox"
            className="w-full p-2 rounded-sm outline-none"
            checked={editValue.diff}
            onChange={(e) => handleInputChange('diff', e.target.checked)}
          />
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && (order.attente ? 'Oui' : 'Non')}
        {editMode && (
          <input
            type="checkbox"
            className="w-full p-2 rounded-sm outline-none"
            checked={editValue.attente}
            onChange={(e) => handleInputChange('attente', e.target.checked)}
          />
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && (order.nondiff ? 'Oui' : 'Non')}
        {editMode && (
          <input
            type="checkbox"
            className="w-full p-2 rounded-sm outline-none"
            checked={editValue.nondiff}
            onChange={(e) => handleInputChange('nondiff', e.target.checked)}
          />
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && (
          <>
            <button className="text-green-600" onClick={() => setEditMode(true)}>
              <Image src={edit} alt="edit Icon" width={22} height={22} />
            </button>
            <button className="text-red-600" onClick={handleDelete}>
              <Image src={trash} alt="trash Icon" width={22} height={22} />
            </button>
          </>
        )}
        {editMode && (
          <div className="flex">
            <button className="text-green-600" onClick={handleSave} disabled={loading}>
              <Image src={save} alt="Save Icon" width={22} height={22} />
            </button>
            <button className="text-green-600" onClick={() => setEditMode(false)}>
              <Image src={close} alt="Close Icon" width={22} height={22} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
 