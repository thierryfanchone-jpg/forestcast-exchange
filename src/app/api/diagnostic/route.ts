import { NextRequest, NextResponse } from "next/server";
import { getDiagnostic } from "@/lib/ai";
import { DiagnosticRequest, Category } from "@/types";
import { isDbAvailable, prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, category, imageBase64, city } = body;

    if (!description || typeof description !== "string" || description.trim().length < 5) {
      return NextResponse.json({ error: "Description trop courte" }, { status: 400 });
    }

    const validCategories: Category[] = [
      "electricite",
      "plomberie",
      "climatisation",
      "electromenager",
      "serrurerie",
      "general",
    ];
    const safeCategory: Category = validCategories.includes(category) ? category : "general";

    const diagRequest: DiagnosticRequest = {
      description: description.trim().slice(0, 2000),
      category: safeCategory,
      city: city ? String(city).slice(0, 100) : undefined,
      imageBase64: imageBase64 ? String(imageBase64).slice(0, 500_000) : undefined,
    };

    const result = await getDiagnostic(diagRequest);

    if (isDbAvailable()) {
      try {
        await prisma.diagnostic.create({
          data: {
            category: safeCategory,
            description: diagRequest.description,
            resultJson: result as object,
            dangerLevel: result.dangerLevel,
          },
        });
      } catch {
        // Non-blocking — continue even if DB write fails
      }
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
