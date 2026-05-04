import { Sheet, SheetContent, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BottomNav({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-32 flex flex-col items-center">
        <SheetTitle className="sr-only">Welcome</SheetTitle>
        <Button
          variant="ghost"
          className="mt-2 text-destructive"
          onClick={() => onOpenChange(false)}
        >
          Thanks
        </Button>
        <div className="py-3 text-center text-sm">
          Hi! <span className="text-primary font-medium">"MED APP"</span> User,
          we are pleased to have you use our application, which was created in
          an intuitive and flexible manner. Please contact your{" "}
          <u className="text-primary">admin</u> if you don't already have a
          user login.
        </div>
      </SheetContent>
    </Sheet>
  );
}
