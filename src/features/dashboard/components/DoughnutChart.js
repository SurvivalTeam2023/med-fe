import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import { getUserByAge } from '../../../Axios/Apis/user/user';
import { useQuery } from '@tanstack/react-query';

ChartJS.register(ArcElement, Tooltip, Legend,
  Tooltip,
  Filler,
  Legend);

function DoughnutChart() {
  const fetchUserByAge = async () => {
    const res = await getUserByAge()
    const data = res.data;
    return data;
  };

  const { isLoading, data, isError, isSuccess, error } = useQuery({
    queryKey: ['age'],
    queryFn: fetchUserByAge,

  });
  if (isLoading) {
    // Return loading indicator or message
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error.message);
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const labels = ['13 to 20', '21 to 30', '31 to 50', '51 to 80'];

  const chartData = {
    labels,
    datasets: [
      {
        label: '# of Orders',
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }
    ],
  };

  return (
    <TitleCard title={"User By Age"}>
      <Doughnut options={options} data={chartData} />
    </TitleCard>
  )
}


export default DoughnutChart