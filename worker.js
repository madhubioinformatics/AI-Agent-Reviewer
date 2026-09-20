// Cloudflare Worker — Anthropic proxy for AI Agent Reviewer
// Holds your API key as a secret so it is NEVER exposed in the public page.
// Deploy at dash.cloudflare.com -> Workers & Pages -> Create Worker -> paste this.
// Required secret:  ANTHROPIC_KEY  (your sk-ant-... key)
// Optional KV binding named RL (KV namespace) enables per-visitor + global daily caps.

const ALLOWED_ORIGINS = [
  "https://madhubioinformatics.github.io"   // add more origins here if you host elsewhere
];
const PER_IP_DAILY = 30;    // max reviews per visitor per day
const GLOBAL_DAILY = 800;   // max total reviews per day (protects your balance)

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin"
    };
    const json = (obj, status) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: { message: "Only POST is allowed." } }, 405);
    if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: { message: "This origin is not allowed." } }, 403);
    if (!env.ANTHROPIC_KEY) return json({ error: { message: "Server is missing the ANTHROPIC_KEY secret." } }, 500);

    // Rate limiting (active only if a KV namespace named RL is bound)
    if (env.RL) {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const ipKey = `ip:${ip}:${day}`;
      const allKey = `all:${day}`;
      const ipN = parseInt((await env.RL.get(ipKey)) || "0", 10);
      const allN = parseInt((await env.RL.get(allKey)) || "0", 10);
      if (ipN >= PER_IP_DAILY) return json({ error: { message: "Daily limit reached for your device — try again tomorrow." } }, 429);
      if (allN >= GLOBAL_DAILY) return json({ error: { message: "This demo has reached today's shared usage cap — please try later." } }, 429);
      await env.RL.put(ipKey, String(ipN + 1), { expirationTtl: 172800 });
      await env.RL.put(allKey, String(allN + 1), { expirationTtl: 172800 });
    }

    const body = await request.text();
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01"
      },
      body
    });
    const text = await upstream.text();
    return new Response(text, { status: upstream.status, headers: { ...cors, "Content-Type": "application/json" } });
  }
};
