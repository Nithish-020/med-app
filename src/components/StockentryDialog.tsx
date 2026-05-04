import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import EventService from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onNewMed: () => void;
}

export default function StockentryDialog({ open, onClose, onNewMed }: Props) {
  const { user } = useAuth();
  const [medName, setMedName] = useState("");
  const [brand, setBrand] = useState("");

  const push = () => {
    if (!medName || !brand) {
      toast.warning("Field not be Empty");
      return;
    }
    EventService.InsertMed({ user_id: user.user_id, medName, brand })
      .then((response) => {
        if (response.data.status === "S") {
          toast.success("Medicine added Successfully");
          onNewMed();
        } else {
          toast.error("Medicine already Exist");
        }
      })
      .catch((err) => console.log(err));
    setMedName("");
    setBrand("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md p-0" hideClose>
        <div className="bg-primary text-primary-foreground rounded-t-lg px-4 py-3 flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="text-primary-foreground hover:bg-white/10"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle>ADD STOCK</DialogTitle>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <Label>Medicine Name</Label>
            <Input
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
            />
          </div>
          <div>
            <Label>Brand</Label>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="justify-center pb-4">
          <Button onClick={push}>ADD</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
