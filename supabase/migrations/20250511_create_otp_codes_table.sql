
-- Create a table for OTP codes if it doesn't exist
CREATE TABLE IF NOT EXISTS public.otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(phone)
);

-- Add comment to the table
COMMENT ON TABLE public.otp_codes IS 'Stores temporary OTP codes for phone verification';
