// Cloudflare Pages Function: POST /api/connect
// Server-side lead capture & Google Sheets append using Web Crypto API
// Conforms to fix.md Section 12 (9 Google Sheet Columns)

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const {
      timestamp,
      name,
      email,
      designation,
      org,
      connectedWith,
      projectInterest,
      consent,
      event
    } = data;

    if (!name || !email || !designation) {
      return new Response(JSON.stringify({ error: "Missing required fields: name, email, designation" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Exact 9 columns as specified in fix.md Section 12 & PRD.md:
    // 1. Timestamp
    // 2. Name
    // 3. Email
    // 4. Designation
    // 5. Organization
    // 6. Connected With
    // 7. Interest / Project
    // 8. Consent
    // 9. Event
    const row = [
      timestamp || new Date().toISOString(),
      name,
      email,
      designation,
      org || "N/A",
      connectedWith || "General Networking",
      projectInterest || "General Networking",
      consent || "Yes",
      event || "IMC 2026"
    ];

    // Check if Google Sheet credentials exist in Cloudflare Worker environment
    if (env && env.GOOGLE_SERVICE_ACCOUNT_EMAIL && env.GOOGLE_PRIVATE_KEY && env.GOOGLE_SHEET_ID) {
      await appendToGoogleSheet(env, row);
    } else {
      console.log("Mock lead recorded (Google Sheets env vars not configured):", row);
    }

    return new Response(JSON.stringify({ success: true, message: "Connection saved" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error processing lead:", err);
    return new Response(JSON.stringify({ error: "Failed to save connection" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// Google OAuth2 service account JWT signer using standard Web Crypto (Worker native)
async function getGoogleAccessToken(env) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp,
    iat
  };

  const strHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const strClaim = btoa(JSON.stringify(claim)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const message = `${strHeader}.${strClaim}`;

  // Parse RSA private key PEM
  const pem = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = pem.substring(pem.indexOf(pemHeader) + pemHeader.length, pem.indexOf(pemFooter)).replace(/\s+/g, '');
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(message)
  );

  const strSig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const jwt = `${message}.${strSig}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function appendToGoogleSheet(env, row) {
  const token = await getGoogleAccessToken(env);
  const sheetId = env.GOOGLE_SHEET_ID;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:I:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      values: [row]
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Sheets API append failed: ${errText}`);
  }
}
