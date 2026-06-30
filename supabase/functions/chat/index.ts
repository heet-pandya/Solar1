import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json();
    const apiKey = Deno.env.get('GROQ_API_KEY');

    if (!apiKey) throw new Error("GROQ_API_KEY secret is missing in Supabase");

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a helpful customer service AI for 'Falcon Energy', a premium solar energy provider in Madhya Pradesh, India.
We serve Bhopal, Indore, Gwalior and all over Madhya Pradesh.
Answer questions about solar energy, PM Kusum Yojana subsidies (up to 60% off), 25-year panel warranties, residential/commercial/industrial installations, and pricing.
Keep answers brief (2-4 sentences), friendly, and persuasive. Encourage users to use the savings calculator or book a free site survey.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Groq error: ${data?.error?.message}`);
    }

    const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
