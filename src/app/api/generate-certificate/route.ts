import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const certId = searchParams.get("id");

  if (!certId) {
    return NextResponse.json({ error: "Certificate ID required" }, { status: 400 });
  }

  // In a real implementation, this would:
  // 1. Fetch the certificate from Supabase
  // 2. Generate a PDF using a library like @react-pdf/renderer or puppeteer
  // 3. Return the PDF file

  // For now, return a simple HTML certificate as demonstration
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Certificat ORION ACADEMY</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0b1120; color: white; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .cert { background: linear-gradient(135deg, #111827 0%, #1e293b 100%); border: 2px solid #c9a84c; border-radius: 16px; padding: 60px; max-width: 700px; width: 100%; text-align: center; position: relative; }
    .cert::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #9e7a2a, #c9a84c, #e8c96a); border-radius: 16px 16px 0 0; }
    .logo { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #c9a84c; margin-bottom: 4px; }
    .logo span { font-family: 'Inter', sans-serif; font-weight: 600; letter-spacing: 0.3em; color: white; font-size: 16px; }
    .subtitle { color: #64748b; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 40px; }
    .award { color: #94a3b8; font-size: 14px; margin-bottom: 8px; }
    .name { font-size: 36px; font-weight: 700; color: white; margin-bottom: 8px; }
    .cert-title { color: #c9a84c; font-size: 20px; font-weight: 600; margin: 20px 0; }
    .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.3); border-radius: 50px; padding: 8px 20px; margin: 16px 0; }
    .score-text { color: #94a3b8; font-size: 13px; margin: 8px 0; }
    .footer { display: flex; justify-content: space-between; align-items: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #1e2d4a; font-size: 12px; color: #475569; }
    .qr-placeholder { width: 60px; height: 60px; border: 1px solid #1e2d4a; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #475569; }
  </style>
</head>
<body>
  <div class="cert">
    <div class="logo">ORION <span>ACADEMY</span></div>
    <div class="subtitle">Certificat officiel de formation</div>
    <div class="award">Ce certificat est décerné à</div>
    <div class="name">Apprenant Demo</div>
    <div class="award">pour avoir complété avec succès</div>
    <div class="cert-title">Certification Orion Speak — Prise de parole</div>
    <div class="badge">🥇 Mention Or — 92/100</div>
    <div class="score-text">Émis le ${new Date().toLocaleDateString("fr-FR")}</div>
    <div class="footer">
      <div>
        <div>Certificat #${certId}</div>
        <div>orion-academy.fr/verify/${certId}</div>
      </div>
      <div class="qr-placeholder">QR Code</div>
      <div>
        <div style="color: #c9a84c; font-weight: 600;">ORION ACADEMY</div>
        <div>Signature officielle</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
