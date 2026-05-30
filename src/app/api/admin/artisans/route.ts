import { NextResponse } from "next/server";
import { isDbAvailable, prisma } from "@/lib/db";
import { getArtisans } from "@/lib/mock-data";

export async function GET() {
  if (isDbAvailable()) {
    try {
      const artisans = await prisma.artisanProfile.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return NextResponse.json(
        artisans.map((a) => ({
          id: a.id,
          companyName: a.companyName,
          contactName: a.contactName,
          trade: a.trade,
          siret: a.siret,
          phone: a.phone,
          email: a.email,
          city: a.city,
          serviceAreas: a.serviceAreas,
          availability: a.availability,
          subscriptionType: a.subscriptionType,
          status: a.status,
          createdAt: a.createdAt.toISOString(),
        }))
      );
    } catch {
      // fall through to mock
    }
  }
  return NextResponse.json(getArtisans());
}
