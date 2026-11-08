import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, message, budget } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required fields." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL_TO || "contact@anjalsh.com";

    // If Resend API Key is configured in environment:
    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ANJALSH Portfolio <onboarding@resend.dev>",
          to: [recipientEmail],
          reply_to: email,
          subject: `[ANJALSH®️ Portfolio Inquiry] ${projectType || "General"} from ${name}`,
          text: `
New project inquiry received via ANJALSH®️ website:

Name: ${name}
Email: ${email}
Project Type: ${projectType || "Not specified"}
Budget/Timeline: ${budget || "Not specified"}

Message:
${message}
          `,
        }),
      });

      if (emailResponse.ok) {
        return NextResponse.json({
          success: true,
          configured: true,
          message: "Your message has been successfully transmitted. Anjalsh will respond within 24–48 hours.",
        });
      } else {
        const errData = await emailResponse.json();
        console.error("Resend delivery error:", errData);
        return NextResponse.json(
          {
            success: false,
            configured: true,
            error: "Service transmission error. Please reach out directly via contact@anjalsh.com",
          },
          { status: 502 }
        );
      }
    }

    // Explicit transparent notification when backend email provider is not yet set in .env.local
    console.log("=== INCOMING CONTACT INQUIRY (AWAITING RESEND_API_KEY) ===");
    console.log(`From: ${name} <${email}>`);
    console.log(`Type: ${projectType}`);
    console.log(`Message: ${message}`);
    console.log("=========================================================");

    return NextResponse.json({
      success: false,
      configured: false,
      message:
        "The contact form is functional, but RESEND_API_KEY is not yet configured in your .env.local file. To test live delivery, add RESEND_API_KEY to .env.local. In the meantime, you can send this inquiry directly via your email client using the button below.",
      prefill: {
        name,
        email,
        projectType,
        message,
      },
    });
  } catch (error) {
    console.error("Contact API Exception:", error);
    return NextResponse.json(
      { error: "Internal server error processing contact inquiry." },
      { status: 500 }
    );
  }
}
