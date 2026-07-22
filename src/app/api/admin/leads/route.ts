import { NextRequest, NextResponse } from "next/server";
import { isDbAvailable, prisma } from "@/lib/db";
import { getLeads, updateLeadStatus } from "@/lib/mock-data";
import { LeadStatus } from "@/types";

export async function GET() {
  if (isDbAvailable()) {
    try {
      const leads = await prisma.leadRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return NextResponse.json(
        leads.map((l) => ({
          id: l.id,
          category: l.category,
          name: l.name,
          phone: l.phone,
          email: l.email,
          city: l.city,
          description: l.description,
          status: l.status,
          createdAt: l.createdAt.toISOString(),
        }))
      );
    } catch {
      // fall through to mock
    }
  }
  return NextResponse.json(getLeads());
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    const validStatuses: LeadStatus[] = ["nouveau", "envoye", "accepte", "termine"];
    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    if (isDbAvailable()) {
      try {
        await prisma.leadRequest.update({ where: { id }, data: { status } });
        return NextResponse.json({ success: true });
      } catch {
        // fall through to mock
      }
    }

    updateLeadStatus(id, status);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
