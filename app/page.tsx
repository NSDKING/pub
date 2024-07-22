"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { listAnnonceurs, listCampagnes, listProducts } from '../src/graphql/queries';
import search_icon from "../assets/search.png";
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../src/aws-exports';
import CreateCampagne from "@/components/createCampagne";
import CreateProduct from "@/components/createProduct";
import CreateAdvertiser from "@/components/createAdvertiser";
import CreateOrder from "@/components/createOrder";
import CampagneRow from "@/components/CampagneRow";
import { CampagneType, Order } from "@/type";

Amplify.configure(awsconfig);
const client = generateClient();

 

const initialCampagneState: CampagneType = {
  id: "",
  annonceursID: "",
  Nom: "",
  periode: "",
  orderID: "",
  productID: "",
  createdAt: "",
  updatedAt: "",
  __typename: ""
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [Campagnes, setCampagnes] = useState<CampagneType[]>([]);
  const [Advertisers, setAdvertisers] = useState([]);
  const [Orders, setOrders] = useState<Order>([]);
  const [Products, setProducts] = useState([]);
  const [createProduct, setCreateProduct] = useState(false);
  const [createAdvertiser, setCreateAdvertiser] = useState(false);
  const [createOrder, setCreateOrder] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<CampagneType>(initialCampagneState); // Initialize with initialCampagneState
  const [newCampagne, setNewCampagne] = useState<CampagneType>({
    id: "",
    annonceur: "",
    Nom: "",
    commande: 0,
    produit: "",
    periode: "",
    createdAt: "",
    updatedAt: "",
    __typename: ""
  });
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleEdit = (campagne: CampagneType) => {
    setEditValue(campagne);
    setEditMode(true);
  };

  const handleNewCampagneChange = (fieldName: keyof CampagneType, value: any) => {
    setNewCampagne({ ...newCampagne, [fieldName]: value });
  };
  
  const handleInputChange = (fieldName: keyof CampagneType, value: any) => {
    setEditValue({ ...editValue, [fieldName]: value });
  };

  const handleSave = async () => {
    try {
      await updateCampagneFunction();
     } catch (error) {
      console.error('Error saving Campagne:', error);
      // Handle error state or inform the user
    }finally{
      setEditMode(false);
    }
  };


  const getCampagnes = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await client.graphql({
        query: listCampagnes,
        variables: { limit: 100 } // Adjust limit as needed
      });

      const { data } = response;
      console.log(data)
      if (data && data.listCampagnes && data.listCampagnes.items) {
        // Filter out deleted items and sort by date
        const noneDeleted = data.listCampagnes.items.filter((item: any) => !item._deleted);
        const sortedCampagnes = noneDeleted.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        setCampagnes(sortedCampagnes);
      }
    } catch (error) {
      console.log('Error fetching Campagnes data:', error);
    } finally {
      setLoading(false);
    }
  };
  const getAdvertisers = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await client.graphql({
        query: listAnnonceurs,
        variables: { limit: 1000000000 } // Adjust variables as needed
      });

      const { data } = response;
      if (data) {
        const noneDeleted = data.listAnnonceurs.items.filter(item => !item._deleted);
        setAdvertisers(noneDeleted);
        console.log(noneDeleted)
      }
    } catch (error) {
      console.log('Error fetching Campagnes data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await client.graphql({
        query: listOrders,
        variables: { limit: 1000000000 } // Adjust variables as needed
      });

      const { data } = response;
      if (data) {
        const noneDeleted = data.listOrders.items.filter(item => !item._deleted);
        setOrders(noneDeleted);
       }
       console.log(data)
       console.log("data")

    } catch (error) {
      console.log('Error fetching Campagnes data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await client.graphql({
        query: listProducts,
        variables: { limit: 1000000000 } // Adjust variables as needed
      });

      const { data } = response;
      if (data) {
        const noneDeleted = data.listProducts.items.filter(item => !item._deleted);
        setProducts(noneDeleted);
       }
    } catch (error) {
      console.log('Error fetching Campagnes data:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getCampagnes();
    getAdvertisers();
    getOrder();
    getProducts()
    console.log("start")
  }, []);

  const getAdvertisersName = (id: string) :string => {
    const advertiser = Advertisers.find((item) => item.id === id);
    return advertiser ? advertiser.Nom : "Unknown";
  };

  const getOrdersName = (id: string) :string => {
    const order = Orders.find((item) => item.id === id);
    console.log(order)
    return order ? order.nom : "Unknown";
  };

  const getProductName = (id: string) :string => {
    const product = Products.find((item) => item.id === id);
    return product ? product.name : "Unknown";
  };
  
  return (
    <main className="p-4">
      <h1 className="text-3xl mb-4">Campagnes publicitaires</h1>
      <header className="w-full p-4 flex items-center h-24 justify-between">
        <div className="w-64 h-11 rounded-sm bg-white flex justify-between items-center">
          <input className="w-3/4 p-2 rounded-sm outline-none" placeholder="Search..." />
          <Image src={search_icon} alt="Search Icon" width={32} height={32} />
        </div>
        <div className="w-auto flex justify-around items-center">
          <button className="bg-green-600 w-48 rounded-sm text-white h-11 mr-5" onClick={openModal}>+ Nouvelle campagne</button>
          <button className="bg-green-600 w-48 rounded-sm text-white h-11 mr-5" onClick={()=>{setCreateProduct(true)}}>+ Produits</button>
          <button className="bg-green-600 w-48 rounded-sm text-white h-11 mr-5" onClick={()=>{setCreateOrder(true)}}>+ commande</button>
          <button className="bg-green-600 w-48 rounded-sm text-white h-11 mr-5" onClick={()=>{setCreateAdvertiser(true)}}>+ Annonceur</button>
          <button className="bg-green-600 w-11 rounded-sm text-white h-11"></button>
        </div>
      </header>

      <div className="flex justify-around">
        {/* Your other dashboard cards */}
      </div>

      <div className="mt-12 rounded-sm">
        <table className="min-w-full bg-white border rounded-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border">CODE</th>
              <th className="py-2 px-4 border">ANNONCEUR</th>
              <th className="py-2 px-4 border">NOM</th>
              <th className="py-2 px-4 border">COMMANDES</th>
              <th className="py-2 px-4 border">PRODUIT</th>
              <th className="py-2 px-4 border">PERIODE</th>
              <th className="py-2 px-4 border">ACTION</th>
            </tr>
          </thead>
          <tbody>
              {loading ? (
                  <tr>
                    <td colSpan={7} className="py-2 px-4 border text-center">Loading...</td>
                  </tr>
                ) : (
                  Campagnes.map((campagne) => (
                    <CampagneRow
                      key={campagne.id}
                      campagne={campagne}
                      Advertisers={Advertisers}
                      Orders={Orders}
                      Products={Products}
                      getAdvertisersName={getAdvertisersName}
                      getOrdersName={getOrdersName}
                      getProductName={getProductName}
                      setCampagnes={setCampagnes}
                      campagneList={Campagnes}
                    />
                  ))
                )}
          </tbody>
        </table>
      </div>
      <CreateCampagne
        isOpen={isOpen}
        onClose={closeModal}
        Advertisers={Advertisers}
        Orders={Orders}
        Products={Products}
        Campagnes={Campagnes}
        setCampagnes={setCampagnes}
      />    
      <CreateProduct
        isOpen={createProduct}
        onClose={()=>{setCreateProduct(false)}}
      />

      <CreateAdvertiser
        isOpen={createAdvertiser}
        onClose={()=>{setCreateAdvertiser(false)}}
      />

      <CreateOrder
        Advertisers={Advertisers}
        isOpen={createOrder}
        onClose={()=>{setCreateOrder(false)}}
        setOrders={setOrders}
        Orders={Orders}
        
      />

      
    </main>
  );
}


const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
        Products {
          items {
            name
            orderID
            id
            price
          }
        }
        annonceursID
        attente
        createdAt
        diff
        duration
        file
        id
        nom
        nondiff
      }
    }
  }
`;


 