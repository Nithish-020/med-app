import { Routes, Route } from "react-router-dom";
import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import BillEntry from "@/views/BillEntry";
import Adduser from "@/views/Adduser";
import StockViewcard from "@/views/StockViewcard";
import Loginhistory from "@/views/Loginhistory";
import Salesreport from "@/views/Salesreport";
import Stockentry from "@/views/Stockentry";
import Convo from "@/views/Convo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/stockentry" element={<Stockentry />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/billentry" element={<BillEntry />} />
      <Route path="/adduser" element={<Adduser />} />
      <Route path="/stockview" element={<StockViewcard />} />
      <Route path="/loginhistory" element={<Loginhistory />} />
      <Route path="/salesreport" element={<Salesreport />} />
      <Route path="/convo" element={<Convo />} />
    </Routes>
  );
}
