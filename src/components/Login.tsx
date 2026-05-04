import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import EventService from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";
import type { AuthUser } from "@/types";
import pharmacyBg from "@/assets/pharmacy.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Invalid User name or Password");
      return;
    }

    EventService.GetLogin({ username, password })
      .then((response) => {
        if (response.data.status === "S") {
          const loginData = response.data.loginData as AuthUser;
          if (!loginData?.user_id || loginData.user_id === 0) {
            toast.error("Invalid User name or Password");
            return;
          }
          setUser(loginData);
          navigate("/dashboard");
        } else {
          toast.error("Invalid User name or Password");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login request failed");
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${pharmacyBg})` }}
    >
      <Card className="w-[350px] bg-white/95 backdrop-blur">
        <CardHeader className="items-center text-center">
          <h2 className="text-2xl font-bold text-primary">Login to MedApp</h2>
        </CardHeader>
        <form onSubmit={submit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button type="submit" className="w-[150px]">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
