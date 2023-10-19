import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCustomers } from 'renderer/features/customers/customerSlice';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { reset } from 'renderer/features/customers/customerSlice';

Chart.register(CategoryScale);
const LineChart = () => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const { isSuccess, message } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setCustomers(message);
    }
    dispatch(reset());
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
        backgroundColor: 'black',
        borderColor: 'purple',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '1000px', width: '1000px', marginTop: '20%' }}>
      <p> Report</p>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
