import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="">
        <LoaderCircle className="w-15 h-15 text-gray-300 animate-spin" />
      </div>
    </div>
  );
}
