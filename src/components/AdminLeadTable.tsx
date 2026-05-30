"use client";

import { useState, useEffect } from "react";
import { LeadRequestData, ArtisanProfileData, LeadStatus } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/mock-data";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";
import { RefreshCw } from "lucide-react";

type Tab = "leads" | "artisans";

export default function AdminLeadTable() {
  const [tab, setTab] = useState<Tab>("leads");
  const [leads, setLeads] = useState<LeadRequestData[]>([]);
  const [artisans, setArtisans] = useState<ArtisanProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const [leadsRes, artisansRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/artisans"),
      ]);
      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (artisansRes.ok) setArtisans(await artisansRes.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  async function updateStatus(id: string, status: LeadStatus) {
    setUpdating(id);
    try {
      await fetch(`/api/admin/leads`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
          {(["leads", "artisans"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t === "leads" ? `Demandes (${leads.length})` : `Artisans (${artisans.length})`}
            </button>
          ))}
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Actualiser
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">Chargement…</div>
      ) : tab === "leads" ? (
        <LeadsTable leads={leads} updating={updating} onStatusChange={updateStatus} />
      ) : (
        <ArtisansTable artisans={artisans} />
      )}
    </div>
  );
}

function LeadsTable({
  leads,
  updating,
  onStatusChange,
}: {
  leads: LeadRequestData[];
  updating: string | null;
  onStatusChange: (id: string, status: LeadStatus) => void;
}) {
  const statuses: LeadStatus[] = ["nouveau", "envoye", "accepte", "termine"];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            {["Date", "Client", "Catégorie", "Ville", "Description", "Statut", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {leads.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-sm text-slate-400">
                Aucune demande pour le moment
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                  {formatDateTime(lead.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-sm text-slate-900">{lead.name}</div>
                  <div className="text-xs text-slate-500">{lead.phone}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <span className="flex items-center gap-1">
                    <span>{CATEGORY_ICONS[lead.category as keyof typeof CATEGORY_ICONS] ?? "🔧"}</span>
                    <span className="text-slate-700">{CATEGORY_LABELS[lead.category as keyof typeof CATEGORY_LABELS] ?? lead.category}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{lead.city}</td>
                <td className="max-w-[200px] px-4 py-3 text-xs text-slate-600 truncate" title={lead.description}>
                  {lead.description}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[lead.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {STATUS_LABELS[lead.status] ?? lead.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    disabled={updating === lead.id}
                    onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                    className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function ArtisansTable({ artisans }: { artisans: ArtisanProfileData[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            {["Date", "Entreprise", "Métier", "Ville", "Email", "Abonnement", "Statut"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {artisans.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-sm text-slate-400">
                Aucun artisan inscrit pour le moment
              </td>
            </tr>
          ) : (
            artisans.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                  {formatDateTime(a.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-sm text-slate-900">{a.companyName}</div>
                  <div className="text-xs text-slate-500">{a.contactName}</div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">{a.trade}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{a.city}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{a.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {a.subscriptionType === "mensuel" ? "29 €/mois" : "10 €/lead"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[a.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {STATUS_LABELS[a.status] ?? a.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
