import { Card, CardHeader } from "./ui/card";

export default function Admindash() {
  return (
    <Card className="w-[400px]">
      <CardHeader className="items-center">
        <h2 className="text-center text-2xl font-bold text-primary">
          Welcome!
        </h2>
      </CardHeader>
    </Card>
  );
}
