import TransactionForm from "./TransactionForm";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Transaction } from "@/types/transaction";

interface TransactionDialogTriggerProps {
  children: (open: () => void) => React.ReactNode;
  initialData?: Transaction;
}

export function TransactionDialogTrigger({
  children,
  initialData,
}: TransactionDialogTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {children(() => setIsOpen(true))}
      <TransactionDialog
        initialData={initialData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Transaction;
  title?: string;
  subtitle?: string;
}

export function TransactionDialog({
  isOpen,
  onClose,
  initialData,
  title,
  subtitle,
}: TransactionDialogProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black opacity-20"
        aria-hidden="true"
        onMouseDown={onClose}
      ></div>
      <div
        aria-modal="true"
        role="dialog"
        className="relative z-50 mx-auto mt-40 w-full sm:w-2/3 lg:w-1/2 m-2 bg-bg p-6 rounded shadow"
      >
        <header className="mb-2">
          <h2 className="font-semibold text-lg">
            {title || t("dashboard.addTransaction")}
          </h2>
          <p>{subtitle || t("dashboard.addTransactionDialog.description")}</p>
        </header>
        <TransactionForm onClose={onClose} initialData={initialData} />
      </div>
    </div>
  );
}
