import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getGenrePercentage } from "../api/endPoints";

const Report = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getGenrePercentage().then((data) => {
      setData(data?.data);
    });
  }, []);

  const options = {
    labels: data?.map((genre) => genre.genre),
  };
  
  const series = data?.map((genre) => genre.percentage);
  return (
    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900">Genres</h3>
      </div>
      <div className="donut">
        <Chart options={options} series={series} type="donut" width={380} />
      </div>
    </div>
  );
};

export default Report;
