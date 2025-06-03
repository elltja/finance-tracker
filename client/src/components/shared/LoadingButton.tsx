import { Loader2Icon } from "lucide-react";
import Button from "./Button";
import { ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  children: React.ReactNode;
}
export function LoadingButton({
  isLoading,
  children,
  ...props
}: LoadingButtonProps) {
  console.log(isLoading);

  return (
    <Button {...props}>
      <LoadingTextSwap isLoading={isLoading}>{children}</LoadingTextSwap>
    </Button>
  );
}

function LoadingTextSwap({
  isLoading,
  children,
}: Pick<LoadingButtonProps, "isLoading" | "children">) {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={`col-start-1 col-end-2 row-start-1 row-end-2 ${
          isLoading ? "invisible" : "visible"
        }`}
      >
        {children}
      </div>
      <div
        className={`col-start-1 col-end-2 row-start-1 row-end-2 text-center ${
          isLoading ? "visible" : "invisible"
        }`}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
}
