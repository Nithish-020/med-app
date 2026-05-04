import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Card } from "./ui/card";

interface Props {
  userName: string[];
  amount: { name: string; data: number[] }[];
  toggle: number;
}

export default function Currentmonthbar({ userName, amount, toggle }: Props) {
  const options: ApexOptions = {
    chart: { type: "bar" },
    plotOptions: {
      bar: { borderRadius: 5, dataLabels: { position: "top" } },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`,
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#304758"] },
    },
    xaxis: {
      categories: userName,
      position: "bottom",
      axisBorder: { show: true },
      axisTicks: { show: false },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.8,
            opacityTo: 0.5,
          },
        },
      },
      title: { text: "Sales Man", style: { color: "#000" } },
      tooltip: { enabled: false },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: true },
      title: { text: "Amount", style: { color: "#000" } },
    },
  };

  return (
    <Card className="w-[700px] h-[550px]">
      <div id="chart">
        <Chart key={toggle} options={options} series={amount} type="bar" />
      </div>
    </Card>
  );
}
