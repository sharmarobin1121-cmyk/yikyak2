import { Request, Response } from 'express';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: Request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ error: 'Phone number is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Get Twilio credentials from Supabase environment
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioServiceSid = Deno.env.get('TWILIO_SERVICE_SID');

    if (!twilioAccountSid || !twilioAuthToken || !twilioServiceSid) {
      return new Response(
        JSON.stringify({ error: 'Twilio configuration missing' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Initialize Twilio client
    const twilio = await import('npm:twilio@5.8.0');
    const client = twilio(
      twilioAccountSid,
      twilioAuthToken
    );

    // Send verification code using Twilio Verify
    const verification = await client.verify.v2
      .services(twilioServiceSid)
      .verifications.create({
        to: phoneNumber,
        channel: 'sms'
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        status: verification.status,
        message: 'Verification code sent successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Twilio error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send verification code',
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
}