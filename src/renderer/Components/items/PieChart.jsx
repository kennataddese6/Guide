import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCustomers } from 'renderer/features/customers/customerSlice';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { reset } from 'renderer/features/customers/customerSlice';

Chart.register(CategoryScale);
const PieChart = () => {
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
  const customerFloorNumber = customers.map((customer) => customer.FloorNumber);
  const customerCounts = {};
  customerFloorNumber.forEach((date) => {
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
        backgroundColor: [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
          'lime',
          'teal',
          'aqua',
          'navy',
          'fuchsia',
          'olive',
          'maroon',
          'silver',
          'black',
          'gray',
          'white',
          'purple',
          'pink',
          'brown',
          'coral',
          'cyan',
          'darkblue',
          'darkgreen',
          'darkred',
          'gold',
          'lightblue',
          'lightgreen',
          'lightyellow',
          'magenta',
          'mediumblue',
          'mediumpurple',
          'mediumseagreen',
          'mediumvioletred',
          'palegreen',
          'palevioletred',
          'peachpuff',
          'royalblue',
          'seagreen',
          'skyblue',
          'slateblue',
          'slategray',
          'springgreen',
          'steelblue',
          'tomato',
          'turquoise',
          'yellowgreen',
        ],
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '500px', width: '500px' }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
