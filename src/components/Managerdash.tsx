import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import LineChart from "./LineChart";
import Monthlychart from "./Monthlychart";
import TodayPie from "./TodayPie";
import Currentmonthbar from "./Currentmonthbar";
import EventService from "@/services/eventService";
import type { ManagerDashResp } from "@/types";

export default function Managerdash() {
  const [todaySale, setTodaySale] = useState(0);
  const [inventryVal, setInventryVal] = useState(0);
  const [dayname, setDayname] = useState<string[]>([]);
  const [weekseries, setWeekseries] = useState([
    { name: "Weekly Sales trend", data: [] as number[] },
  ]);
  const [monthname, setMonthname] = useState<string[]>([]);
  const [monthseries, setMonthseries] = useState([
    { name: "Monthly Sales trend", data: [] as number[] },
  ]);
  const [billername, setBillername] = useState<string[]>([]);
  const [billerval, setBillerval] = useState<number[]>([]);
  const [currentMnthSale, setCurrentMnthSale] = useState<string[]>([]);
  const [currentMnthSeries, setCurrentMnthSeries] = useState([
    { name: "Current Month Sales Performance", data: [] as number[] },
  ]);
  const [toggle, setToggle] = useState(1);

  useEffect(() => {
    EventService.GetManagerdash()
      .then((response) => {
        const dash = response.data.manager_resp as ManagerDashResp;
        if (!dash) return;

        setTodaySale(dash.todaySaleVal);
        setInventryVal(dash.totalInventryVal);

        const dn: string[] = [];
        const dv: number[] = [];
        dash.dailySaleArr.forEach((ds) => {
          dn.push(ds.weekDay);
          dv.push(ds.dailyVal);
        });
        setDayname(dn);
        setWeekseries([{ name: "Weekly Sales trend", data: dv }]);

        const mn: string[] = [];
        const mv: number[] = [];
        dash.monthlysaleArr.forEach((ms) => {
          mn.push(ms.months);
          mv.push(ms.monthVal);
        });
        setMonthname(mn);
        setMonthseries([{ name: "Monthly Sales trend", data: mv }]);

        const bn: string[] = [];
        const bv: number[] = [];
        dash.todaySalePerfArr.forEach((tsp) => {
          bn.push(tsp.userName);
          bv.push(tsp.amount);
        });
        setBillername(bn);
        setBillerval(bv);

        const cmn: string[] = [];
        const cmv: number[] = [];
        dash.currentMnthPerfArr.forEach((c) => {
          cmn.push(c.userName);
          cmv.push(c.amount);
        });
        setCurrentMnthSale(cmn);
        setCurrentMnthSeries([
          { name: "Current Month Sales Performance", data: cmv },
        ]);

        setToggle((t) => t + 1);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full px-4">
      <div className="flex justify-center gap-4 mb-10">
        <Card className="w-[250px] bg-slate-900 text-white">
          <CardHeader className="items-center pb-2">
            <span>Today's Sales</span>
          </CardHeader>
          <CardContent className="text-2xl font-black text-center">
            ₹ {todaySale}/-
          </CardContent>
        </Card>
        <Card className="w-[300px] bg-slate-900 text-white">
          <CardHeader className="items-center pb-2">
            <span>Current Inventory Value</span>
          </CardHeader>
          <CardContent className="text-2xl font-black text-center">
            ₹ {inventryVal}/-
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap justify-center gap-5 my-10">
        <LineChart dayName={dayname} dayVal={weekseries} toggle={toggle} />
        <Monthlychart month={monthname} monthVal={monthseries} toggle={toggle} />
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        <TodayPie
          billerName={billername}
          billerVal={billerval}
          toggle={toggle}
        />
        <Currentmonthbar
          userName={currentMnthSale}
          amount={currentMnthSeries}
          toggle={toggle}
        />
      </div>
    </div>
  );
}
