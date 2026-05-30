import { NextRequest, NextResponse } from "next/server";
import { isDbAvailable, prisma } from "@/lib/db";
import { addArtisan } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactName,
      trade,
      siret,
      phone,
      email,
      city,
      serviceAreas,
      availability,
      subscriptionType,
    } = body;

    if (!companyName || !contactName || !trade || !phone || !email || !city || !serviceAreas || !availability) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const artisanData = {
      companyName: String(companyName).slice(0, 200),
      contactName: String(contactName).slice(0, 100),
      trade: String(trade).slice(0, 100),
      siret: siret ? String(siret).slice(0, 20) : undefined,
      phone: String(phone).slice(0, 20),
      email: String(email).slice(0, 200),
      city: String(city).slice(0, 100),
      serviceAreas: String(serviceAreas).slice(0, 500),
      availability: String(availability).slice(0, 200),
      subscriptionType: subscriptionType === "lead" ? "lead" : "mensuel",
    };

    let id: string;

    if (isDbAvailable()) {
      try {
        const artisan = await prisma.artisanProfile.create({ data: artisanData });
        id = artisan.id;
      } catch {
        const mock = addArtisan(artisanData);
        id = mock.id;
      }
    } else {
      const mock = addArtisan(artisanData);
      id = mock.id;
    }

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
