import React, { useState } from 'react';
import Image from 'next/image';
import edit from '../assets/edit.png';
import save from '../assets/save.png';
import close from '../assets/close.png';
import trash from '../assets/trash.png';
import { updateCampagne, deleteCampagne } from '@/src/graphql/mutations';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { Annonceur, CampagneType, Order, Product } from '@/type';
import Link from 'next/link';
import { generateClient } from '@aws-amplify/api';

Amplify.configure(awsconfig);
const client = generateClient();

interface CampagneRowProps {
  campagne: CampagneType;
  Advertisers: Annonceur[];
  Orders: Order[];
  Products: Product[];
  getAdvertisersName: (id: string) => string;
  getProductName: (id: string) => string;
  setCampagnes: any;
  campagneList: CampagneType[];
}

const CampagneRow: React.FC<CampagneRowProps> = ({
  campagne,
  Advertisers,
  Orders,
  Products,
  setCampagnes,
  campagneList,
  getAdvertisersName,
  getProductName,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<CampagneType>(campagne);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (fieldName: keyof CampagneType, value: any) => {
    setEditValue({ ...editValue, [fieldName]: value });
  };
  
  const getOrdersName = (id: string): string => {
    const foundOrder = Orders.find((item) => item.id === id);
    return foundOrder ? foundOrder.nom : 'Unknown';
  };
  

  const updateCampagneFunction = async () => {
    setLoading(true);
    try {
      const input = {
        id: editValue.id,
        annonceursID: editValue.annonceursID,
        Nom: editValue.Nom,
        periode: editValue.periode,
        orderID: editValue.orderID,
        productID: editValue.productID,
      };

      console.log(input);
      const result = await client.graphql({
        query: updateCampagne,
        variables: { input },
      });
      // Update the order in the OrderList
      const updatedCampagnes = campagneList.map((item) =>
        item.id === campagne.id ? { ...item, ...editValue } : item
      );
      setCampagnes(updatedCampagnes);
    } catch (error) {
      console.error('Error updating Campagne:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateCampagneFunction();
      setEditMode(false); // Exit edit mode on successful save
    } catch (error) {
      console.error('Error saving Campagne:', error);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const input = { id: campagne.id };
      await client.graphql({
        query: deleteCampagne,
        variables: { input },
      });
      const updatedCampagnes = campagneList.filter((item) => item.id !== campagne.id);
      setCampagnes(updatedCampagnes);
    } catch (error) {
      console.error('Error deleting Campagne:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={campagne.id}>
      <td className="py-2 px-4 border relative">{campagne.id}</td>
      <td className="py-2 px-4 border">
        {!editMode && <Link href={`/advertiser/${campagne.annonceursID}`}>{getAdvertisersName(campagne.annonceursID)}</Link>}
        {editMode && (
          <select
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.annonceursID}
            onChange={(e) => handleInputChange('annonceursID', e.target.value)}
          >
            <option value="">Select Advertiser</option>
            {Advertisers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.Nom}
              </option>
            ))}
          </select>
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && campagne.Nom}
        {editMode && (
          <input
            type="text"
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.Nom}
            onChange={(e) => handleInputChange('Nom', e.target.value)}
          />
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && getOrdersName(campagne.orderID)}
        {editMode && (
          <select
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.orderID}
            onChange={(e) => handleInputChange('orderID', e.target.value)}
          >
            <option value="">Select Order</option>
            {Orders.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))}
          </select>
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && getProductName(campagne.productID)}
        {editMode && (
          <select
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.productID}
            onChange={(e) => handleInputChange('productID', e.target.value)}
          >
            <option value="">Select Product</option>
            {Products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        )}
      </td>
      <td className="py-2 px-4 border">
        {!editMode && campagne.periode}
        {editMode && (
          <input
            type="text"
            className="w-full p-2 rounded-sm outline-none"
            value={editValue.periode}
            onChange={(e) => handleInputChange('periode', e.target.value)}
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
            <button className="text-green-600" onClick={handleSave}>
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

export default CampagneRow;
