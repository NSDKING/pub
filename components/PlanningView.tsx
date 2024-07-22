import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../src/aws-exports';
import { listPlannings } from '@/src/graphql/queries';
import { Order, Planning } from '@/type';

Amplify.configure(awsconfig);
const client = generateClient();

interface PlanningViewProps {
  Orders: Order[]; // Prop to receive Orders array
}

const PlanningView: React.FC<PlanningViewProps> = ({ Orders }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [planning, setPlanning] = useState<Planning[]>([]);

  const getTodayDate = () => {
    const today = new Date();
    const date = today.getDate().toString().padStart(2, '0'); // Day of the month (01-31)
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12, padded)
    const year = today.getFullYear(); // Full year (e.g., 2024)

    return `${year}-${month}-${date}`;
  };

  useEffect(() => {
    const fetchPlanning = async () => {
      if (loading) {
        return;
      }

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
  }, [loading]);

  const todayDate = getTodayDate();

  const todaysPlannings = planning.filter(plan => plan.date === todayDate);

  const getOrderNameById = (id: string) => {
    const order = Orders.find(order => order.id === id);
    return order ? order.nom : 'Unknown Order';
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
                  <td className="px-4 py-2 border">{plan.product.name}</td>
                  <td className="px-4 py-2 border">{plan.announcer.nom}</td>
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
