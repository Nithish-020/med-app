import { useState } from "react";
import BillerDrop from "@/components/BillerDrop";
import PreSave from "@/components/PreSave";
import BillerTable from "@/components/BillerTable";
import BillerDialog from "@/components/BillerDialog";
import type { BillDetail } from "@/types";

export default function BillEntry() {
  const [preSave, setPreSave] = useState<BillDetail[]>([]);
  const [dialog, setDialog] = useState(false);

  return (
    <div>
      <BillerDrop trash={preSave} onAdd={setPreSave} />
      <PreSave
        arr={preSave}
        onReset={setPreSave}
        onPreview={() => setDialog(true)}
      />
      <BillerTable dummy={preSave} />
      <BillerDialog
        preview={preSave}
        open={dialog}
        onClose={() => setDialog(false)}
      />
    </div>
  );
}
