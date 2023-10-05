import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCustomers } from 'renderer/features/customers/customerSlice';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);
const Report = () => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const { isSuccess, message } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setCustomers(message);
      console.log(message);
    }
  }, [isSuccess]);

  // Assuming each customer has a 'date' property
  const customerDates = customers.map((customer) =>
    new Date(customer.createdAt).toLocaleDateString()
  );
  const customerCounts = {};
  customerDates.forEach((date) => {
    if (!customerCounts[date]) {
      customerCounts[date] = 1;
    } else {
      customerCounts[date]++;
    }
  });

  const data = {
    labels: Object.keys(customerCounts),
    datasets: [
      {
        label: 'Number of Customers',
        data: Object.values(customerCounts),
        backgroundColor: 'purple',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '1000px', width: '1000px', marginTop: '20%' }}>
      <p> Report</p>
      <Bar data={data} />
    </div>
  );
};

export default Report;
