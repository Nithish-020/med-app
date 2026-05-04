import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Combobox } from "./ui/combobox";
import EventService from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";
import type { BillDetail, MedicineMaster, StockItem } from "@/types";

interface Props {
  trash: BillDetail[];
  onAdd: (next: BillDetail[]) => void;
}

export default function BillerDrop({ trash, onAdd }: Props) {
  const { user } = useAuth();
  const [billno, setBillno] = useState<number | string>(0);
  const [medId, setMedId] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [items, setItems] = useState<MedicineMaster[]>([]);
  const [stock, setStock] = useState<StockItem[]>([]);

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
    EventService.GetMedMas()
      .then((response) => {
        if (response.data.status === "S") {
          setItems(response.data.masterArr as MedicineMaster[]);
        }
      })
      .catch((err) => console.log(err));
    EventService.GetStock()
      .then((response) => {
        if (response.data.status === "S") {
          setStock(response.data.stockArr as StockItem[]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const add = () => {
    if (!medId || !qty) return;
    const next = [...stock];
    for (let i = 0; i < next.length; i++) {
      const s = next[i];
      const sMedId = String(s.medId ?? s.med_id);
      if (sMedId !== String(medId)) continue;

      if (s.qty < qty) {
        toast.error("There is not enough quantity available in inventory");
        return;
      }
      if (s.qty === 0) return;

      const uPrice = s.price;
      const amt = uPrice * qty;
      next[i] = { ...s, qty: s.qty - qty };

      const newRow: BillDetail = {
        user_id: user.user_id,
        bill_no: billno,
        med_id: medId,
        medicinename: s.medName,
        brand: s.brand,
        unitPrice: uPrice,
        qty,
        billAmt: amt,
      };
      setStock(next);
      onAdd([...trash, newRow]);
      setMedId("");
      setQty(0);
      return;
    }
  };

  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="flex justify-center">
        <Card className="w-[900px] p-4 border-0 shadow-none">
          <span className="font-medium">BILL ENTRY</span>
          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="item" className="rounded border">
              <AccordionTrigger className="bg-primary text-primary-foreground rounded-t">
                Item
              </AccordionTrigger>
              <AccordionContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    add();
                  }}
                  className="flex gap-4 items-end pt-3"
                >
                  <div className="flex-1">
                    <Label className="text-xs">Medicine Name</Label>
                    <Combobox
                      items={items.map((m) => ({
                        value: String(m.med_id),
                        label: m.medName,
                      }))}
                      value={medId}
                      onChange={setMedId}
                      placeholder="Select medicine"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs">Quantity</Label>
                    <Input
                      type="number"
                      value={qty || ""}
                      onChange={(e) => setQty(Number(e.target.value))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-[20%]">
                    Add
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
