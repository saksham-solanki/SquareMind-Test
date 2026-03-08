import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const { name, email, phone } = body as {
    name?: string;
    email?: string;
    phone?: string;
  };

  // Validate required fields
  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, phone" },
      { status: 400 }
    );
  }

  // Validate email format
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Insert into Supabase
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone,
    budget_range: (body.budget_range as string) || null,
    location: (body.location as string) || null,
    source_page: (body.source_page as string) || null,
    form_type: (body.form_type as string) || "landing_tri_city",
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

  return NextResponse.json({ success: true });
}
