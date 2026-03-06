import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const RATE_LIMIT_MAX = 3;

function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+]/g, "");
  return /^(91)?[6-9]\d{9}$/.test(cleaned);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function isRateLimited(phone: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("eoi_submissions")
    .select("*", { count: "exact", head: true })
    .eq("phone", phone)
    .gte("submitted_at", twentyFourHoursAgo);

  if (error) {
    console.error("[Rate limit check error]", error);
    return false;
  }

  return (count ?? 0) >= RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, email, budget_range, preferred_city, property_type, source_page } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Valid name is required" }, { status: 400 });
    }

    if (!phone || !isValidIndianPhone(phone)) {
      return NextResponse.json(
        { error: "Valid Indian mobile number is required" },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const cleanedPhone = phone.replace(/[\s\-+]/g, "");

    if (await isRateLimited(cleanedPhone)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const submission = {
      name: name.trim(),
      phone: cleanedPhone,
      email: email.trim().toLowerCase(),
      budget_range: budget_range || null,
      preferred_city: preferred_city || null,
      property_type: property_type || null,
      source_page: source_page || "/properties",
    };

    const supabase = getSupabase();

    if (supabase) {
      const { error: insertError } = await supabase.from("eoi_submissions").insert(submission);

      if (insertError) {
        console.error("[Supabase insert error]", insertError);
        return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
      }
    } else {
      // Fallback: log to console when Supabase is not configured
      console.log("[EOI Submission — no DB]", JSON.stringify(submission, null, 2));
    }

    return NextResponse.json({ success: true, message: "Expression of interest submitted" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
