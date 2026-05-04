import Billerdash from "@/components/Billerdash";
import Managerdash from "@/components/Managerdash";
import Admindash from "@/components/Admindash";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-start mt-16 px-4">
      {user.role === "biller" && <Billerdash />}
      {user.role === "manager" && <Managerdash />}
      {(user.role === "admin" || user.role === "inventory") && <Admindash />}
    </div>
  );
}
