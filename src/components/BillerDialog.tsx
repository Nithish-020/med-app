import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import type { BillDetail } from "@/types";

interface Props {
  preview: BillDetail[];
  open: boolean;
  onClose: () => void;
}

export default function BillerDialog({ preview, open, onClose }: Props) {
  const total = useMemo(
    () => preview.reduce((sum, item) => sum + item.billAmt, 0),
    [preview],
  );
  const gst = (18 / 100) * total;
  const netPayable = total + gst;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl p-0" hideClose>
        <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3 rounded-t-lg">
          <Button
            size="icon"
            variant="ghost"
            className="text-primary-foreground hover:bg-white/10"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </Button>
          <DialogTitle className="text-sm">PREVIEW</DialogTitle>
        </div>
        <div className="p-4 max-h-[300px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine name</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {preview.map((item, idx) => (
                <TableRow key={`${item.medicinename}-${idx}`}>
                  <TableCell>{item.medicinename}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.billAmt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col items-end gap-1 pr-8 mt-4 text-sm">
            <span>
              <b>Total :</b> {total}
            </span>
            <span>
              <b>GST :</b> {gst.toFixed(2)}
            </span>
            <span>
              <b>Net Price :</b> {netPayable.toFixed(2)}
            </span>
          </div>
        </div>

        <DialogFooter className="px-4 pb-4">
          <Button variant="success" className="w-[30%] rounded-full">
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
