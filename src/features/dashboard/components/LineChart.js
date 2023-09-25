import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";
import { useQuery } from "@tanstack/react-query";
import { getUserLog } from "../../../Axios/Apis/user/user";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const fetchUserLog = async () => {
    const res = await getUserLog();
    const data = res.data;
    return data;
  };

  const { isLoading, data, isError, isSuccess, error } = useQuery({
    queryKey: ["activeUser"],
    queryFn: fetchUserLog,
  });
  if (isLoading) {
    // Return loading indicator or message
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error.message, "haha");
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const labels = data.map((item) => monthNames[item.month - 1]);
  const datasets = [
    {
      fill: true,
      label: "MAU",
      data: data.map((item) => item.isActive),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const chartData = {
    labels,
    datasets,
  };

  return (
    <TitleCard title={"Montly Active Users (in K)"}>
      <Line data={chartData} options={options} />
    </TitleCard>
  );
}

export default LineChart;
