
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

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
        JSON.stringify({ error: 'Phone number and code are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format the phone number to ensure it has a '+' prefix if needed
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    // Create a Supabase client with the Admin key to access RLS protected tables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the OTP from the database
    const { data: otpData, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('phone', formattedPhone)
      .single();
    
    if (otpError || !otpData) {
      console.error('Error retrieving OTP:', otpError);
      return new Response(
        JSON.stringify({ error: 'Invalid verification code', invalid: true }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if OTP is expired
    const expiresAt = new Date(otpData.expires_at);
    const now = new Date();
    
    if (now > expiresAt) {
      console.error('OTP expired');
      return new Response(
        JSON.stringify({ error: 'Verification code has expired', expired: true }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if OTP matches
    if (otpData.code !== code) {
      console.error('Invalid OTP');
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
      // Continue anyway as the verification was successful
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Phone verified successfully'
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
