import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StockentryCard from "@/components/StockentryCard";
import StockentryDialog from "@/components/StockentryDialog";

export default function Stockentry() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex justify-center mt-16 px-4">
      <Card className="w-[700px] max-w-full">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-medium">Refill Stock</span>
          <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            ADD
          </Button>
        </div>
        <CardContent className="pt-6">
          <StockentryCard refreshKey={refreshKey} />
        </CardContent>
      </Card>

      <StockentryDialog
        open={open}
        onClose={() => setOpen(false)}
        onNewMed={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
