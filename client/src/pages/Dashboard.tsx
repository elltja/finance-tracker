import { TransactionDialogTrigger } from "@/components/dashboard/TransactionDialog";
import DashboardLayout from "@/components/dashboard/Layout";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { useAuth } from "@/context/AuthContext";
import { capitalize } from "@/utils/capitalize";

export default function Dashboard() {
  const user = useAuth()!;
  return (
    <DashboardLayout>
      <div className="p-10 flex flex-col gap-10">
        <h1 className="text-xl font-bold">
          Welcome, {capitalize(user?.name)}!
        </h1>

        <TransactionDialogTrigger />
        <TransactionsTable />
      </div>
    </DashboardLayout>
  );
}
