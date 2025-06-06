import { TransactionDialogTrigger } from "@/components/dashboard/TransactionDialog";
import DashboardLayout from "@/components/dashboard/Layout";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { useAuth } from "@/context/AuthContext";
import { capitalize } from "@/utils/capitalize";
import { useTranslation } from "react-i18next";
import "@/utils/i18n/i18n";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  const { t } = useTranslation();

  if (!user || isLoading) return <Loading />;
  return (
    <DashboardLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-xl font-bold">
          {t("dashboard.welcomeMessage", { name: capitalize(user?.name) })}
        </h1>

        <TransactionDialogTrigger />
        <Suspense>
          <TransactionsTable />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
