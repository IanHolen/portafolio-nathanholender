import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const rateMap = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_HOUR = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return false;
  }
  entry.count++;
  return entry.count > MAX_PER_HOUR;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: true, message: "Demasiados mensajes. Intenta de nuevo en una hora." },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; message?: string; _hp?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: true, message: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, message, _hp } = body;

  if (_hp) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: true, message: "Todos los campos son requeridos." },
      { status: 400 }
    );
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: true, message: "Email no válido." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: true, message: "Email service not configured. Use mailto fallback." },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Portafolio <onboarding@resend.dev>",
      to: "nathanholender@gmail.com",
      subject: `Nuevo mensaje de ${name} — Portafolio Nathan Holender`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9c3d2e;">Nuevo mensaje desde tu portafolio</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: true, message: "Error al enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
