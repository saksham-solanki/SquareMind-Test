-- Run this in your Supabase SQL Editor to create the EOI table

CREATE TABLE IF NOT EXISTS eoi_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  budget_range TEXT,
  preferred_city TEXT,
  property_type TEXT,
  source_page TEXT DEFAULT '/properties',
  submitted_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for rate limiting lookups by phone
CREATE INDEX idx_eoi_phone_submitted ON eoi_submissions (phone, submitted_at DESC);

-- Index for querying by email
CREATE INDEX idx_eoi_email ON eoi_submissions (email);

-- Enable Row Level Security
ALTER TABLE eoi_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon key (public form submissions)
CREATE POLICY "Allow public inserts" ON eoi_submissions
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated/service role can read submissions
CREATE POLICY "Only service role can read" ON eoi_submissions
  FOR SELECT
  USING (auth.role() = 'service_role');
