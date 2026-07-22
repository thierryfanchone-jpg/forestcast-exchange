import { NextRequest, NextResponse } from "next/server";
import { isDbAvailable, prisma } from "@/lib/db";
import { addLead } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, name, phone, email, city, description } = body;

    if (!name || !phone || !email || !city || !description) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const leadData = {
      category: category || "general",
      name: String(name).slice(0, 100),
      phone: String(phone).slice(0, 20),
      email: String(email).slice(0, 200),
      city: String(city).slice(0, 100),
      description: String(description).slice(0, 2000),
    };

    let id: string;

    if (isDbAvailable()) {
      try {
        const lead = await prisma.leadRequest.create({ data: leadData });
        id = lead.id;
      } catch {
        const mock = addLead(leadData);
        id = mock.id;
      }
    } else {
      const mock = addLead(leadData);
      id = mock.id;
    }

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
