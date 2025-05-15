
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
      .from('otp_requests')
      .select('*')
      .eq('phone_number', formattedPhone)
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

    // Check if a user with this phone number already exists
    // We do this by searching in auth.users with phone number as identity
    const { data: existingUsers, error: searchError } = await supabase.auth.admin.listUsers({
      filter: {
        phone: formattedPhone,
      },
    });

    if (searchError) {
      console.error('Error searching for existing users:', searchError);
      return new Response(
        JSON.stringify({ error: 'Error verifying user' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let userId;
    
    // If user doesn't exist, create a new one
    if (!existingUsers || !existingUsers.users || existingUsers.users.length === 0) {
      // Generate a random password - the user can change it later if needed
      const randomPassword = Math.random().toString(36).slice(-8);

      // Create a new user with the phone number
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        phone: formattedPhone,
        password: randomPassword,
        phone_confirm: true,
        user_metadata: {
          phone_verified: true
        }
      });

      if (createError) {
        console.error('Error creating user:', createError);
        return new Response(
          JSON.stringify({ error: 'Failed to create user account' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      userId = newUser.user.id;
    } else {
      // Update the existing user to mark phone as confirmed
      const existingUser = existingUsers.users[0];
      userId = existingUser.id;

      const { error: updateError } = await supabase.auth.admin.updateUserById(
        userId,
        { phone_confirm: true, user_metadata: { phone_verified: true } }
      );

      if (updateError) {
        console.error('Error updating user:', updateError);
        // Continue anyway as the verification was successful
      }
    }

    // Delete the used OTP
    const { error: deleteError } = await supabase
      .from('otp_requests')
      .delete()
      .eq('phone_number', formattedPhone);
    
    if (deleteError) {
      console.error('Error deleting OTP:', deleteError);
      // Continue anyway as the verification was successful
    }

    // Return success response with the user ID
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Phone verified successfully',
        user_id: userId
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
