// JIIT IMC 2026 - Lead capture and networking flow handler
// Follows fix.md Sections 8 through 14

let googleIdToken = null;
let googleUserPayload = null;

// Parse URL query parameters
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
const viewChoice = document.getElementById('view-choice');
const viewGoogleForm = document.getElementById('view-google-form');
const viewManualForm = document.getElementById('view-manual-form');
const viewSuccess = document.getElementById('view-success');

function showStep(stepName) {
  if (viewChoice) viewChoice.style.display = stepName === 'choice' ? 'block' : 'none';
  if (viewGoogleForm) viewGoogleForm.style.display = stepName === 'google' ? 'block' : 'none';
  if (viewManualForm) viewManualForm.style.display = stepName === 'manual' ? 'block' : 'none';
  if (viewSuccess) viewSuccess.style.display = stepName === 'success' ? 'block' : 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation button handlers
const btnChoiceManual = document.getElementById('btn-choice-manual');
if (btnChoiceManual) {
  btnChoiceManual.addEventListener('click', () => {
    showStep('manual');
  });
}

const btnBackFromManual = document.getElementById('btn-back-from-manual');
if (btnBackFromManual) {
  btnBackFromManual.addEventListener('click', () => {
    showStep('choice');
  });
}

const btnBackFromGoogle = document.getElementById('btn-back-from-google');
if (btnBackFromGoogle) {
  btnBackFromGoogle.addEventListener('click', () => {
    showStep('choice');
  });
}

// Decode Google JWT without external dependencies
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Global callback for Google Identity Services
window.handleCredentialResponse = function(response) {
  googleIdToken = response.credential;
  googleUserPayload = parseJwt(googleIdToken);

  if (googleUserPayload) {
    const nameEl = document.getElementById('google-profile-name');
    const emailEl = document.getElementById('google-profile-email');
    if (nameEl) nameEl.textContent = googleUserPayload.name || "Google User";
    if (emailEl) emailEl.textContent = googleUserPayload.email || "";

    showStep('google');
  }
};

// Google Button Click Trigger
const btnChoiceGoogle = document.getElementById('btn-choice-google');
if (btnChoiceGoogle) {
  btnChoiceGoogle.addEventListener('click', () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If One Tap is suppressed or running on unauthenticated localhost origin,
          // render quick Google credential simulation prompt for testing
          showGoogleFallbackPrompt();
        }
      });
    } else {
      showGoogleFallbackPrompt();
    }
  });
}

function showGoogleFallbackPrompt() {
  const simEmail = prompt("Enter your Gmail address to continue with Google:", "visitor@gmail.com");
  if (simEmail && simEmail.includes('@')) {
    const simName = prompt("Enter your Name:", "Convention Attendee") || "Convention Attendee";
    googleUserPayload = { name: simName, email: simEmail };
    const nameEl = document.getElementById('google-profile-name');
    const emailEl = document.getElementById('google-profile-email');
    if (nameEl) nameEl.textContent = simName;
    if (emailEl) emailEl.textContent = simEmail;
    showStep('google');
  }
}

// 1. Google Flow Submission
const googleForm = document.getElementById('google-finish-form');
if (googleForm) {
  googleForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const designation = document.getElementById('google-designation').value.trim();
    const org = document.getElementById('google-org').value.trim();
    const submitBtn = document.getElementById('btn-submit-google-flow');

    const leadData = {
      timestamp: new Date().toISOString(),
      name: googleUserPayload ? googleUserPayload.name : "Google Visitor",
      email: googleUserPayload ? googleUserPayload.email : "",
      designation: designation,
      org: org || "N/A",
      connectedWith: connectedWithName,
      projectInterest: interestProject,
      consent: "Yes",
      event: "IMC 2026",
      idToken: googleIdToken
    };

    await submitLead(leadData, submitBtn);
  });
}

// 2. Manual Flow Submission
const manualForm = document.getElementById('manual-connect-form');
if (manualForm) {
  manualForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('manual-name').value.trim();
    const email = document.getElementById('manual-email').value.trim();
    const designation = document.getElementById('manual-designation').value.trim();
    const org = document.getElementById('manual-org').value.trim();
    const submitBtn = document.getElementById('btn-submit-manual-flow');

    const leadData = {
      timestamp: new Date().toISOString(),
      name: name,
      email: email,
      designation: designation,
      org: org || "N/A",
      connectedWith: connectedWithName,
      projectInterest: interestProject,
      consent: "Yes",
      event: "IMC 2026",
      idToken: null
    };

    await submitLead(leadData, submitBtn);
  });
}

async function submitLead(leadData, submitBtn) {
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Saving...</span>`;
  }

  try {
    const res = await fetch('/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });

    if (res.ok) {
      showStep('success');
    } else {
      if (isLocalOrStatic()) {
        console.log("Local/Static fallback - recorded lead:", leadData);
        saveLocalLead(leadData);
        showStep('success');
      } else {
        throw new Error("Lead save failed");
      }
    }
  } catch (err) {
    if (isLocalOrStatic()) {
      console.log("Local/Static fallback - recorded lead:", leadData);
      saveLocalLead(leadData);
      showStep('success');
    } else {
      alert("Could not save connection at this moment. Please check your connection and try again.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>CONNECT</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      }
    }
  }
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
