// JIIT IMC 2026 - Streamlined Contact & Lead Capture Handler
// Handles direct networking submission for Name, Email, Designation, Organization

// Live Google Sheet Apps Script Webhook URL
// Enables direct-to-sheet submissions on GitHub Pages, Netlify, or any static host!
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzyh2gb8HYZndbjY93W8k20Sh3qW1-tCDztbv-X4IsfCC-GsS5S5tXk0rCcuJd26AFl/exec";

// Parse URL query parameters for context retention
const params = new URLSearchParams(window.location.search);
const memberId = params.get('member');
const fromProject = params.get('project');

// Determine connected with context
let connectedWithName = "General Networking";
if (memberId && typeof TEAM_MEMBERS !== 'undefined' && TEAM_MEMBERS[memberId]) {
  connectedWithName = TEAM_MEMBERS[memberId].name;
}

// Determine project interest context
let interestProject = "General Networking";
if (fromProject && typeof PROJECTS_DATA !== 'undefined' && PROJECTS_DATA[fromProject]) {
  interestProject = PROJECTS_DATA[fromProject].name;
} else if (fromProject) {
  interestProject = fromProject.toUpperCase();
}

// Configure Back Navigation and Context Badge
const backBtn = document.getElementById('connect-back-btn');
const backLabel = document.getElementById('connect-back-label');
const contextPill = document.getElementById('connect-context-pill');
const contextText = document.getElementById('connect-context-text');
const successBackBtn = document.getElementById('btn-success-back-profile');

if (memberId) {
  const profileUrl = `profile.html?id=${memberId}${fromProject ? `&fromProject=${fromProject}` : ''}`;
  if (backBtn) backBtn.href = profileUrl;
  if (backLabel) backLabel.textContent = "Profile";
  if (successBackBtn) {
    successBackBtn.href = profileUrl;
    successBackBtn.textContent = "Back to Profile";
  }
  if (contextPill && contextText) {
    contextPill.style.display = "inline-flex";
    contextText.textContent = `Connecting with ${connectedWithName}`;
  }
} else if (fromProject) {
  const projUrl = `project-detail.html?id=${fromProject}`;
  if (backBtn) backBtn.href = projUrl;
  if (backLabel) backLabel.textContent = "Project";
  if (successBackBtn) {
    successBackBtn.href = projUrl;
    successBackBtn.textContent = "Back to Project";
  }
  if (contextPill && contextText) {
    contextPill.style.display = "inline-flex";
    contextText.textContent = `Regarding Project ${interestProject}`;
  }
} else {
  if (backBtn) backBtn.href = "team.html";
  if (backLabel) backLabel.textContent = "Our Team";
  if (successBackBtn) {
    successBackBtn.href = "team.html";
    successBackBtn.textContent = "Back to Team";
  }
}

// Views
const viewForm = document.getElementById('view-form');
const viewSuccess = document.getElementById('view-success');

function showStep(stepName) {
  if (viewForm) viewForm.style.display = stepName === 'form' ? 'block' : 'none';
  if (viewSuccess) viewSuccess.style.display = stepName === 'success' ? 'block' : 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Direct Form Submission Handler
const connectForm = document.getElementById('connect-form');
if (connectForm) {
  connectForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('input-name').value.trim();
    const email = document.getElementById('input-email').value.trim();
    const designation = document.getElementById('input-designation').value.trim();
    const org = document.getElementById('input-org').value.trim();
    const submitBtn = document.getElementById('btn-submit-connect');

    if (!name || !email || !designation) {
      alert("Please fill in all required fields (Name, Email, and Designation).");
      return;
    }

    const leadData = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name: name,
      email: email,
      designation: designation,
      org: org || "N/A"
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Saving...</span>`;
    }

    try {
      let sentSuccessfully = false;

      // 1. Direct submit to Google Sheet Webhook if configured (Works on GitHub Pages, Netlify, etc. without any server)
      if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.startsWith('https://script.google.com/')) {
        try {
          const payload = {
            ...leadData,
            row: [leadData.timestamp, leadData.name, leadData.email, leadData.designation, leadData.org]
          };
          await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          sentSuccessfully = true;
          console.log("Lead submitted directly to Google Sheet Webhook:", leadData);
        } catch (webhookErr) {
          console.warn("Direct Google Sheet post error:", webhookErr);
        }
      }

      // 2. If no webhook URL or if running with serverless function, try /api/connect
      if (!sentSuccessfully) {
        try {
          const res = await fetch('/api/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
          });
          if (res.ok) {
            sentSuccessfully = true;
          }
        } catch (apiErr) {
          // Non-fatal if on pure static host without /api
        }
      }

      // Always save to browser localStorage as an offline safety net
      saveLocalLead(leadData);

      // Transition to success screen
      showStep('success');
    } catch (err) {
      console.warn("Saving to offline backup due to network state:", err);
      saveLocalLead(leadData);
      showStep('success');
    }
  });
}

function isLocalOrStatic() {
  return window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1' ||
         window.location.protocol === 'file:' ||
         window.location.hostname.endsWith('.pages.dev');
}

function saveLocalLead(lead) {
  try {
    const saved = JSON.parse(localStorage.getItem('jiit_imc_leads') || '[]');
    saved.push(lead);
    localStorage.setItem('jiit_imc_leads', JSON.stringify(saved));
  } catch (e) {
    // Ignore storage errors
  }
}
