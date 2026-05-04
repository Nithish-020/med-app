import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Card } from "./ui/card";

interface Props {
  billerName: string[];
  billerVal: number[];
  toggle: number;
}

export default function TodayPie({ billerName, billerVal, toggle }: Props) {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      dropShadow: {
        enabled: true,
        color: "#111",
        top: -1,
        left: 3,
        blur: 3,
        opacity: 0.2,
      },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: { labels: { show: true, total: { showAlways: true, show: true } } },
      },
    },
    labels: billerName,
    dataLabels: { dropShadow: { blur: 3, opacity: 0.8 } },
    fill: { type: "pattern", opacity: 1, pattern: { style: [] } },
    states: { hover: { filter: { type: "none" } } },
    theme: { palette: "palette2" },
    title: { text: "Today Salesmans Performance" },
    responsive: [
      { breakpoint: 480, options: { legend: { position: "bottom" } } },
    ],
  };

  return (
    <Card className="w-[650px]">
      <div id="chart">
        <Chart
          key={toggle}
          options={options}
          series={billerVal}
          type="donut"
        />
      </div>
    </Card>
  );
}
