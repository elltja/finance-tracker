import { LucideProps } from "lucide-react";
import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ComponentType<LucideProps>;
}

export default function FormInput({ Icon, ...props }: FormInputProps) {
  return (
    <div className="py-2 px-3 border border-gray-300 rounded-sm flex items-center gap-3">
      <Icon className="text-gray-600" size={20} />
      <input {...props} className="outline-none" />
    </div>
  );
}
