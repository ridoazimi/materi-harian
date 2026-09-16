(() => {
  // Remove any previous instance cleanly
  const existing = document.querySelector(".framework-engine");
  if (existing) existing.remove();
  const oldBurn = document.querySelector(".burn-lab");
  if (oldBurn) oldBurn.remove();

  // Create framework container
  const host = document.createElement("section");
  host.className = "framework-engine";
  host.setAttribute("aria-label", "Servo Reset Operational Framework");

  const notes = document.querySelector(".notes");
  if (notes) {
    notes.before(host);
  } else {
    document.querySelector(".lesson").append(host);
  }

  // Inject Stylesheet
  const styleId = "framework-engine-styles";
  let styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.append(styleEl);
  }

  styleEl.textContent = `
    .framework-engine {
      margin: 32px 0 28px;
      background: #0d1117;
      border: 1px solid #21262d;
      border-radius: 18px;
      padding: 26px;
      color: #e6edf3;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "DM Sans", Roboto, sans-serif;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
      position: relative;
      overflow: hidden;
    }

    /* Ambient Energy Radial Glow */
    .framework-engine::before {
      content: "";
      position: absolute;
      top: -100px;
      right: -80px;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, rgba(13, 17, 23, 0) 70%);
      pointer-events: none;
      z-index: 0;
    }

    .fe-content {
      position: relative;
      z-index: 1;
    }

    /* Top Executive Header */
    .fe-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 18px;
      padding-bottom: 20px;
      border-bottom: 1px solid #21262d;
      flex-wrap: wrap;
    }
    .fe-header-left {
      flex: 1;
      min-width: 260px;
    }
    .fe-badge-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .fe-live-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ea580c;
      box-shadow: 0 0 10px #ea580c;
      animation: fePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .fe-badge-text {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #ea580c;
    }
    .fe-version-tag {
      font-size: 10px;
      background: #161b22;
      border: 1px solid #30363d;
      color: #8b949e;
      padding: 2px 7px;
      border-radius: 20px;
      font-family: monospace;
    }
    .fe-title {
      font-size: 22px;
      font-weight: 800;
      color: #f0f6fc;
      margin: 0 0 6px;
      letter-spacing: -0.5px;
    }
    .fe-subtitle {
      font-size: 13px;
      color: #8b949e;
      margin: 0;
      line-height: 1.55;
      max-width: 560px;
    }

    /* Simulation & Quick Action Button */
    .fe-controls-top {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .fe-btn-sim {
      background: #161b22;
      border: 1px solid #30363d;
      color: #c9d1d9;
      padding: 9px 15px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .fe-btn-sim:hover {
      background: #21262d;
      border-color: #ea580c;
      color: #f0f6fc;
    }
    .fe-btn-sim.active {
      background: rgba(234, 88, 12, 0.15);
      border-color: #ea580c;
      color: #fb923c;
    }

    /* Pipeline Step Nodes */
    .fe-pipeline {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 22px 0 14px;
    }
    @media (max-width: 768px) {
      .fe-pipeline {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 460px) {
      .fe-pipeline {
        grid-template-columns: 1fr;
      }
    }

    .fe-node {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 14px;
      text-align: left;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }
    .fe-node:hover {
      border-color: #484f58;
      transform: translateY(-2px);
    }
    .fe-node.active {
      background: #1c2128;
      border-color: #ea580c;
      box-shadow: 0 0 20px rgba(234, 88, 12, 0.22);
    }
    .fe-node.done {
      border-color: #238636;
    }
    .fe-node-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .fe-node-num {
      font-size: 10px;
      font-weight: 800;
      color: #8b949e;
      letter-spacing: 0.5px;
      font-family: monospace;
    }
    .fe-node.active .fe-node-num {
      color: #ea580c;
    }
    .fe-node.done .fe-node-num {
      color: #3fb950;
    }
    .fe-node-state {
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: #0d1117;
      color: #8b949e;
      text-transform: uppercase;
      font-family: monospace;
    }
    .fe-node.active .fe-node-state {
      background: rgba(234, 88, 12, 0.2);
      color: #fb923c;
    }
    .fe-node.done .fe-node-state {
      background: rgba(46, 160, 67, 0.2);
      color: #3fb950;
    }
    .fe-node-name {
      font-size: 13px;
      font-weight: 700;
      color: #f0f6fc;
      margin: 0 0 3px;
    }
    .fe-node-sub {
      font-size: 11px;
      color: #8b949e;
      margin: 0;
      line-height: 1.4;
    }

    /* Pipeline Connector Track */
    .fe-connector-bar {
      height: 4px;
      background: #21262d;
      border-radius: 2px;
      position: relative;
      margin-bottom: 22px;
      overflow: hidden;
    }
    .fe-connector-progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: linear-gradient(90deg, #ea580c 0%, #f97316 60%, #238636 100%);
      transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 0 10px rgba(234, 88, 12, 0.5);
    }

    /* Dynamic Stage Card */
    .fe-stage-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 14px;
      padding: 22px;
      position: relative;
    }

    /* Visual Stage Animation Arena */
    .fe-visual-arena {
      height: 180px;
      border-radius: 10px;
      background: #090d12;
      border: 1px solid #21262d;
      margin-bottom: 22px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.5);
    }
    .fe-visual-svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Step Title & Details */
    .fe-step-meta {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .fe-step-title {
      font-size: 16px;
      font-weight: 700;
      color: #f0f6fc;
      margin: 0;
    }
    .fe-step-phase-tag {
      font-size: 11px;
      font-weight: 800;
      color: #ea580c;
      font-family: monospace;
      letter-spacing: 0.5px;
    }
    .fe-step-prompt {
      font-size: 13px;
      color: #8b949e;
      margin: 0 0 16px;
      line-height: 1.5;
    }

    /* Ready-to-Tap Option Pills */
    .fe-pills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }
    @media (max-width: 640px) {
      .fe-pills-grid {
        grid-template-columns: 1fr;
      }
    }

    .fe-pill {
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 10px;
      padding: 14px;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .fe-pill:hover {
      border-color: #484f58;
      background: #161b22;
      transform: translateY(-1px);
    }
    .fe-pill.selected {
      border-color: #ea580c;
      background: rgba(234, 88, 12, 0.08);
      box-shadow: 0 0 14px rgba(234, 88, 12, 0.15);
    }
    .fe-pill-title {
      font-size: 13px;
      font-weight: 700;
      color: #f0f6fc;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .fe-pill.selected .fe-pill-title {
      color: #fb923c;
    }
    .fe-pill-desc {
      font-size: 11.5px;
      color: #8b949e;
      line-height: 1.45;
    }

    /* Focus Timer Display (Phase 4) */
    .fe-timer-box {
      background: #0d1117;
      border: 1px solid #238636;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
    }
    .fe-timer-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .fe-timer-label {
      font-size: 10.5px;
      font-weight: 700;
      color: #3fb950;
      text-transform: uppercase;
      font-family: monospace;
      letter-spacing: 0.5px;
    }
    .fe-timer-digits {
      font-size: 24px;
      font-weight: 800;
      color: #f0f6fc;
      font-family: monospace;
      letter-spacing: 1px;
    }
    .fe-timer-btns {
      display: flex;
      gap: 8px;
    }
    .fe-btn-timer {
      background: #21262d;
      border: 1px solid #30363d;
      color: #c9d1d9;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .fe-btn-timer:hover {
      background: #30363d;
      color: #f0f6fc;
    }

    /* Bottom Action Bar */
    .fe-action-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      padding-top: 14px;
      border-top: 1px solid #21262d;
    }
    .fe-insight-callout {
      font-size: 12px;
      color: #8b949e;
      flex: 1;
      min-width: 240px;
      line-height: 1.5;
    }
    .fe-insight-callout strong {
      color: #ea580c;
    }
    .fe-btn-group {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    @media (max-width: 640px) {
      .fe-btn-group {
        width: 100%;
      }
      .fe-btn-primary, .fe-btn-secondary {
        flex: 1;
        text-align: center;
        justify-content: center;
      }
    }

    .fe-btn-primary {
      background: #ea580c;
      color: #ffffff;
      border: 1px solid #ea580c;
      border-radius: 8px;
      padding: 11px 20px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .fe-btn-primary:hover {
      background: #f97316;
      border-color: #f97316;
      transform: translateY(-1px);
    }
    .fe-btn-secondary {
      background: transparent;
      color: #8b949e;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 11px 16px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .fe-btn-secondary:hover {
      color: #f0f6fc;
      border-color: #484f58;
    }

    /* Keyframe Animations */
    @keyframes fePulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(0.85); }
    }
    @keyframes circuitFlow {
      from { stroke-dashoffset: 80; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes coreThermal {
      0% { transform: scale(0.96) rotate(-2deg); filter: drop-shadow(0 0 16px rgba(234, 88, 12, 0.7)); }
      50% { transform: scale(1.08) rotate(3deg); filter: drop-shadow(0 0 32px rgba(249, 115, 22, 0.95)); }
      100% { transform: scale(0.96) rotate(-2deg); filter: drop-shadow(0 0 16px rgba(234, 88, 12, 0.7)); }
    }
    @keyframes emberRise {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-70px) scale(0.3); opacity: 0; }
    }
    @keyframes scanSweep {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  // Framework Structural Data
  const phases = [
    {
      num: "01",
      badge: "DIAGNOSA",
      name: "Deteksi Glitch",
      sub: "Tangkap servo negatif yang menyabotase",
      title: "Tahap 1: Deteksi Pola Sabotase Sub-Sadar",
      phaseTag: "PHASE 01 / FAULT DETECTION",
      prompt: "Pilih pola sabotase yang paling sering menghambat langkahmu (tanpa perlu mengetik):",
      options: [
        { title: "Takut Salah / Perfeksionis", desc: "Menunggu kondisi 100% aman sebelum mulai eksekusi." },
        { title: "Inersia Menunda (Procrastination)", desc: "Tahu apa yang harus dikerjakan, tetapi lari ke urusan sepele." },
        { title: "Perbandingan Diri (Comparison Loop)", desc: "Fokus ke pencapaian orang lain, energi habis sebelum mulai." }
      ],
      insight: "Pola telah diidentifikasi. Servo mechanism siap memasuki tahap isolasi feedback.",
      btnLabel: "Isolasi Loop Ini ➔"
    },
    {
      num: "02",
      badge: "ISOLASI",
      name: "Putus Loop Emosi",
      sub: "Dekopling rantai emosional masa lalu",
      title: "Tahap 2: Dekopling & Isolasi Emosional",
      phaseTag: "PHASE 02 / LOOP DECOUPLING",
      prompt: "Servo lama bekerja otomatis jika terus diberi suplai reaksi emosional. Tentukan strategi dekonstruksi:",
      options: [
        { title: "Dekopling Identitas", desc: "Pisahkan nilai dirimu dari kegagalan masa lalu." },
        { title: "Hentikan Debat Internal", desc: "Stop merasionalisasi alasan di dalam kepala." },
        { title: "Labeli Sebagai Data Usang", desc: "Anggap beban tersebut sebagai kode kadaluwarsa tanpa daya." }
      ],
      insight: "Rantai reaksi diputus. Energi ke pola masa lalu dialihkan ke nol.",
      btnLabel: "Masuki Ruang Bakar (Reset) ➔"
    },
    {
      num: "03",
      badge: "THE BURN",
      name: "The Burn (Reset Nol)",
      sub: "Bakar opsi mundur (Burn the Boats)",
      title: "Tahap 3: The Burn - Zero-Point Reset",
      phaseTag: "PHASE 03 / ZERO-POINT IGNITION",
      prompt: "Simbol pelepasan total dari materi Bakar. Bakar opsi mundur agar fokus 100% terkonsentrasi ke depan:",
      options: [
        { title: "Hapus Pintu Belakang", desc: "Tidak ada Plan B yang menjadi alasan untuk kendur." },
        { title: "Pelepasan Simbolis", desc: "Lepaskan beban masa lalu sepenuhnya di titik ini." },
        { title: "Komitmen Garis Depan", desc: "Hanya ada satu arah gerak: maju dan selesaikan." }
      ],
      insight: "Ignisi selesai. Koordinat mental disetel ulang ke titik nol.",
      btnLabel: "Kunci Aksi Momentum ➔"
    },
    {
      num: "04",
      badge: "MOMENTUM",
      name: "Eksekusi Aksi",
      sub: "Arahkan servo baru ke target konkret",
      title: "Tahap 4: Kunci Servo Baru ke Aksi Nyata",
      phaseTag: "PHASE 04 / VECTOR LOCK & EXECUTION",
      prompt: "Pilih 1 rekomendasi aksi nyata yang langsung kamu jalankan sekarang:",
      options: [
        { title: "2-Minute Ignition", desc: "Buka 1 dokumen/tugas tertunda. Kerjakan draft pertama selama 2 menit tanpa revisi." },
        { title: "Zero Backdoor Focus", desc: "Singkirkan HP ke ruangan lain & tutup tab distraksi selama 25 menit." },
        { title: "Kunci 1 Metrik Hari Ini", desc: "Tuntaskan 1 tugas paling prioritas hari ini sebelum membuka hal lain." }
      ],
      insight: "Target terkunci. Servo mechanism diarahkan ke satu sasaran konkret.",
      btnLabel: "Konfirmasi Praktik Tuntas ✓"
    }
  ];

  // Load persistent state
  function getPracticeState() {
    if (!state.bakarPractice || typeof state.bakarPractice !== "object") {
      state.bakarPractice = {};
    }
    if (!state.bakarPractice[LESSON]) {
      state.bakarPractice[LESSON] = {
        step: 0,
        selectedOpts: [0, 0, 0, 0],
        completed: false,
        timerSeconds: 120,
        timerRunning: false
      };
    }
    return state.bakarPractice[LESSON];
  }

  const pState = getPracticeState();
  let currentStep = pState.step || 0;
  let selectedOpts = pState.selectedOpts || [0, 0, 0, 0];
  let isSimulating = false;
  let timerInterval = null;
  let timerSec = pState.timerSeconds || 120;
  let timerActive = false;

  // Render SVG Animation per Stage
  function renderVisualAnimation(idx) {
    if (idx === 0) {
      // Stage 1: Cybernetic Radar Diagnostics
      return `
        <svg class="fe-visual-svg" viewBox="0 0 500 180">
          <defs>
            <radialGradient id="scanGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ea580c" stop-opacity="0.35"/>
              <stop offset="60%" stop-color="#ea580c" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="#090d12" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- Grid Background lines -->
          <line x1="40" y1="90" x2="460" y2="90" stroke="#161b22" stroke-width="1.5" stroke-dasharray="4 4"/>
          <line x1="250" y1="20" x2="250" y2="160" stroke="#161b22" stroke-width="1.5" stroke-dasharray="4 4"/>

          <!-- Radar Concentric Circles -->
          <circle cx="250" cy="90" r="70" fill="url(#scanGrad)"/>
          <circle cx="250" cy="90" r="65" fill="none" stroke="#21262d" stroke-width="1.5"/>
          <circle cx="250" cy="90" r="45" fill="none" stroke="#ea580c" stroke-width="1.5" opacity="0.4"/>
          <circle cx="250" cy="90" r="25" fill="none" stroke="#30363d" stroke-width="1.5"/>

          <!-- Scanning Rotary Line -->
          <g style="transform-origin: 250px 90px; animation: scanSweep 3.5s linear infinite;">
            <line x1="250" y1="90" x2="310" y2="40" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round"/>
            <polygon points="250,90 310,40 315,65" fill="#ea580c" opacity="0.2"/>
          </g>

          <!-- Detected Glitch Blip -->
          <g transform="translate(290, 60)">
            <circle cx="0" cy="0" r="6" fill="#f97316">
              <animate attributeName="r" values="4;8;4" dur="1.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="0" r="14" fill="none" stroke="#ea580c" stroke-width="1">
              <animate attributeName="r" values="8;18" dur="1.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0" dur="1.2s" repeatCount="indefinite"/>
            </circle>
          </g>

          <!-- Status Indicator Label -->
          <rect x="140" y="145" width="220" height="22" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
          <text x="250" y="160" text-anchor="middle" fill="#8b949e" font-size="10.5" font-family="monospace" font-weight="700" letter-spacing="0.5">TARGET: SUB-CONSCIOUS GLITCH</text>
        </svg>
      `;
    } else if (idx === 1) {
      // Stage 2: Circuit Decoupling / Loop Severing
      return `
        <svg class="fe-visual-svg" viewBox="0 0 500 180">
          <defs>
            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#30363d"/>
              <stop offset="100%" stop-color="#ea580c"/>
            </linearGradient>
          </defs>

          <!-- Left Incoming Signal -->
          <line x1="80" y1="90" x2="200" y2="90" stroke="url(#streamGrad)" stroke-width="3" stroke-dasharray="8 6" style="animation: circuitFlow 0.8s linear infinite;"/>
          <circle cx="200" cy="90" r="10" fill="#161b22" stroke="#ea580c" stroke-width="2.5"/>

          <!-- Severing Laser / Scissors Graphic -->
          <g transform="translate(250, 90)">
            <circle cx="0" cy="0" r="22" fill="#21262d" stroke="#f85149" stroke-width="1.5"/>
            <line x1="-12" y1="-12" x2="12" y2="12" stroke="#f85149" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="12" y1="-12" x2="-12" y2="12" stroke="#f85149" stroke-width="3.5" stroke-linecap="round"/>
            <!-- Sparkles -->
            <circle cx="0" cy="0" r="3" fill="#ff7b72">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" repeatCount="indefinite"/>
            </circle>
          </g>

          <!-- Right Cut Line (Dormant) -->
          <circle cx="300" cy="90" r="10" fill="#161b22" stroke="#484f58" stroke-width="2"/>
          <line x1="300" y1="90" x2="420" y2="90" stroke="#21262d" stroke-width="3" stroke-dasharray="4 4"/>

          <!-- Label -->
          <rect x="150" y="32" width="200" height="22" rx="4" fill="#161b22" stroke="#f85149" stroke-width="1"/>
          <text x="250" y="47" text-anchor="middle" fill="#ff7b72" font-size="10.5" font-family="monospace" font-weight="700" letter-spacing="0.5">[ FEEDBACK LOOP SEVERED ]</text>
          <text x="250" y="160" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">EMOTIONAL FLOW TO PAST PATTERN: 0%</text>
        </svg>
      `;
    } else if (idx === 2) {
      // Stage 3: Thermal Burn Reactor Core (Zero-Point Reset)
      return `
        <svg class="fe-visual-svg" viewBox="0 0 500 180">
          <defs>
            <radialGradient id="plasmaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
              <stop offset="25%" stop-color="#fbbf24" stop-opacity="0.9"/>
              <stop offset="60%" stop-color="#ea580c" stop-opacity="0.75"/>
              <stop offset="100%" stop-color="#090d12" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- Reactor Containment Rings -->
          <circle cx="250" cy="90" r="68" fill="none" stroke="#21262d" stroke-width="2"/>
          <circle cx="250" cy="90" r="54" fill="url(#plasmaGrad)"/>

          <!-- Thermal Core Swirling Flame Engine -->
          <g style="transform-origin: 250px 90px; animation: coreThermal 1.5s ease-in-out infinite;">
            <path d="M250 50 C264 70 240 78 268 98 C280 112 262 125 250 125 C238 125 220 112 232 98 C260 78 236 70 250 50 Z" fill="#ffedd5"/>
          </g>

          <!-- Rising Embers & Ash Particles -->
          <circle cx="225" cy="80" r="2.5" fill="#fde047" style="animation: emberRise 1.1s ease-out infinite;"/>
          <circle cx="270" cy="90" r="3" fill="#fb923c" style="animation: emberRise 1.4s ease-out infinite 0.3s;"/>
          <circle cx="245" cy="70" r="2" fill="#fed7aa" style="animation: emberRise 0.9s ease-out infinite 0.6s;"/>
          <circle cx="285" cy="75" r="2.5" fill="#f97316" style="animation: emberRise 1.3s ease-out infinite 0.2s;"/>

          <!-- Status Bar -->
          <rect x="140" y="145" width="220" height="22" rx="4" fill="#161b22" stroke="#ea580c" stroke-width="1"/>
          <text x="250" y="160" text-anchor="middle" fill="#fb923c" font-size="10.5" font-family="monospace" font-weight="700" letter-spacing="0.5">IGNITION ACTIVE · BOATS BURNED</text>
        </svg>
      `;
    } else {
      // Stage 4: Forward Momentum Surge Vector
      return `
        <svg class="fe-visual-svg" viewBox="0 0 500 180">
          <defs>
            <linearGradient id="surgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#161b22"/>
              <stop offset="40%" stop-color="#238636"/>
              <stop offset="100%" stop-color="#3fb950"/>
            </linearGradient>
          </defs>

          <!-- Acceleration Speed Rails -->
          <line x1="60" y1="65" x2="400" y2="65" stroke="#21262d" stroke-width="1.5" stroke-dasharray="10 15"/>
          <line x1="60" y1="115" x2="400" y2="115" stroke="#21262d" stroke-width="1.5" stroke-dasharray="10 15"/>

          <!-- High-Energy Surge Vector -->
          <line x1="70" y1="90" x2="390" y2="90" stroke="url(#surgeGrad)" stroke-width="4" stroke-dasharray="12 6" style="animation: circuitFlow 0.5s linear infinite;"/>
          <polygon points="410,90 385,80 385,100" fill="#3fb950"/>

          <!-- Kinetic Orb -->
          <g transform="translate(250, 90)">
            <circle cx="0" cy="0" r="26" fill="#0d1117" stroke="#3fb950" stroke-width="2.5"/>
            <circle cx="0" cy="0" r="18" fill="rgba(46, 160, 67, 0.2)"/>
            <path d="M-6 0 L-1 5 L9 -5" fill="none" stroke="#3fb950" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </g>

          <rect x="140" y="24" width="220" height="22" rx="4" fill="#161b22" stroke="#238636" stroke-width="1"/>
          <text x="250" y="39" text-anchor="middle" fill="#3fb950" font-size="10.5" font-family="monospace" font-weight="700" letter-spacing="0.5">NEW VECTOR LOCKED · SERVO ACTIVE</text>
          <text x="250" y="160" text-anchor="middle" fill="#8b949e" font-size="10.5" font-family="monospace">100% FORWARD MOMENTUM</text>
        </svg>
      `;
    }
  }

  // Format seconds to mm:ss
  function formatTime(s) {
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? "0" : ""}${rem}`;
  }

  // Master Render Function
  function render() {
    const currentPhase = phases[currentStep];
    const progressPct = ((currentStep + 1) / phases.length) * 100;
    const isCompleted = pState.completed;

    host.innerHTML = `
      <div class="fe-content">
        <!-- Header -->
        <div class="fe-header">
          <div class="fe-header-left">
            <div class="fe-badge-row">
              <span class="fe-live-dot"></span>
              <span class="fe-badge-text">Interactive Framework · Materi 18. Bakar</span>
              <span class="fe-version-tag">SERVO-V2</span>
            </div>
            <h3 class="fe-title">The Servo Reset & Ignition Protocol</h3>
            <p class="fe-subtitle">
              Sistem operasional dekopling mental Mardigu Wowiek: diagnosa glitch, putus loop emosi, reset opsi mundur ke titik nol, dan eksekusi aksi nyata tanpa mengetik.
            </p>
          </div>
          <div class="fe-controls-top">
            <button class="fe-btn-sim ${isSimulating ? "active" : ""}" id="feSimBtn">
              <span>${isSimulating ? "⏸ Jeda Siklus" : "▶ Simulasi Alur"}</span>
            </button>
          </div>
        </div>

        <!-- 4-Stage Architectural Pipeline -->
        <div class="fe-pipeline" role="tablist">
          ${phases.map((ph, i) => `
            <div class="fe-node ${currentStep === i ? "active" : ""} ${i < currentStep || isCompleted ? "done" : ""}" data-step="${i}" role="tab" aria-selected="${currentStep === i}">
              <div class="fe-node-top">
                <span class="fe-node-num">${ph.num} / ${ph.badge}</span>
                <span class="fe-node-state">
                  ${i < currentStep || isCompleted ? "DONE ✓" : (currentStep === i ? "ACTIVE" : "QUEUED")}
                </span>
              </div>
              <div class="fe-node-name">${ph.name}</div>
              <div class="fe-node-sub">${ph.sub}</div>
            </div>
          `).join("")}
        </div>

        <!-- Energy Conduit Progress Bar -->
        <div class="fe-connector-bar">
          <div class="fe-connector-progress" style="width: ${progressPct}%;"></div>
        </div>

        <!-- Main Display Card -->
        <div class="fe-stage-card">
          <!-- Live Animation Visual Arena -->
          <div class="fe-visual-arena">
            ${renderVisualAnimation(currentStep)}
          </div>

          <!-- Step Info -->
          <div class="fe-step-meta">
            <h4 class="fe-step-title">${currentPhase.title}</h4>
            <span class="fe-step-phase-tag">${currentPhase.phaseTag}</span>
          </div>

          <p class="fe-step-prompt">${currentPhase.prompt}</p>

          <!-- 1-Tap Option Pills -->
          <div class="fe-pills-grid" role="group">
            ${currentPhase.options.map((opt, optIdx) => `
              <div class="fe-pill ${selectedOpts[currentStep] === optIdx ? "selected" : ""}" data-opt="${optIdx}">
                <div class="fe-pill-title">
                  <span style="font-size: 11px; opacity: 0.8;">[${optIdx + 1}]</span>
                  ${opt.title}
                </div>
                <div class="fe-pill-desc">${opt.desc}</div>
              </div>
            `).join("")}
          </div>

          <!-- Optional Focus Timer on Phase 4 -->
          ${currentStep === 3 ? `
            <div class="fe-timer-box">
              <div class="fe-timer-info">
                <span class="fe-timer-label">Timer Fokus Praktik (Langsung Eksekusi)</span>
                <span class="fe-timer-digits" id="feTimerDisplay">${formatTime(timerSec)}</span>
              </div>
              <div class="fe-timer-btns">
                <button class="fe-btn-timer" id="feTimerToggle">${timerActive ? "Jeda" : "Mulai Timer"}</button>
                <button class="fe-btn-timer" id="feTimerReset">Reset</button>
              </div>
            </div>
          ` : ""}

          <!-- Action & Transition Controls -->
          <div class="fe-action-bar">
            <div class="fe-insight-callout">
              <strong>Prinsip:</strong> ${currentPhase.insight}
            </div>
            <div class="fe-btn-group">
              ${currentStep > 0 ? `<button class="fe-btn-secondary" id="fePrevBtn">← Tahap Sebelumnya</button>` : ""}
              <button class="fe-btn-primary" id="feNextBtn">
                ${currentStep === phases.length - 1 ? (isCompleted ? "Tersimpan: Praktik Tuntas ✓" : currentPhase.btnLabel) : currentPhase.btnLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind Event Listeners
    host.querySelectorAll(".fe-node").forEach(node => {
      node.onclick = () => {
        currentStep = Number(node.dataset.step);
        isSimulating = false;
        saveFrameworkState();
        render();
      };
    });

    host.querySelectorAll(".fe-pill").forEach(pill => {
      pill.onclick = () => {
        selectedOpts[currentStep] = Number(pill.dataset.opt);
        saveFrameworkState();
        render();
      };
    });

    const nextBtn = host.querySelector("#feNextBtn");
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (currentStep < phases.length - 1) {
          currentStep++;
          saveFrameworkState();
          render();
        } else {
          // Final Phase Completion
          pState.completed = true;
          pState.completedAt = new Date().toISOString();
          saveFrameworkState();
          save(); // Trigger global study app save
          render();
          
          // Friendly feedback
          const notif = document.getElementById("backupStatus");
          if (notif) {
            notif.textContent = "Framework Servo Reset berhasil dieksekusi dan tersimpan di browser!";
          }
        }
      };
    }

    const prevBtn = host.querySelector("#fePrevBtn");
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (currentStep > 0) {
          currentStep--;
          saveFrameworkState();
          render();
        }
      };
    }

    const simBtn = host.querySelector("#feSimBtn");
    if (simBtn) {
      simBtn.onclick = () => {
        isSimulating = !isSimulating;
        if (isSimulating) {
          runSimulationCycle();
        } else {
          render();
        }
      };
    }

    // Timer buttons in phase 4
    if (currentStep === 3) {
      const timerToggle = host.querySelector("#feTimerToggle");
      if (timerToggle) {
        timerToggle.onclick = () => {
          timerActive = !timerActive;
          if (timerActive) {
            startTimer();
          } else {
            stopTimer();
          }
          render();
        };
      }
      const timerReset = host.querySelector("#feTimerReset");
      if (timerReset) {
        timerReset.onclick = () => {
          stopTimer();
          timerSec = 120;
          render();
        };
      }
    }
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (timerSec > 0) {
        timerSec--;
        const disp = host.querySelector("#feTimerDisplay");
        if (disp) disp.textContent = formatTime(timerSec);
      } else {
        stopTimer();
        timerActive = false;
        render();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerActive = false;
  }

  function saveFrameworkState() {
    pState.step = currentStep;
    pState.selectedOpts = selectedOpts;
    pState.timerSeconds = timerSec;
    save();
  }

  let simCycleTimer = null;
  function runSimulationCycle() {
    render();
    clearTimeout(simCycleTimer);
    simCycleTimer = setTimeout(() => {
      if (!isSimulating) return;
      currentStep = (currentStep + 1) % phases.length;
      saveFrameworkState();
      runSimulationCycle();
    }, 2800);
  }

  // Initial render
  render();

  // Also hook into celebrate dialog close
  const closeCelebrate = document.getElementById("closeCelebrate");
  if (closeCelebrate) {
    closeCelebrate.textContent = "Buka Framework Bakar";
    closeCelebrate.onclick = () => {
      document.getElementById("celebrate").close();
      host.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }
})();
