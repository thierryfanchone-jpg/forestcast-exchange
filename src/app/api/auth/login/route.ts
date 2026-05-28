import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
  twoFactorCode: z.string().regex(/^\d{6}$/).optional(),
});

export async function POST(req: Request) {
  const parsed = Schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
  // Stub — would call NextAuth credentials provider and issue session cookie.
  return NextResponse.json({ ok: true, requires2fa: !parsed.data.twoFactorCode });
}
