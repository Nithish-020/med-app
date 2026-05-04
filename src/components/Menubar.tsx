import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Stethoscope,
  UserCircle,
  FileSearch,
  ShoppingCart,
  LayoutDashboard,
  TableProperties,
  FileBarChart,
  UserCog,
  History,
  LogOut,
  Menu as MenuIcon,
} from "lucide-react";
import Clock from "./Clock";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import EventService from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";

interface NavLink {
  icon: React.ReactNode;
  text: string;
  route: string;
}

export default function Menubar() {
  const { user, clearUser } = useAuth();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);

  const links: NavLink[] = useMemo(() => {
    switch (user.role) {
      case "biller":
        return [
          {
            icon: <LayoutDashboard className="h-4 w-4" />,
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: <FileSearch className="h-4 w-4" />,
            text: "Stock View",
            route: "/stockview",
          },
          {
            icon: <ShoppingCart className="h-4 w-4" />,
            text: "Bill Entry",
            route: "/billentry",
          },
        ];
      case "manager":
        return [
          {
            icon: <LayoutDashboard className="h-4 w-4" />,
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: <FileSearch className="h-4 w-4" />,
            text: "Stock View",
            route: "/stockview",
          },
          {
            icon: <TableProperties className="h-4 w-4" />,
            text: "Stock Entry",
            route: "/stockentry",
          },
          {
            icon: <FileBarChart className="h-4 w-4" />,
            text: "Sales Report",
            route: "/salesreport",
          },
        ];
      case "admin":
        return [
          {
            icon: <LayoutDashboard className="h-4 w-4" />,
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: <UserCog className="h-4 w-4" />,
            text: "Add User",
            route: "/adduser",
          },
          {
            icon: <History className="h-4 w-4" />,
            text: "Login History",
            route: "/loginhistory",
          },
        ];
      case "inventory":
        return [
          {
            icon: <LayoutDashboard className="h-4 w-4" />,
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: <FileSearch className="h-4 w-4" />,
            text: "Stock View",
            route: "/stockview",
          },
          {
            icon: <TableProperties className="h-4 w-4" />,
            text: "Stock Entry",
            route: "/stockentry",
          },
        ];
      default:
        return [];
    }
  }, [user.role]);

  useEffect(() => {
    if (user.role === "") {
      navigate("/");
    }
  }, [user.role, navigate]);

  const logout = () => {
    EventService.Logout({ user_id: user.user_id })
      .catch((err) => console.log(err))
      .finally(() => {
        clearUser();
        setDialog(false);
        navigate("/");
      });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-primary shadow-sm">
        <div className="flex items-center px-3 h-12 gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground">
            <Stethoscope className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-wide">MEDAPP</span>
          </div>

          <div className="hidden md:block px-3 py-1 rounded-full bg-black/30">
            <Clock />
          </div>

          <nav className="ml-auto hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/15 text-primary-foreground px-3 py-1.5 rounded-full">
              <UserCircle className="h-4 w-4" />
              <span className="font-semibold text-sm">{user.username}</span>
            </div>
            {links.map((l) => (
              <Button
                key={l.route}
                asChild
                size="sm"
                variant="secondary"
                className="rounded-full"
              >
                <Link to={l.route} className="flex items-center gap-1">
                  {l.icon}
                  <span>{l.text}</span>
                </Link>
              </Button>
            ))}
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full"
              onClick={() => setDialog(true)}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </nav>

          <div className="ml-auto lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="gap-2 opacity-100" disabled>
                  <UserCircle className="h-4 w-4" />
                  <span className="font-semibold">{user.username}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {links.map((l) => (
                  <DropdownMenuItem key={l.route} asChild>
                    <Link to={l.route} className="flex items-center gap-2">
                      {l.icon}
                      <span>{l.text}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setDialog(true)}
                  className="text-warning-foreground bg-warning/10 focus:bg-warning/20"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="max-w-md" hideClose>
          <DialogTitle>You want to Logout?</DialogTitle>
          <DialogFooter className="mt-4">
            <Button variant="destructive" onClick={() => setDialog(false)}>
              Cancel
            </Button>
            <Button onClick={logout}>Sure</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
