const PROJECTS_DATA = {
  sehat: {
    id: "sehat",
    index: 1,
    name: "SEHAT",
    subtitle: "SMART EDGE HEALTHCARE AND TELEMEDICINE DEVICE",
    description: "An integrated care-access solution to improve healthcare access, continuity and quality in rural and underserved communities.",
    accentColor: "#A67C52",
    themeClass: "theme-sehat",
    heroImg: "assets/ui/sehat_hero.webp",
    cardImg: "assets/ui/sehat_card.webp",
    demoImg: "assets/ui/sehat_demo.webp",
    demoTitle: "Technology that reaches every community.",
    demoSubtitle: "Combining hardware, on-device AI and a user-friendly Android app to make healthcare more accessible, accountable and efficient.",
    demoDuration: "02:15",
    pdfFile: "assets/pdfs/sehat.pdf",
    pills: [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-4l-1 2-2-4-1 2h-3"/></svg>`,
        title: "Digital Triage",
        desc: "Symptom-based risk assessment"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        title: "Appointment Management",
        desc: "Automatic facility and doctor allocation"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
        title: "Patient Records",
        desc: "Longitudinal and ABHA-linked"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>`,
        title: "Multilingual & Offline Support",
        desc: "Designed for rural deployment"
      }
    ],
    components: [
      {
        title: "Hardware Device",
        desc: "Raspberry Pi with vital sensors, mic & speaker for assisted teleconsultation.",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A67C52" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`
      },
      {
        title: "Android App",
        desc: "Built with Kotlin & Jetpack Compose for field healthcare workers.",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A67C52" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`
      },
      {
        title: "Web Portal",
        desc: "Facility dashboards, referral tracking and diagnostics coordination.",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A67C52" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
      }
    ],
    techStack: [
      "Python", "Kotlin", "Raspberry Pi", "Android (Jetpack Compose)", "React", "TypeScript", "Tailwind CSS", "IndicConformer STT", "Kokoro TTS"
    ],
    members: ["saharsh", "dev", "bhvaya"]
  },

  mistminds: {
    id: "mistminds",
    index: 2,
    name: "MistMinds",
    subtitle: "EDGE AQI DEVICE",
    description: "A low-cost, real-time air quality monitoring system that collects environmental data and provides insights through a web dashboard to promote cleaner and healthier cities.",
    accentColor: "#1976D2",
    themeClass: "theme-mistminds",
    heroImg: "assets/ui/mistminds_hero.webp",
    cardImg: "assets/ui/mistminds_card.webp",
    demoImg: "assets/ui/mistminds_demo.webp",
    demoTitle: "Data for cleaner tomorrows.",
    demoSubtitle: "Turning real-time air quality data into actionable insights for healthier and more sustainable communities.",
    demoDuration: "02:10",
    pdfFile: "assets/pdfs/mistminds.pdf",
    pills: [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
        title: "Real-time Monitoring",
        desc: "Live PM2.5, temperature and humidity data"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
        title: "Web Dashboard",
        desc: "Visualize data with clean and intuitive UI"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
        title: "Alerts & Insights",
        desc: "Track air quality trends and get notifications"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        title: "Community Impact",
        desc: "Supports awareness and data-driven solutions for cleaner cities"
      }
    ],
    components: [
      {
        title: "Sensors",
        desc: "PM2.5 sensor (GP2Y1010), DHT22 (Temperature & Humidity)",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976D2" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>`
      },
      {
        title: "Microcontroller",
        desc: "ESP32 (Wi-Fi enabled) for data collection and transmission",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976D2" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>`
      },
      {
        title: "Cloud & Dashboard",
        desc: "Firebase for real-time database and Vite (React) for the web portal",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976D2" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`
      }
    ],
    techStack: [
      "ESP32", "C++", "Firebase", "React", "Vite", "Tailwind CSS", "TypeScript", "Chart.js", "DHT22", "GP2Y1010"
    ],
    members: ["dev", "hetal", "aditi"]
  },

  agricar: {
    id: "agricar",
    index: 3,
    name: "AgriCar",
    subtitle: "EDGE AI Agriculture tech",
    description: "An autonomous RC car that uses computer vision and AI to detect weeds and precisely spray pesticides, helping farmers improve crop yield and reduce chemical usage.",
    accentColor: "#4CAF50",
    themeClass: "theme-agricar",
    heroImg: "assets/ui/agricar_hero.webp",
    cardImg: "assets/ui/agricar_card.webp",
    demoImg: "assets/ui/agricar_demo.webp",
    demoTitle: "Smarter farming with computer vision.",
    demoSubtitle: "Detecting weeds, reducing chemical usage and improving crop yield with AI and automation.",
    demoDuration: "01:45",
    pdfFile: "assets/pdfs/agricar.pdf",
    pills: [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 4 13C4 6 11 3 11 3s7 3 7 10a7 7 0 0 1-7 7z"/><path d="M11 13a3 3 0 0 0 3-3"/></svg>`,
        title: "Weed Detection",
        desc: "Computer vision to detect and classify weeds in real-time"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,
        title: "Precise Spraying",
        desc: "Targeted pesticide spraying to reduce chemical usage"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
        title: "Live Monitoring",
        desc: "ESP32-CAM for real-time field view and control"
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
        title: "Smart Farming",
        desc: "Data-driven approach for higher yield and sustainable agriculture"
      }
    ],
    components: [
      {
        title: "ESP32-CAM",
        desc: "Live video streaming and field monitoring.",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`
      },
      {
        title: "RC Car Platform",
        desc: "Mobile platform with sprayer mechanism.",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
      },
      {
        title: "Computer Vision",
        desc: "Detects weeds using OpenCV and AI models.",
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
      }
    ],
    techStack: [
      "Python", "OpenCV", "ESP32", "ESP32-CAM", "C++", "YOLO", "Docker", "React", "Tailwind CSS", "Vite", "Firebase"
    ],
    members: ["saharsh", "aditi", "bhvaya"]
  }
};

const TEAM_MEMBERS = {
  saharsh: {
    id: "saharsh",
    name: "SAHARSH PATHAK",
    dept: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    bio: "Building AI and hardware solutions for real-world problems. Interested in open-source, edge AI and human-centered technology.",
    photo: "assets/ui/SAHARSH.jpeg",
    tintBg: "#F5EBE1",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    pdfFile: "assets/pdfs/saharsh-profile.pdf",
    email: "saharsh@jiit.ac.in"
  },
  dev: {
    id: "dev",
    name: "DEV GUPTA",
    dept: "MECHANICAL ENGINEERING",
    bio: "Focused on robotics, mechanical design and building robust systems for real-world applications.",
    photo: "assets/ui/Dev.jpeg",
    tintBg: "#E3F0F9",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    pdfFile: "assets/pdfs/dev-profile.pdf",
    email: "dev@jiit.ac.in"
  },
  bhvaya: {
    id: "bhvaya",
    name: "BHVAYA GROVER",
    dept: "COMPUTER SCIENCE AND ENGINEERING",
    bio: "Passionate about software development, AI/ML and creating intuitive user experiences for meaningful impact.",
    photo: "assets/ui/bhavaya_orbit_clean.webp",
    tintBg: "#FBE6E4",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    pdfFile: "assets/pdfs/bhvaya-profile.pdf",
    email: "bhvaya@jiit.ac.in"
  },
  hetal: {
    id: "hetal",
    name: "HETAL DAYANAI",
    dept: "COMPUTER SCIENCE AND ENGINEERING",
    bio: "Interested in AI, full-stack development and building scalable solutions for real-world challenges.",
    photo: "assets/ui/hetal_orbit_clean.webp",
    tintBg: "#E2F3E7",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    pdfFile: "assets/pdfs/hetal-profile.pdf",
    email: "hetal@jiit.ac.in"
  },
  aditi: {
    id: "aditi",
    name: "ADITI TEJAS",
    dept: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    bio: "Exploring embedded systems, IoT and their applications in healthcare, environment and agriculture.",
    photo: "assets/ui/aditi_orbit_clean.webp",
    tintBg: "#EBE6F7",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    pdfFile: "assets/pdfs/aditi-profile.pdf",
    email: "aditi@jiit.ac.in"
  }
};
