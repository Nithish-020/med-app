import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { DataTable, type DataTableColumn } from "./ui/data-table";
import type { BillDetail } from "@/types";
import { Search } from "lucide-react";

interface Props {
  dummy: BillDetail[];
}

const columns: DataTableColumn<BillDetail>[] = [
  { key: "medicinename", header: "Medicine Name" },
  { key: "brand", header: "Brand" },
  { key: "qty", header: "Quantity", align: "center" },
  { key: "billAmt", header: "Amount", align: "center" },
];

export default function BillerTable({ dummy }: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="flex justify-center">
        <Card className="w-[900px] p-5 border shadow-none">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DataTable<BillDetail>
            columns={columns}
            items={dummy}
            search={search}
            pageSize={10}
          />
        </Card>
      </div>
    </div>
  );
}
