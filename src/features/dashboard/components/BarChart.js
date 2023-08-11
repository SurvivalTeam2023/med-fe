import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import { getUserLog } from '../../../Axios/Apis/user/user';
import { useQuery } from '@tanstack/react-query';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {


  const fetchUserLog = async () => {
    const res = await getUserLog()
    const data = res.data;
    return data;
  };

  const { isLoading, data, isError, isSuccess, error } = useQuery({
    queryKey: ['userLog'],
    queryFn: fetchUserLog,

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
      }
    },
  };
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const months = data.map(item => monthNames[item.month - 1]);

  const datasets = [
    {
      label: 'isActive',
      data: data.map(item => item.isActive),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'isInactive',
      data: data.map(item => item.isInactive),
      backgroundColor: 'rgba(53, 162, 235, 1)',
    },
  ];

  const chartData = {
    labels: months,
    datasets,
  };

  return (
    <TitleCard title={"User Log"}>
      <Bar options={options} data={chartData} />
    </TitleCard>

  )
}


export default BarChart