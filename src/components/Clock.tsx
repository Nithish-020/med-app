import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

export default function Clock() {
  const [now, setNow] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const id = window.setInterval(
      () => setNow(new Date().toLocaleTimeString()),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="flex items-center gap-2 font-bold text-primary-foreground">
      <Timer className="h-4 w-4" />
      <span>{now}</span>
    </p>
  );
}
