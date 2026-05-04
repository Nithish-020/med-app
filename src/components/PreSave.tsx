import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import EventService from "@/services/eventService";
import type { BillDetail } from "@/types";

interface Props {
  arr: BillDetail[];
  onReset: (next: BillDetail[]) => void;
  onPreview: () => void;
}

export default function PreSave({ arr, onReset, onPreview }: Props) {
  const [billno, setBillno] = useState<string | number>("");

  const fetchBillNo = () => {
    EventService.GetBillNo()
      .then((response) => {
        if (response.data.status === "S") {
          setBillno(response.data.billres);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBillNo();
  }, []);

  const fulldate = useMemo(() => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }, []);

  const total = useMemo(
    () => arr.reduce((sum, item) => sum + item.billAmt, 0),
    [arr],
  );
  const gst = (18 / 100) * total;
  const netPayable = total + gst;

  const save = () => {
    if (arr.length === 0) return;
    EventService.BillEntry(arr)
      .then((response) => {
        if (response.data.status === "S") {
          toast.success("Bill Saved Successfully");
        }
      })
      .catch((err) => console.log(err));
    onReset([]);
    fetchBillNo();
  };

  return (
    <div className="flex justify-center mt-8 px-4">
      <Card className="w-[900px] border shadow-none">
        <div className="flex items-center justify-between p-5 flex-wrap gap-4">
          <div className="flex gap-3">
            <Button className="px-4" onClick={onPreview}>
              preview
            </Button>
            <Button variant="success" className="px-4" onClick={save}>
              save
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <span>
              <b>Bill no : </b> {billno}
            </span>
            <span className="hidden md:inline">
              <b>Date :</b> {fulldate}
            </span>
            <span>
              <b>Total :</b> {total}
            </span>
            <span>
              <b>GST :</b> {gst.toFixed(2)}
            </span>
            <span>
              <b>Net Payable :</b> {netPayable.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
