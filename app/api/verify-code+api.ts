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
    const { phoneNumber, code } = await request.json();

    if (!phoneNumber || !code) {
      return new Response(
        JSON.stringify({ error: 'Phone number and verification code are required' }),
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

    // Verify the code using Twilio Verify
    const verificationCheck = await client.verify.v2
      .services(twilioServiceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: code
      });

    if (verificationCheck.status === 'approved') {
      // Generate a simple user token (in production, use JWT)
      const userToken = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return new Response(
        JSON.stringify({ 
          success: true,
          verified: true,
          user: {
            id: userToken,
            phoneNumber: phoneNumber,
            isAuthenticated: true
          },
          message: 'Phone number verified successfully'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false,
          verified: false,
          error: 'Invalid verification code'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

  } catch (error: any) {
    console.error('Twilio verification error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to verify code',
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