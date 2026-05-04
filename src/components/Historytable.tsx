import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { DataTable, type DataTableColumn } from "./ui/data-table";
import { Search } from "lucide-react";
import EventService from "@/services/eventService";
import type { LoginHistoryRow } from "@/types";

const columns: DataTableColumn<LoginHistoryRow>[] = [
  { key: "username", header: "Name" },
  { key: "login_date", header: "Login Date" },
  { key: "login_time", header: "Login time" },
  { key: "logout_date", header: "Logout Date" },
  { key: "logout_time", header: "Logout time" },
];

export default function Historytable() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<LoginHistoryRow[]>([]);

  useEffect(() => {
    EventService.GetLoghistory()
      .then((response) => {
        if (response.data.status === "S") {
          setItems(response.data.loghisArr as LoginHistoryRow[]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-center mt-16 px-4">
      <Card className="w-[700px]">
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
          <DataTable<LoginHistoryRow>
            columns={columns}
            items={items}
            search={search}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
