import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="">
        <LoaderCircle className="w-25 h-25 text-gray-300 animate-spin" />
      </div>
    </div>
  );
}
