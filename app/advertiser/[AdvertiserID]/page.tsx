"use client"
import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../../../src/aws-exports';
import search_icon from "../../../assets/search.png";
import planning from "../../../assets/planning.png";
import Image from "next/image";
import CreateProduct from '@/components/createProduct';
import { Advertiser, CampagneType, Order, Planning } from "@/type";
import OrderRow from '@/components/OrderRow';
import { listPlannings, listProducts } from '@/src/graphql/queries';
import CreateOrder from '@/components/createOrder';
import CreateOrderID from '@/components/createOrderID';
import Calendar from '@/components/Calandar';

Amplify.configure(awsconfig);
const client = generateClient();

export default function AdvertiserPage({ params }) {
    const { AdvertiserID } = params;
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData]= useState<Advertiser>()
    const [Orders, setOrders] = useState<Order[]>([]);
    const [Planning, setPlanning] = useState<Planning[]>([]);
    const [Campagnes, setCampagnes]= useState()
    const [calendar, setCalendar]= useState<boolean>(false)
    const [createProduct, setCreateProduct] = useState(false);
    const [Products, setProducts] = useState([]);
    const [createOrder, setCreateOrder] = useState(false);

    const getPlanningList = ( ) => {
        let planList: Planning[] = [];
      
        Orders.forEach((order) => {
          if (order.Plannings && order.Plannings.items) {
            planList = planList.concat(order.Plannings.items);
          }
        });
        
        setPlanning(planList)

      };
      
    
    const getAdvertisersData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);

        try {
            const response = await client.graphql({
                query: getAnnonceurs,
                variables: { 
                    id: AdvertiserID, 
                    limit: 10000
                }
            });
            console.log(response);
            setData(response.data.getAnnonceurs)
            setCampagnes(response.data.getAnnonceurs.Campagnes.items)
            setOrders(response.data.getAnnonceurs.Orders.items)
          } catch (error) {
            console.log('Error fetching advertisers data:', error);
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
    
    const getPlanning = async () => {
        if (loading) {
        return;
        }

        setLoading(true);
        try {
        const response = await client.graphql({
            query: listPlannings,
            variables: { limit: 1000000000 } // Adjust variables as needed
        });

        const { data } = response;
        if (data) {
            const noneDeleted = data.listPlannings.items.filter(item => !item._deleted);
            setPlanning(noneDeleted);
        }
        } catch (error) {
        console.log('Error fetching Campagnes data:', error);
        } finally {
        setLoading(false);
        }
    };

    const diffNumber = () => {
        const diffItems = Orders.filter(item => item.diff === true);
        return diffItems.length;
    };

    const attNumber = () => {
        const attItems = Orders.filter(item => item.attente === true);
        return attItems.length;
    };

    const nondiffNumber = () => {
        const nondiffItems = Orders.filter(item => item.nondiff === true);
        return nondiffItems.length;
    };
    
    useEffect(() => {
        if (AdvertiserID) {
            getAdvertisersData();
        }
        getProducts()
        getPlanning()
        getPlanningList()
    }, [AdvertiserID]);

    return (
        <main>
            {loading && <p>Loading...</p>}
            {data && (
                <div>
                    <div className='flex justify-center flex-col items-center mt-14'>
                        {/* Render your data here */}
                        <h1 className='text-3xl font-bold'>{data.Nom}</h1>
                        <div className='flex justify-center items-center  '>
                            <p className='ml-5'> {data.numero}</p>
                            <p className='ml-5'> {data.mail}</p>
                        </div>
                    </div>
                    <header className="w-full p-4 flex items-center h-24 justify-between">
                        <div className="w-64 h-11 rounded-sm bg-white flex justify-between items-center">
                        <input className="w-3/4 p-2 rounded-sm outline-none" placeholder="Search..." />
                        <Image src={search_icon} alt="Search Icon" width={32} height={32} />
                        
                        </div>
                        <div className="w-auto flex justify-around items-center">
                        <button className="bg-green-600 w-48 rounded-sm text-white h-11 mr-5 flex items-center justify-center" onClick={()=>{setCalendar(true)}}>
                            <Image src={planning} alt="planning Icon" width={21} height={17} className="mr-2" />
                            Planning
                        </button>
                        <button className="bg-green-600 w-48 rounded-sm text-white h-11 mr-5" onClick={()=>{setCreateOrder(true)}}>+ commande</button>
                        <button className="bg-green-600 w-48 rounded-sm text-white h-11 mr-5" onClick={()=>{setCreateProduct(true)}}>+ Produit</button>        
                                       
                         <button className="bg-green-600 w-11 rounded-sm text-white h-11"></button>
                        </div>
                    </header>
                    <div className='flex justify-around'>
                        <div className='w-80 h-36 p-3 bg-white flex flex-col justify-around rounded-sm'>
                            <p className='text-gray-600'>Total Commandés</p>
                            <h1 className='font-bold text-2xl'>{Orders.length}</h1>
                        </div>
                        <div className='w-80 h-36 p-3 bg-white flex flex-col justify-around rounded-sm'>
                            <p className='text-gray-600'>Total diffusés</p>
                            <h1 className='font-bold text-2xl'>{diffNumber()}</h1>
                        </div>
                        <div className='w-80 h-36 p-3 bg-white flex flex-col justify-around rounded-sm'>
                            <p className='text-gray-600'>Total attentes</p>
                            <h1 className='font-bold text-2xl'>{attNumber()}</h1>
                        </div>
                        <div className='w-80 h-36 p-3 bg-white flex flex-col justify-around rounded-sm'>
                            <p className='text-gray-600'>Total non diffusés</p>
                            <h1 className='font-bold text-2xl'>{nondiffNumber()}</h1>
                        </div>

                    </div>

                    <div className="mt-12 rounded-sm">
                        <table className="min-w-full bg-white border rounded-sm">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">PRODUIT</th>
                                <th className="py-2 px-4 border">TITRE DU MESSAGE</th>
                                <th className="py-2 px-4 border">DUREES (S)</th>
                                <th className="py-2 px-4 border">FILE</th>
                                <th className="py-2 px-4 border">DIFFUSE</th>
                                <th className="py-2 px-4 border">ATTENTE</th>
                                <th className="py-2 px-4 border">NONDIFFUSE</th>
                                <th className="py-2 px-4 border">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Orders.map((order) => (
                                <OrderRow
                                    order={order}
                                    products={Products}
                                    OrderList={Orders}
                                    setOrders={setOrders}
                                 />
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <CreateProduct
                        isOpen={createProduct}
                        onClose={()=>{setCreateProduct(false)}}
                    />
                    <CreateOrderID
                        AdvertisersID={AdvertiserID}
                        isOpen={createOrder}
                        onClose={()=>{setCreateOrder(false)}}
                        setOrders={setOrders}
                        products={Products}
                        Orders={Orders}
   
                    />
                    <Calendar
                        isOpen={calendar}
                        onClose={()=>{setCalendar(false)}}
                        Orders={Orders}
                        Planning={Planning}
                        setPlanning={setPlanning}
                    />

                </div>
 

                 
            )}
        </main>
    );
}

const getAnnonceurs = /* GraphQL */ `
  query GetAnnonceurs($id: ID!) {
    getAnnonceurs(id: $id) {
      id
      Nom
      numero
      mail
      Campagnes {
        items {
          Nom
          id
          orderID
          periode
          productID
        }
      }
      Orders {
        items {
          diff
          attente
          duration
          file
          id
          nom
          nondiff
          Products {
              items{            
                id
                name
                price
              }
          }
          Plannings {
            items {
              date
              hour
              id
              orderID
          }
         }
        }
      }
    }
  }
`;
