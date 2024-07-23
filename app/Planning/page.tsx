"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../../src/aws-exports';
import { listPlannings } from '@/src/graphql/queries';
import { Annonceur, Order, Planning } from '@/type';

Amplify.configure(awsconfig);
const client = generateClient();

const PlanningView = () => {
  const searchParams = useSearchParams();
  const [Orders, setOrders] = useState<Order[]>([]);
  const [annonceurs, setAnnonceurs] = useState<Annonceur[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [planning, setPlanning] = useState<Planning[]>([]);

  useEffect(() => {
    const ordersParam = searchParams.get('Orders');
    const annonceursParam = searchParams.get('annonceurs');
    if (ordersParam && annonceursParam) {
      try {
        setOrders(JSON.parse(ordersParam));
        setAnnonceurs(JSON.parse(annonceursParam));
        console.log(JSON.parse(ordersParam))
        console.log(JSON.parse(annonceursParam))
      } catch (error) {
        console.error('Error parsing query parameters:', error);
      }
    }
  }, [searchParams]);

  const getTodayDate = () => {
    const today = new Date();
    const date = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${date}`;
  };

  useEffect(() => {
    const fetchPlanning = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await client.graphql({
          query: listPlannings,
          variables: { limit: 1000000000 }
        });

        const { data } = response;
        if (data) {
          const noneDeleted = data.listPlannings.items.filter(item => !item._deleted);
          setPlanning(noneDeleted);
        }
      } catch (error) {
        console.log('Error fetching planning data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanning();
  }, []);

  const todayDate = getTodayDate();
  const todaysPlannings = planning.filter(plan => plan.date === todayDate);

  const getOrderNameById = (id: string) => {
    const order = Orders.find(order => order.id === id);
    return order ? order.nom : 'Unknown Order';
  };

  // Use order.annonceursID to get announcer name
  const getAnnouncerNameById = (annonceursID: string) => {
    const announcer = annonceurs.find(announcer => announcer.id === annonceursID);
    return announcer ? announcer.Nom : 'Unknown Announcer';
  };

  // Use orderID to get product name
  const getProductNameById = (id: string) => {
    const order = Orders.find(order => order.id === id);
    return order ? order.Products.items[0].name : 'Unknown Product';
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Today's Plannings</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Hours</th>
              <th className="px-4 py-2 border">Order Name</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Announcer Name</th>
            </tr>
          </thead>
          <tbody>
            {todaysPlannings.length > 0 ? (
              todaysPlannings.map(plan => (
                <tr key={plan.id}>
                  <td className="px-4 py-2 border">{plan.hour}</td>
                  <td className="px-4 py-2 border">{getOrderNameById(plan.orderID)}</td>
                  <td className="px-4 py-2 border">{getProductNameById(plan.orderID)}</td>
                  <td className="px-4 py-2 border">{getAnnouncerNameById(Orders.find(order => order.id === plan.orderID)?.annonceursID || '')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 border text-center">
                  No plannings for today
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlanningView;
