import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { getResend } from "@/lib/resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Form types that only require an email address (no name/phone). */
const emailOnlyFormTypes = ["newsletter", "download_gate"];

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { name, email, phone, form_type } = body as {
    name?: string;
    email?: string;
    phone?: string;
    form_type?: string;
  };

  const isEmailOnly = emailOnlyFormTypes.includes(form_type ?? "");

  // Validate required fields based on form type
  if (isEmailOnly) {
    if (!email) {
      return NextResponse.json(
        { error: "Missing required field: email" },
        { status: 400 }
      );
    }
  } else {
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone" },
        { status: 400 }
      );
    }
  }

  // Validate email format
  if (!EMAIL_REGEX.test(email!)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Insert into Supabase
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("leads").insert({
    name: name || null,
    email,
    phone: phone || null,
    budget_range: (body.budget_range as string) || null,
    location: (body.location as string) || null,
    source_page: (body.source_page as string) || null,
    form_type: form_type || "landing_tri_city",
    utm_source: (body.utm_source as string) || null,
    utm_medium: (body.utm_medium as string) || null,
    utm_campaign: (body.utm_campaign as string) || null,
    utm_content: (body.utm_content as string) || null,
    utm_term: (body.utm_term as string) || null,
  });

  if (error) {
    console.error("[API /leads] Supabase insert error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }

  // Send email notification (best-effort -- never block the success response)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = getResend();
      const recipients = (process.env.RESEND_NOTIFICATION_TO ?? "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      if (recipients.length > 0) {
        const displayName = name || email;
        await resend.emails.send({
          from: "SquareMind Leads <leads@squaremind.in>",
          to: recipients,
          subject: `New Lead: ${displayName} (${form_type || "unknown"})`,
          html: `
            <h2>New Lead Submission</h2>
            <table style="border-collapse:collapse;font-family:sans-serif;">
              <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${name || "—"}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;">${email}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${phone || "—"}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Form Type</td><td style="padding:4px 12px;">${form_type || "—"}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Source Page</td><td style="padding:4px 12px;">${(body.source_page as string) || "—"}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">UTM Source</td><td style="padding:4px 12px;">${(body.utm_source as string) || "—"}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Budget</td><td style="padding:4px 12px;">${(body.budget_range as string) || "—"}</td></tr>
              <tr><td style="padding:4px 12px;font-weight:bold;">Location</td><td style="padding:4px 12px;">${(body.location as string) || "—"}</td></tr>
            </table>
          `,
        });
      }
    } catch (emailError) {
      console.error("[API /leads] Resend notification error:", emailError);
      // Lead is already saved -- don't fail the response
    }
  }

  return NextResponse.json({ success: true });
}
