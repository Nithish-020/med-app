import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import EventService from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";
import type { MedicineMaster } from "@/types";

interface Props {
  refreshKey: number;
}

interface StockForm {
  user_id: number | string;
  med_id: string;
  qty: number | "";
  price: number | "";
}

export default function StockentryCard({ refreshKey }: Props) {
  const { user } = useAuth();
  const [items, setItems] = useState<MedicineMaster[]>([]);
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState<StockForm>({
    user_id: user.user_id,
    med_id: "",
    qty: "",
    price: "",
  });

  const loadMed = () => {
    EventService.GetMedMas()
      .then((response) => {
        if (response.data.status === "S") {
          setItems(response.data.masterArr as MedicineMaster[]);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(loadMed, []);

  useEffect(() => {
    if (refreshKey > 0) loadMed();
  }, [refreshKey]);

  const onMedChange = (medId: string) => {
    setStock((s) => ({ ...s, med_id: medId }));
    const match = items.find((i) => String(i.med_id) === medId);
    setBrand(match ? match.brand : "");
  };

  const update = () => {
    if (!stock.med_id || stock.qty === "" || stock.price === "") {
      toast.warning("Field Cannot be Empty");
      return;
    }
    EventService.StockEntry({ ...stock, user_id: user.user_id })
      .then((response) => {
        if (response.data.status === "S") {
          toast.success("Stock Updated Successfully");
        } else {
          toast.error("Cannot Update Stock");
        }
      })
      .catch((err) => console.log(err));
    setStock({ user_id: user.user_id, med_id: "", qty: "", price: "" });
    setBrand("");
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 px-4">
        <div className="flex-1 min-w-[150px]">
          <Label className="text-xs">Medicine</Label>
          <Combobox
            items={items.map((i) => ({
              value: String(i.med_id),
              label: i.medName,
            }))}
            value={stock.med_id}
            onChange={onMedChange}
            placeholder="Select medicine"
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <Label className="text-xs">Brand</Label>
          <Input value={brand} disabled />
        </div>
        <div className="flex-1 min-w-[120px]">
          <Label className="text-xs">Qty</Label>
          <Input
            type="number"
            value={stock.qty}
            onChange={(e) =>
              setStock((s) => ({
                ...s,
                qty: e.target.value === "" ? "" : Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex-1 min-w-[120px]">
          <Label className="text-xs">Unit Price</Label>
          <Input
            type="number"
            value={stock.price}
            onChange={(e) =>
              setStock((s) => ({
                ...s,
                price: e.target.value === "" ? "" : Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
      <div className="flex justify-center px-4 mt-4">
        <Button className="w-[680px] max-w-full" onClick={update}>
          Update
        </Button>
      </div>
    </>
  );
}
