import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Card } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import EventService from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types";

const ROLES: Role[] = ["biller", "manager", "admin", "inventory"];

export default function Usercard() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("");

  const reset = () => {
    setUsername("");
    setPassword("");
    setRole("");
  };

  const addUser = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password || !role) {
      toast.warning("All fields are required");
      return;
    }

    EventService.Adduser({
      user_id: user.user_id,
      username,
      password,
      role,
    })
      .then((response) => {
        if (response.data.status === "S") {
          toast.success("User Added Successfully");
        } else {
          toast.error("User & Role Already Exist");
        }
      })
      .catch((err) => console.log(err));

    reset();
  };

  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="flex flex-col items-center justify-center">
        <Card className="w-[700px] max-w-full border-0 shadow-none">
          <span className="text-sm font-bold mb-2 ml-1 block">
            User details
          </span>
          <Accordion type="single" collapsible>
            <AccordionItem value="item" className="rounded border">
              <AccordionTrigger className="bg-primary text-primary-foreground rounded-t">
                Item
              </AccordionTrigger>
              <AccordionContent>
                <form
                  onSubmit={addUser}
                  className="flex gap-4 items-end mt-4 flex-wrap"
                >
                  <div className="flex-1 min-w-[120px]">
                    <Label>User Id</Label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <Label>Password</Label>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <Label>Role</Label>
                    <Select
                      value={role}
                      onValueChange={(v) => setRole(v as Role)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.filter((r) => r !== "").map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-[50%] sm:w-auto">
                    ADD
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
