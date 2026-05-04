import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";

export default function Convo() {
  const [structuredData] = useState<Record<string, unknown>[]>([]);

  const downloadCsv = () => {
    const csv = Papa.unparse(structuredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <Button onClick={downloadCsv}>Download CSV</Button>
      <pre className="mt-4 text-sm">
        {JSON.stringify(structuredData, null, 2)}
      </pre>
    </div>
  );
}
