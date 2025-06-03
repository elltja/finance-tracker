import { LucideProps } from "lucide-react";
import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  Icon: React.ComponentType<LucideProps>;
}

export default function FormInput({
  label,
  Icon,
  id,
  ...props
}: FormInputProps) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="px-3 border border-gray-300 rounded-sm flex items-center gap-3">
        <label htmlFor={id}>
          <Icon className="text-gray-500" size={20} />
        </label>
        <input {...props} id={id} className="outline-none py-2 w-full" />
      </div>
    </div>
  );
}
