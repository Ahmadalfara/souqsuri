
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

// CORS headers for the function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate a random 6-digit code
const generateOTPCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the API key from environment variables
    const apiKey = Deno.env.get('EASYSEND_SMS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get request data
    const { phone } = await req.json();
    
    if (!phone) {
      return new Response(
        JSON.stringify({ error: 'Phone number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate OTP code
    const otpCode = generateOTPCode();
    
    // Create a message for the SMS
    const message = `Your verification code is: ${otpCode}. It will expire in 5 minutes.`;

    // Format the phone number to ensure it has a '+' prefix if needed
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    // Create a Supabase client with the Admin key to access RLS protected tables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store the OTP in Supabase with an expiration timestamp (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    
    // Store the OTP in a table
    const { error: storeError } = await supabase
      .from('otp_codes')
      .upsert(
        { 
          phone: formattedPhone, 
          code: otpCode, 
          expires_at: expiresAt.toISOString() 
        },
        { onConflict: 'phone' }
      );
    
    if (storeError) {
      console.error('Error storing OTP:', storeError);
      return new Response(
        JSON.stringify({ error: 'Failed to store OTP code' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare the EasySendSMS API request
    const apiUrl = new URL('https://www.easysendsms.com/sms/api');
    apiUrl.searchParams.append('action', 'send-sms');
    apiUrl.searchParams.append('api_key', apiKey);
    apiUrl.searchParams.append('to', formattedPhone);
    apiUrl.searchParams.append('from', 'SyrianDL');
    apiUrl.searchParams.append('sms', message);

    // Send the SMS
    const smsResponse = await fetch(apiUrl.toString());
    
    if (!smsResponse.ok) {
      const errorText = await smsResponse.text();
      console.error('SMS API Error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to send SMS', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const smsResult = await smsResponse.text();
    console.log('SMS sent successfully:', smsResult);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP code sent successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in send-otp function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
