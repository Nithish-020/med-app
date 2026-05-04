import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import EventService from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";
import type { BillerDashItem } from "@/types";

export default function Billerdash() {
  const { user } = useAuth();
  const [todaySale, setTodaySale] = useState(0);
  const [yesterdaySale, setYesterdaySale] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    EventService.GetBillerdash({ user_id: user.user_id })
      .then((response) => {
        const calc = (response.data.billerRes as BillerDashItem[]) ?? [];
        let t = 0;
        let y = 0;
        for (const c of calc) {
          if (c.day === "Today") t = c.amt;
          else y = c.amt;
        }
        setTodaySale(t);
        setYesterdaySale(y);
        setPercentage(t === 0 ? 0 : ((t - y) / t) * 100);
      })
      .catch((err) => console.log(err));
  }, [user.user_id]);

  const isUp = todaySale >= yesterdaySale;

  return (
    <Card className="w-[400px]">
      <CardContent className="text-center pt-6">
        <span className="font-bold">Your Today Sales</span>
        <div className="flex justify-center items-start gap-3 mt-2">
          <span className="text-4xl font-black">₹ {todaySale}</span>
          <div className="flex items-center mt-3">
            {isUp ? (
              <ArrowUp className="mr-2 h-5 w-5 text-success" />
            ) : (
              <ArrowDown className="mr-2 h-5 w-5 text-destructive" />
            )}
            <span>({percentage.toFixed(1)}%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
