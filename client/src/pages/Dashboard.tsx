import { TransactionDialogTrigger } from "@/components/dashboard/TransactionDialog";
import DashboardLayout from "@/components/dashboard/Layout";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { useAuth } from "@/context/AuthContext";
import { capitalize } from "@/utils/capitalize";
import { useTranslation } from "react-i18next";
import "@/utils/i18n/i18n";

export default function Dashboard() {
  const user = useAuth()!;
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-xl font-bold"></h1>
        {t("welcomeMessage", { name: capitalize(user?.name) })}
        <TransactionDialogTrigger />
        <TransactionsTable />
      </div>
    </DashboardLayout>
  );
}
