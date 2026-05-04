import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Menubar from "./components/Menubar";
import BottomNav from "./components/BottomNav";
import EventService from "./services/eventService";
import AppRoutes from "./router/routes";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();
  const [sheet, setSheet] = useState(false);
  const location = useLocation();

  const menuShow = user.role !== "" && location.pathname !== "/";

  useEffect(() => {
    EventService.CheckValid()
      .then((response) => {
        if (response.data.status === "S" && response.data.valid === "Not") {
          setSheet(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {menuShow && <Menubar />}
      <BottomNav open={sheet} onOpenChange={setSheet} />
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
}
