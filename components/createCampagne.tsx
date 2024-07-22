import React, { useState } from 'react';
import Modal from './Modal'; // Adjust path as per your project structure
import { createCampagne } from '@/src/graphql/mutations';
import awsconfig from '../src/aws-exports';
import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import { CreateCampagneProps } from '@/type';

Amplify.configure(awsconfig);
const client = generateClient();

 
const CreateCampagne: React.FC<CreateCampagneProps> = ({
  isOpen,
  onClose,
  Advertisers,
  Orders,
  Products,
  Campagnes,
  setCampagnes,
}) => {
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState('');
  const [annonceur, setAnnonceur] = useState('');
  const [commande, setCommande] = useState('');
  const [produit, setProduit] = useState('');
  const [periode, setPeriode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    const input= {
      Nom: nom,
      periode: periode,
      annonceursID: annonceur,
      orderID: commande,
      productID: produit
    }
    console.log(input)
    setLoading(true);
    try {
      const result = await client.graphql({
        query: createCampagne,
        variables: {
          input: input,
        }
      });
      console.log('Campagne created:', result);
      setCampagnes([...Campagnes, input]);
      onClose();
    } catch (error) {
      console.error('Error creating campagne:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="text-center" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4">Add a Campagne</h2>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <input
            className="w-72 h-9 outline-none"
            placeholder="Name"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <select
            className="w-72 m-2 outline-none"
            value={annonceur}
            onChange={(e) => setAnnonceur(e.target.value)}
          >
            <option value="">Select Annonceur</option>
            {Advertisers.map((advertiser) => (
              <option key={advertiser.id} value={advertiser.id}>
                {advertiser.Nom}
              </option>
            ))}
          </select>
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <select
            className="w-72 m-2 outline-none"
            value={commande}
            onChange={(e) => setCommande(e.target.value)}
          >
            <option value="">Select Commande</option>
            {Orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <select
            className="w-72 m-2 outline-none"
            value={produit}
            onChange={(e) => setProduit(e.target.value)}
          >
            <option value="">Select Produit</option>
            {Products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-80 h-10 border-2 rounded-md mb-4">
          <input
            className="w-72 h-9 outline-none"
            placeholder="Période"
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {loading ? 'Saving...' : 'Save'}
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

export default CreateCampagne;
