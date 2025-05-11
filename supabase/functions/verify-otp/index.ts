
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

// CORS headers for the function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request data
    const { phone, code } = await req.json();
    
    if (!phone || !code) {
      return new Response(
        JSON.stringify({ error: 'Phone number and verification code are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format the phone number to ensure it has a '+' prefix if needed
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    // Create a Supabase client with the Admin key to access RLS protected tables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the stored OTP code
    const { data: otpData, error: fetchError } = await supabase
      .from('otp_codes')
      .select('code, expires_at')
      .eq('phone', formattedPhone)
      .single();
    
    if (fetchError) {
      console.error('Error fetching OTP:', fetchError);
      return new Response(
        JSON.stringify({ error: 'No verification code found for this phone number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if OTP has expired
    const now = new Date();
    const expiresAt = new Date(otpData.expires_at);
    
    if (now > expiresAt) {
      return new Response(
        JSON.stringify({ error: 'Verification code has expired', expired: true }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if OTP matches
    if (otpData.code !== code) {
      return new Response(
        JSON.stringify({ error: 'Invalid verification code', invalid: true }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Delete the used OTP
    const { error: deleteError } = await supabase
      .from('otp_codes')
      .delete()
      .eq('phone', formattedPhone);
    
    if (deleteError) {
      console.error('Error deleting OTP:', deleteError);
      // Continue anyway as this is not critical
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP verification successful',
        verified: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in verify-otp function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
