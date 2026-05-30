import type { Metadata } from "next";
import AdminLeadTable from "@/components/AdminLeadTable";
import { LayoutDashboard, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Administration — DepannIA",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
            <p className="text-sm text-slate-500">Administration DepannIA</p>
          </div>
        </div>

        {/* Demo notice */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
          <p className="text-sm text-blue-800">
            <strong>Mode démonstration.</strong> Les données affichées sont des données de test. En production avec une base de données connectée, vous verrez les vraies demandes.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <AdminLeadTable />
        </div>
      </div>
    </div>
  );
}
