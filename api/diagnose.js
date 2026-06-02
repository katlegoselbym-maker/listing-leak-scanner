export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { listing } = body;

  if (!listing || listing.trim().length < 60) {
    return new Response(JSON.stringify({ error: "Listing too short" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const prompt = `You are a forensic listing copy analyst. Find the single highest-damage word or phrase in this listing.

Listing:
"""
${listing}
"""

Respond ONLY in this exact JSON (no markdown, no preamble, no extra text):
{"phrase":"exact quoted phrase from the listing","damageType":"2-4 word clinical name","diagnosis":"One paragraph 3-4 sentences. Name the specific psychological damage this phrase creates in a buyer's mind. Clinical, direct, no softening, no filler. No dashes. No AI buzzwords."}

Rules:
- phrase must be quoted exactly as it appears in the listing
- damageType must be 2-4 words, clinical: examples are Desperation Signal, Passive Authority Collapse, Urgency Drain, Trust Deficit Pattern
- diagnosis is a doctor delivering bad news: specific, direct, zero softening
- Return pure JSON only, nothing else`;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const err = await anthropicRes.text();
      console.error("Anthropic error:", err);
      return new Response(JSON.stringify({ error: "Upstream API error" }), {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const data = await anthropicRes.json();
    const raw = data.content[0].text.trim().replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Handler error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
  
