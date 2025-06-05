import { LucideProps } from "lucide-react";
import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ComponentType<LucideProps>;
}

export default function FormInput({ Icon, id, ...props }: FormInputProps) {
  return (
    <div>
      <div className="px-3 border border-border rounded-sm flex items-center gap-3">
        <label htmlFor={id}>
          <Icon className="text-gray-500" size={20} />
        </label>
        <input {...props} id={id} className="outline-none py-2 w-full" />
      </div>
    </div>
  );
}
