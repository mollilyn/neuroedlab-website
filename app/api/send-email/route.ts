import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import contactSettings from "@/content/contact-settings.json";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, company, turnstileToken } =
      await req.json();

    // Honeypot check — bots fill this, humans don't
    if (company && company.trim() !== "") {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    // Turnstile verification
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    );
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json(
        { error: "Spam protection failed." },
        { status: 400 }
      );
    }

    // Field validation
    if (!name || !message || (!email && !phone)) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const contactEmail = contactSettings.contact.contactEmail;

    await resend.emails.send({
      from: "NeuroEd Lab <onboarding@resend.dev>",
      to: contactEmail,
      subject: "New message from NeuroEd Lab website",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || "—"}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
