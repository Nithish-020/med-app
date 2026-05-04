import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Card } from "./ui/card";

interface Props {
  month: string[];
  monthVal: { name: string; data: number[] }[];
  toggle: number;
}

export default function Monthlychart({ month, monthVal, toggle }: Props) {
  const options: ApexOptions = {
    chart: { height: 350, type: "line", zoom: { enabled: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "straight" },
    grid: { row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 } },
    yaxis: { title: { text: "Amount" }, min: 0, max: 1000 },
    xaxis: {
      categories: month,
      title: { text: "Months" },
    },
  };

  return (
    <Card className="w-[750px]">
      <div id="chart">
        <Chart
          key={toggle}
          options={options}
          series={monthVal}
          type="line"
          height={350}
        />
      </div>
    </Card>
  );
}
