import Navbar from "@/components/dashboard/Navbar";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const user = useAuth();
  return (
    <>
      <Navbar />
      <h1 className="text-xl font-bold">Welcome, {user?.name}!</h1>
      <TransactionsTable />
    </>
  );
}
