import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import EventService from "@/services/eventService";
import type { StockItem } from "@/types";

const columns: DataTableColumn<StockItem>[] = [
  { key: "medName", header: "Medicine Name" },
  { key: "qty", header: "Quantity", align: "center" },
  { key: "price", header: "Unit price", align: "center" },
];

export default function StockViewcard() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<StockItem[]>([]);

  useEffect(() => {
    EventService.GetStock()
      .then((response) => {
        if (response.data.status === "S") {
          setItems(response.data.stockArr as StockItem[]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-center mt-16 mb-10 px-4">
      <Card className="w-[900px] max-w-full">
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DataTable<StockItem>
            columns={columns}
            items={items}
            search={search}
            pageSize={15}
          />
        </CardContent>
      </Card>
    </div>
  );
}
