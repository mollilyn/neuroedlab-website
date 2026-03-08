import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import contactSettings from "@/content/contact-settings.json";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

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
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
