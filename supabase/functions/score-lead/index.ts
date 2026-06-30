import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Supabase Edge Function — AI Lead Scoring using Groq (Llama 3.3)
// This runs server-side when a new lead is inserted into the 'leads' table.
// Add GROQ_API_KEY in: Supabase Dashboard → Edge Functions → Secrets

serve(async (req) => {
  try {
    const { record } = await req.json();
    console.log(`Analyzing new lead from ${record.name}...`);

    const apiKey = Deno.env.get('GROQ_API_KEY');
    if (!apiKey) throw new Error("GROQ_API_KEY is not set in Supabase Edge Function Secrets");

    const prompt = `You are an expert Solar Sales Analyst for Falcon Energy, a solar company in Madhya Pradesh, India.

Analyze this new lead and assign a score. Consider: commercial/industrial leads are highest priority, residential in big cities (Bhopal, Indore, Gwalior) are high priority, rural or unknown are lower.

Lead Details:
- Name: ${record.name || 'Unknown'}
- PIN Code: ${record.pin_code || 'Unknown'}
- Installation Type: ${record.installation_type || 'Unknown'}
- Phone: ${record.phone || 'Unknown'}

Return ONLY a valid JSON object with no extra text: {"score": "Hot|Warm|Cold", "ai_summary": "one sentence follow-up advice"}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 150,
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Groq error: ${data?.error?.message}`);
    }

    let score = "Warm";
    let ai_summary = "General inquiry. Follow up within 48 hours.";

    try {
      const aiResult = JSON.parse(data.choices[0].message.content);
      score = aiResult.score || score;
      ai_summary = aiResult.ai_summary || ai_summary;
    } catch (parseErr) {
      console.error("Failed to parse AI result:", parseErr);
    }

    // To actually save back to Supabase, uncomment below and add supabase client:
    // await supabase.from('leads').update({ lead_score: score, ai_insights: ai_summary }).eq('id', record.id);

    console.log(`✅ Lead "${record.name}" scored as ${score}: ${ai_summary}`);

    return new Response(
      JSON.stringify({ message: 'Lead scored successfully', score, ai_summary }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error("score-lead error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
