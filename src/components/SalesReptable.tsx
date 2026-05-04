import { useState } from "react";
import Papa from "papaparse";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { DataTable, type DataTableColumn } from "./ui/data-table";
import EventService from "@/services/eventService";
import type { SalesReportRow } from "@/types";

const columns: DataTableColumn<SalesReportRow>[] = [
  { key: "bil_no", header: "Bill No" },
  { key: "date", header: "Date" },
  { key: "medName", header: "Medicine Name" },
  { key: "qty", header: "Qty", align: "center" },
  { key: "amt", header: "Amount", align: "center" },
];

export default function SalesReptable() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [items, setItems] = useState<SalesReportRow[]>([]);

  const search = () => {
    EventService.GetSalesReport({ fromDate, toDate })
      .then((response) => {
        if (response.data.status === "S") {
          setItems(response.data.salesReportArr as SalesReportRow[]);
        }
      })
      .catch((err) => console.log(err));
  };

  const downloadCsv = () => {
    const csv = Papa.unparse(items);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "SalesReport.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <Card className="max-w-5xl w-full">
        <CardContent className="pt-6">
          <div className="flex items-end gap-4 flex-wrap mb-4">
            <div className="flex-1 min-w-[150px]">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <Label>End Date</Label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <Button onClick={search}>Search</Button>
          </div>

          <div className="flex justify-end mb-2">
            <Button variant="outline" size="sm" onClick={downloadCsv}>
              Download
            </Button>
          </div>

          <DataTable<SalesReportRow>
            columns={columns}
            items={items}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
