// Vercel Serverless Function: POST /api/connect
// Receives lead submission and appends to Google Sheet

export default async function handler(req, res) {
  // Set CORS headers for local/cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
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
    } = data || {};

    if (!name || !email || !designation) {
      return res.status(400).json({ error: 'Missing required fields: name, email, designation' });
    }

    // 9 Exact Columns matching PRD.md & fix.md:
    // 1. Timestamp | 2. Name | 3. Email | 4. Designation | 5. Organization
    // 6. Connected With | 7. Interest / Project | 8. Consent | 9. Event
    const row = [
      timestamp || new Date().toISOString(),
      name,
      email,
      designation,
      org || 'N/A',
      connectedWith || 'General Networking',
      projectInterest || 'General Networking',
      consent || 'Yes',
      event || 'IMC 2026'
    ];

    // Method 1: Google Apps Script Webhook (Recommended & Easiest for Vercel/Netlify)
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxuEp0uT41P4EHHzZJ1fmxCo_Zm7EIZ2July-F_oVAdQUbopyO6r4bhxHvN-ZP4zQaG/exec";
    if (webhookUrl) {
      try {
        const scriptRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            row,
            timestamp: row[0],
            name,
            email,
            designation,
            org: row[4],
            connectedWith: row[5],
            projectInterest: row[6],
            consent: row[7],
            event: row[8]
          })
        });
        console.log('Webhook dispatched to Google Sheet. Status:', scriptRes.status);
      } catch (webhookErr) {
        console.error('Failed to post to Google Sheet webhook:', webhookErr);
      }
    }
    // Method 2: Google Service Account Credentials
    else if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      try {
        await appendWithServiceAccount(process.env, row);
      } catch (saErr) {
        console.error('Failed to append with service account:', saErr);
      }
    } else {
      console.log('Recorded lead (Set GOOGLE_SHEET_WEBHOOK_URL in Vercel to save to live Google Sheet):', row);
    }

    return res.status(200).json({
      success: true,
      message: 'Connection saved',
      lead: { name, email, designation }
    });
  } catch (err) {
    console.error('Error handling connect lead:', err);
    return res.status(500).json({ error: 'Internal server error while saving lead' });
  }
}

// Google OAuth2 service account JWT signer using standard Web Crypto
async function appendWithServiceAccount(env, row) {
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

  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const message = `${b64(header)}.${b64(claim)}`;

  // Parse RSA private key PEM using Node.js crypto
  const crypto = await import('node:crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(message);
  sign.end();

  const formattedKey = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  const signature = sign.sign(formattedKey, 'base64url');
  const jwt = `${message}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  const sheetId = env.GOOGLE_SHEET_ID;

  const appendRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:I:append?valueInputOption=USER_ENTERED`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values: [row] })
  });

  if (!appendRes.ok) {
    const errText = await appendRes.text();
    throw new Error(`Google Sheets append failed: ${errText}`);
  }
}
