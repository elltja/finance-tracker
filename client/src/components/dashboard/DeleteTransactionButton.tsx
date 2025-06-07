import { useTranslation } from "react-i18next";
import Button from "../shared/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/transactions/delete`;

interface DeleteTransactionButtonProps {
  transactionId: string;
  onClose: () => void;
}

export default function DeleteTransactionButton({
  transactionId,
  onClose,
}: DeleteTransactionButtonProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch(API_URL, {
        method: "DELETE",
        body: JSON.stringify({ id: transactionId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["transactions"] });
    },
  });
  return (
    <Button
      variant="outline"
      className="border-red-500 text-red-500"
      onClick={() => {
        mutate();
        onClose();
      }}
    >
      {t("dashboard.addTransactionDialog.delete")}
    </Button>
  );
}
