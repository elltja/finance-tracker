import Button from "../shared/Button";
import { Plus } from "lucide-react";
import usePersistentState from "@/hooks/usePersistentState";
import TransactionForm from "./TransactionForm";
import { useTranslation } from "react-i18next";
export function TransactionDialogTrigger() {
  const [isOpen, setIsOpen] = usePersistentState(
    false,
    "transaction-dialog-state"
  );
  const { t } = useTranslation();
  return (
    <>
      <Button
        aria-haspopup="dialog"
        className="w-fit px-4 flex items-center gap-1"
        aria-label="Open transaction dialog"
        onClick={() => setIsOpen(true)}
      >
        {t("dashboard.addTransaction")} <Plus className="size-5" />
      </Button>
      <TransactionDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDialog({ isOpen, onClose }: TransactionDialogProps) {
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
            {t("dashboard.addTransaction")}
          </h2>
          <p>{t("dashboard.addTransactionDialog.description")}</p>
        </header>
        <TransactionForm onClose={onClose} />
      </div>
    </div>
  );
}
