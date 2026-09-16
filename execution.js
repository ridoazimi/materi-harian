(() => {
  // Clean up any prior instances
  const existing = document.querySelector(".realistic-framework");
  if (existing) existing.remove();
  const oldEngine = document.querySelector(".framework-engine");
  if (oldEngine) oldEngine.remove();
  const oldBurn = document.querySelector(".burn-lab");
  if (oldBurn) oldBurn.remove();

  // Create framework container
  const host = document.createElement("section");
  host.className = "realistic-framework";
  host.setAttribute("aria-label", "Framework Praktik Realistis Materi Bakar");

  const notes = document.querySelector(".notes");
  if (notes) {
    notes.before(host);
  } else {
    document.querySelector(".lesson").append(host);
  }

  // Inject Styles
  const styleId = "realistic-framework-styles";
  let styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.append(styleEl);
  }

  styleEl.textContent = `
    .realistic-framework {
      margin: 36px 0 28px;
      background: #fffdf9;
      border: 1px solid #e5dfd5;
      border-radius: 16px;
      padding: 28px;
      color: #2b2823;
      font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
      box-shadow: 0 10px 30px rgba(50, 40, 30, 0.05);
      position: relative;
    }

    /* Header Section */
    .rf-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      padding-bottom: 22px;
      border-bottom: 1px solid #eee8df;
      flex-wrap: wrap;
    }
    .rf-header-text {
      flex: 1;
      min-width: 260px;
    }
    .rf-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #a23e26;
      margin-bottom: 6px;
    }
    .rf-badge-dot {
      width: 7px;
      height: 7px;
      background: #a23e26;
      border-radius: 50%;
    }
    .rf-title {
      font-family: "Newsreader", Georgia, serif;
      font-size: 26px;
      font-weight: 500;
      color: #1f1d1a;
      margin: 0 0 8px;
      letter-spacing: -0.5px;
    }
    .rf-subtitle {
      font-size: 14px;
      color: #6a645a;
      margin: 0;
      line-height: 1.6;
      max-width: 580px;
    }

    .rf-sim-btn {
      background: #f7f4ee;
      border: 1px solid #dcd5c9;
      color: #4a443a;
      padding: 9px 16px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .rf-sim-btn:hover {
      background: #eee8dc;
      color: #1f1d1a;
      border-color: #baa792;
    }
    .rf-sim-btn.active {
      background: #fbeee8;
      border-color: #a23e26;
      color: #a23e26;
    }

    /* 4-Step Physical Pipeline Tracker */
    .rf-stepper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 24px 0 16px;
    }
    @media (max-width: 768px) {
      .rf-stepper {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 440px) {
      .rf-stepper {
        grid-template-columns: 1fr;
      }
    }

    .rf-step-card {
      background: #faf7f0;
      border: 1px solid #e5ded3;
      border-radius: 10px;
      padding: 14px;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .rf-step-card:hover {
      border-color: #c9bea9;
      transform: translateY(-2px);
    }
    .rf-step-card.active {
      background: #ffffff;
      border-color: #a23e26;
      box-shadow: 0 4px 16px rgba(162, 62, 38, 0.12);
    }
    .rf-step-card.done {
      border-color: #286144;
      background: #f4f8f5;
    }

    .rf-step-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .rf-step-num {
      font-size: 11px;
      font-weight: 700;
      color: #8c8272;
    }
    .rf-step-card.active .rf-step-num {
      color: #a23e26;
    }
    .rf-step-card.done .rf-step-num {
      color: #286144;
    }
    .rf-step-tag {
      font-size: 9.5px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: #eae3d5;
      color: #6a6252;
    }
    .rf-step-card.active .rf-step-tag {
      background: #fae8e3;
      color: #a23e26;
    }
    .rf-step-card.done .rf-step-tag {
      background: #e2efe7;
      color: #286144;
    }
    .rf-step-name {
      font-size: 13.5px;
      font-weight: 700;
      color: #2b2823;
      margin: 0 0 3px;
    }
    .rf-step-desc {
      font-size: 11.5px;
      color: #7a7264;
      line-height: 1.4;
      margin: 0;
    }

    /* Track Progress Line */
    .rf-track {
      height: 4px;
      background: #ece5d8;
      border-radius: 2px;
      position: relative;
      margin-bottom: 24px;
      overflow: hidden;
    }
    .rf-track-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: linear-gradient(90deg, #a23e26 0%, #c45b3f 60%, #286144 100%);
      transition: width 0.35s ease;
    }

    /* Main Interaction Card */
    .rf-main-stage {
      background: #fdfbf7;
      border: 1px solid #e8e1d5;
      border-radius: 14px;
      padding: 24px;
      position: relative;
    }

    /* Realistic Visual Arena */
    .rf-visual-box {
      height: 220px;
      background: #1c1917;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      margin-bottom: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 2px 14px rgba(0, 0, 0, 0.4);
    }
    .rf-visual-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Step Details & Directives */
    .rf-stage-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .rf-stage-title {
      font-family: "Newsreader", Georgia, serif;
      font-size: 21px;
      font-weight: 500;
      color: #1f1d1a;
      margin: 0;
    }
    .rf-stage-phase-label {
      font-size: 11px;
      font-weight: 700;
      color: #a23e26;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .rf-stage-instruction {
      font-size: 13.5px;
      color: #6a645a;
      margin: 0 0 16px;
      line-height: 1.55;
    }

    /* Realistic Paper / Action Cards (1-Tap Selection) */
    .rf-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    @media (max-width: 640px) {
      .rf-cards-grid {
        grid-template-columns: 1fr;
      }
    }

    .rf-item-card {
      background: #ffffff;
      border: 1px solid #dcd4c5;
      border-radius: 10px;
      padding: 16px;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-shadow: 0 2px 6px rgba(40, 30, 20, 0.03);
    }
    .rf-item-card:hover {
      border-color: #bfae98;
      background: #fffefa;
      transform: translateY(-2px);
    }
    .rf-item-card.selected {
      border-color: #a23e26;
      background: #fdf6f3;
      box-shadow: 0 4px 12px rgba(162, 62, 38, 0.1);
    }
    .rf-item-card-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #2b2823;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .rf-item-card.selected .rf-item-card-title {
      color: #a23e26;
    }
    .rf-item-card-desc {
      font-size: 12px;
      color: #6e675b;
      line-height: 1.5;
    }

    /* Stage 4: Real Focus Timer */
    .rf-timer-module {
      background: #f4f8f5;
      border: 1px solid #c8ded2;
      border-radius: 10px;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .rf-timer-left {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .rf-timer-eyebrow {
      font-size: 11px;
      font-weight: 700;
      color: #286144;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .rf-timer-clock {
      font-size: 28px;
      font-weight: 800;
      color: #1a422e;
      font-family: monospace;
      letter-spacing: 1px;
    }
    .rf-timer-controls {
      display: flex;
      gap: 8px;
    }
    .rf-btn-clock {
      background: #ffffff;
      border: 1px solid #bdd5c7;
      color: #1f4733;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .rf-btn-clock:hover {
      background: #e6f0ea;
      border-color: #9ec1ae;
    }

    /* Bottom Action Controls */
    .rf-action-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      padding-top: 16px;
      border-top: 1px solid #eee8df;
      flex-wrap: wrap;
    }
    .rf-insight-text {
      font-size: 12.5px;
      color: #665f54;
      line-height: 1.55;
      flex: 1;
      min-width: 240px;
    }
    .rf-insight-text strong {
      color: #a23e26;
    }
    .rf-action-buttons {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    @media (max-width: 640px) {
      .rf-action-buttons {
        width: 100%;
      }
      .rf-btn-next, .rf-btn-prev {
        flex: 1;
        justify-content: center;
        text-align: center;
      }
    }

    .rf-btn-next {
      background: #a23e26;
      color: #ffffff;
      border: 1px solid #a23e26;
      border-radius: 8px;
      padding: 11px 22px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .rf-btn-next:hover {
      background: #8b341f;
      border-color: #8b341f;
      transform: translateY(-1px);
    }
    .rf-btn-prev {
      background: #f7f4ee;
      color: #6a645a;
      border: 1px solid #ded6c8;
      border-radius: 8px;
      padding: 11px 16px;
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .rf-btn-prev:hover {
      background: #eee8dc;
      color: #2b2823;
    }
  `;

  // Realistic Grounded 4-Step Framework
  const steps = [
    {
      num: "01",
      tag: "LANGKAH 1",
      name: "Tulis Beban Nyata",
      desc: "Akui 1 hambatan yang bikin macet hari ini",
      title: "Langkah 1: Akui 1 Beban atau Ketakutan Nyata Hari Ini",
      phaseLabel: "IDENTIFIKASI OBJEKTIF",
      instruction: "Seperti yang dicontohkan di video, tuliskan atau pilih satu beban mental nyata yang selama ini bikin kamu menunda (tanpa perlu mengetik):",
      cards: [
        {
          title: "Takut Gagal & Overthinking",
          desc: "Merasa hasil kerjanya belum sempurna, jadi terus ditunda dan tidak berani mulai."
        },
        {
          title: "Inersia Menunda Pekerjaan Penting",
          desc: "Tahu persis apa yang harus diselesaikan, tapi malah scroll HP atau ngerjain hal sepele."
        },
        {
          title: "Ragu Menghubungi / Menawarkan",
          desc: "Ada rasa canggung atau takut ditolak saat mau follow up konsumen atau orang lain."
        }
      ],
      insight: "Mengakui beban di atas kertas memindahkan masalah dari kepala yang kalut menjadi objek nyata yang bisa dilepaskan.",
      btnLabel: "Remas & Siapkan Pelepasan ➔"
    },
    {
      num: "02",
      tag: "LANGKAH 2",
      name: "Putus Keterikatan",
      desc: "Dekonstruksi: pisahkan dirimu dari beban itu",
      title: "Langkah 2: Pisahkan Diri dari Beban Tersebut",
      phaseLabel: "DEKONSTRUKSI EGO",
      instruction: "Beban itu bukan identitasmu, itu cuma catatan masa lalu. Tentukan caramu memandang beban ini sekarang:",
      cards: [
        {
          title: "Ini Hanya Pola Lama, Bukan Diriku",
          desc: "Kesalahan atau rasa malas kemarin tidak menentukan kemampuanku hari ini."
        },
        {
          title: "Hentikan Debat di Kepala",
          desc: "Tidak usah dicari seribu alasan pembelaan. Cukup lihat apa adanya dan terima."
        },
        {
          title: "Cukup Sampai di Sini",
          desc: "Tutup bab lama. Energi hari ini tidak boleh lagi bocor untuk memikirkan yang sudah lewat."
        }
      ],
      insight: "Saat kamu berhenti memberi makan emosi pada masalah lama, masalah itu kehilangan kekuatannya untuk mengatur tindakanmu.",
      btnLabel: "Bawa ke Api Pelepasan ➔"
    },
    {
      num: "03",
      tag: "LANGKAH 3",
      name: "Bakar Sampai Habis",
      desc: "Simbol pelepasan total tanpa jalan mundur",
      title: "Langkah 3: Pembakaran Simbolis (Bakar Sampai Habis)",
      phaseLabel: "PELEPASAN TOTAL",
      instruction: "Inti materi 18: Kertas masalah digulung dan dibakar di api unggun. Hilangkan opsi mundur ('Burn the Boats') agar fokus 100% maju:",
      cards: [
        {
          title: "Hapus Rencana Mundur (No Plan B)",
          desc: "Maju dengan komitmen penuh, tanpa menyediakan pintu belakang untuk kabur."
        },
        {
          title: "Relakan & Lepaskan Beban",
          desc: "Ikhlaskan yang sudah terjadi. Biarkan semua keraguan habis terbakar bersama kertas ini."
        },
        {
          title: "Hening & Bersihkan Pikiran",
          desc: "Rasakan kelegaan setelah beban dilepaskan. Siapkan energi untuk eksekusi nyata."
        }
      ],
      insight: "Kertas dan masalahnya sudah jadi abu. Meja sekarang bersih, pikiran kosong dari keraguan, siap melangkah.",
      btnLabel: "Buka Meja Kerja & Mulai Aksi ➔"
    },
    {
      num: "04",
      tag: "LANGKAH 4",
      name: "Eksekusi Nyata 5 Menit",
      desc: "Langsung kerja di dunia nyata tanpa ditunda",
      title: "Langkah 4: Aksi Nyata 5 Menit di Dunia Nyata",
      phaseLabel: "EKSEKUSI MOMENTUM",
      instruction: "Pilih 1 aksi realistis yang langsung kamu lakukan sekarang di mejamu (tanpa ngetik, langsung praktik):",
      cards: [
        {
          title: "Aturan 5 Menit Pertama",
          desc: "Buka dokumen/tugas yang tertunda sekarang. Tulis apa saja selama 5 menit tanpa mengoreksi atau menghakimi."
        },
        {
          title: "Meja Bersih & HP Dibalik",
          desc: "Taruh HP di luar jangkauan (layar dibalik), tutup tab yang tidak perlu, kerjakan 1 prioritas terpenting."
        },
        {
          title: "Kirim 1 Komunikasi Penting",
          desc: "Kirimkan 1 pesan, chat, atau email penting yang selama ini kamu tunda karena ragu."
        }
      ],
      insight: "Jangan menunggu motivasi datang baru bergerak. Bergerak dulu 5 menit, maka fokus dan motivasi akan mengikuti.",
      btnLabel: "Saya Sudah Praktikkan Nyata ✓"
    }
  ];

  // Persistent storage state
  function getPracticeState() {
    if (!state.realisticPractice || typeof state.realisticPractice !== "object") {
      state.realisticPractice = {};
    }
    if (!state.realisticPractice[LESSON]) {
      state.realisticPractice[LESSON] = {
        step: 0,
        selectedCards: [0, 0, 0, 0],
        completed: false,
        timerSeconds: 300,
        completedAt: null
      };
    }
    return state.realisticPractice[LESSON];
  }

  const pState = getPracticeState();
  let currentStep = pState.step || 0;
  let selectedCards = pState.selectedCards || [0, 0, 0, 0];
  let isSimulating = false;
  let simTimer = null;
  let timerActive = false;
  let timerSec = pState.timerSeconds || 300;
  let timerInterval = null;

  // Animation Canvas Engine (Realistic Warm Campfire & Desk Simulation)
  let canvasAnimId = null;
  let particles = [];

  function initCanvasAnimation(stepIdx) {
    const canvas = host.querySelector("#rfCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Reset particles
    particles = [];

    if (canvasAnimId) {
      cancelAnimationFrame(canvasAnimId);
      canvasAnimId = null;
    }

    let frameCount = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      frameCount++;

      if (stepIdx === 0) {
        // STEP 1: Realistic Desk & Note Paper
        // Warm wooden desk surface
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#2c221e");
        grad.addColorStop(1, "#1c1512");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Realistic Notebook / Paper pad in center
        const pw = Math.min(260, w - 60);
        const ph = 140;
        const px = (w - pw) / 2;
        const py = (h - ph) / 2;

        // Paper shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(px + 4, py + 6, pw, ph);

        // Paper sheet
        ctx.fillStyle = "#faf6ed";
        ctx.fillRect(px, py, pw, ph);

        // Top paper binder strip
        ctx.fillStyle = "#a23e26";
        ctx.fillRect(px, py, pw, 10);

        // Realistic notebook ruled lines
        ctx.strokeStyle = "#e5dfd3";
        ctx.lineWidth = 1;
        for (let y = py + 30; y < py + ph - 10; y += 18) {
          ctx.beginPath();
          ctx.moveTo(px + 15, y);
          ctx.lineTo(px + pw - 15, y);
          ctx.stroke();
        }

        // Handwritten text simulation line
        ctx.strokeStyle = "#403830";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        const textProgress = Math.min(1, (frameCount % 120) / 70);
        ctx.beginPath();
        ctx.moveTo(px + 20, py + 48);
        ctx.lineTo(px + 20 + (pw - 60) * textProgress, py + 48);
        ctx.stroke();

        // Realistic Pen laying beside paper
        const penX = px + pw + 12;
        if (penX + 8 < w) {
          ctx.fillStyle = "#8a7d6e";
          ctx.fillRect(penX, py + 20, 5, 80);
          ctx.fillStyle = "#1c1512";
          ctx.fillRect(penX, py + 10, 5, 10);
        }

        // Label
        ctx.fillStyle = "#e5ded4";
        ctx.font = "600 12px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Secarik Kertas Catatan: Tuliskan Bebanmu", w / 2, h - 16);

      } else if (stepIdx === 1) {
        // STEP 2: Paper crumpled into a ball, ready to be thrown
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#241c19");
        grad.addColorStop(1, "#14100e");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Paper ball in center with subtle floating bob
        const cx = w / 2;
        const cy = h / 2 + Math.sin(frameCount * 0.05) * 5;

        // Shadow under ball
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + 34, 30, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Crumpled Paper Ball
        ctx.fillStyle = "#f5efe3";
        ctx.beginPath();
        ctx.arc(cx, cy, 26, 0, Math.PI * 2);
        ctx.fill();

        // Crumple folds & creases
        ctx.strokeStyle = "#c4b8a5";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - 15, cy - 10);
        ctx.lineTo(cx + 5, cy - 2);
        ctx.lineTo(cx + 18, cy - 14);
        ctx.moveTo(cx - 18, cy + 8);
        ctx.lineTo(cx - 4, cy + 2);
        ctx.lineTo(cx + 14, cy + 12);
        ctx.moveTo(cx - 2, cy - 20);
        ctx.lineTo(cx + 8, cy + 6);
        ctx.stroke();

        // Severing scissors / release icon
        ctx.fillStyle = "#e5ded4";
        ctx.font = "600 12px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Kertas Telah Digulung: Siap Dilepaskan ke Api", w / 2, h - 16);

      } else if (stepIdx === 2) {
        // STEP 3: Realistic Warm Campfire & Burning Ash (The Real Core of Video 18)
        // Dark Night / Gathering Atmosphere
        ctx.fillStyle = "#120f0d";
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const baseCy = h - 45;

        // Campfire Wooden Logs at bottom
        ctx.fillStyle = "#3d271d";
        ctx.beginPath();
        ctx.ellipse(cx - 30, baseCy, 35, 10, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + 30, baseCy, 35, 10, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Fire Glow Gradient
        const glow = ctx.createRadialGradient(cx, baseCy - 30, 10, cx, baseCy - 30, 110);
        glow.addColorStop(0, "rgba(255, 140, 20, 0.45)");
        glow.addColorStop(0.5, "rgba(220, 60, 10, 0.15)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(cx - 120, baseCy - 140, 240, 160);

        // Natural Organic Flame Layers
        const f1 = Math.sin(frameCount * 0.12) * 8;
        const f2 = Math.cos(frameCount * 0.15) * 6;

        // Outer Flame (Red-Orange)
        ctx.fillStyle = "#e64a19";
        ctx.beginPath();
        ctx.moveTo(cx - 36, baseCy);
        ctx.quadraticCurveTo(cx - 40, baseCy - 60, cx - 10 + f1, baseCy - 95);
        ctx.quadraticCurveTo(cx + 10, baseCy - 60, cx + 5 + f2, baseCy - 110);
        ctx.quadraticCurveTo(cx + 35, baseCy - 55, cx + 36, baseCy);
        ctx.closePath();
        ctx.fill();

        // Mid Flame (Golden Amber)
        ctx.fillStyle = "#f57c00";
        ctx.beginPath();
        ctx.moveTo(cx - 24, baseCy);
        ctx.quadraticCurveTo(cx - 25, baseCy - 45, cx - 5 + f2, baseCy - 80);
        ctx.quadraticCurveTo(cx + 8, baseCy - 50, cx + 2 + f1, baseCy - 90);
        ctx.quadraticCurveTo(cx + 25, baseCy - 40, cx + 24, baseCy);
        ctx.closePath();
        ctx.fill();

        // Inner Core Flame (Warm Yellow-White)
        ctx.fillStyle = "#ffeb3b";
        ctx.beginPath();
        ctx.moveTo(cx - 14, baseCy);
        ctx.quadraticCurveTo(cx - 10, baseCy - 30, cx + f1 * 0.5, baseCy - 55);
        ctx.quadraticCurveTo(cx + 10, baseCy - 30, cx + 14, baseCy);
        ctx.closePath();
        ctx.fill();

        // Realistic Rising Embers / Sparks (Particles)
        if (particles.length < 35 && Math.random() < 0.6) {
          particles.push({
            x: cx + (Math.random() - 0.5) * 40,
            y: baseCy - 20,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -1.2 - Math.random() * 2,
            size: 1 + Math.random() * 2.5,
            life: 1,
            decay: 0.012 + Math.random() * 0.015,
            color: Math.random() > 0.4 ? "#ffb300" : "#ff7043"
          });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= p.decay;

          if (p.life <= 0 || p.y < 10) {
            particles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Burning Status Label
        ctx.fillStyle = "#fce8d5";
        ctx.font = "600 12px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Api Unggun: Beban Terbakar Jadi Abu, Opsi Mundur Dihapus", w / 2, 26);

      } else {
        // STEP 4: Clean Desk with Steaming Coffee & Focused Work Screen
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#211c19");
        grad.addColorStop(1, "#161311");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;

        // Clean laptop in center
        const lw = Math.min(220, w - 80);
        const lh = 105;
        const lx = cx - lw / 2;
        const ly = 40;

        // Laptop base
        ctx.fillStyle = "#8a8175";
        ctx.fillRect(lx - 12, ly + lh - 6, lw + 24, 8);

        // Laptop screen bezel
        ctx.fillStyle = "#2d2621";
        ctx.fillRect(lx, ly, lw, lh - 6);

        // Laptop screen active display (clean document)
        ctx.fillStyle = "#fdfbf7";
        ctx.fillRect(lx + 8, ly + 8, lw - 16, lh - 22);

        // Clean text document lines on screen
        ctx.fillStyle = "#286144";
        ctx.fillRect(lx + 16, ly + 16, 50, 6); // header

        ctx.fillStyle = "#d0c7b9";
        for (let y = ly + 28; y < ly + lh - 22; y += 9) {
          const lineW = (y % 18 === 0) ? (lw - 48) : (lw - 65);
          ctx.fillRect(lx + 16, y, lineW, 4);
        }

        // Steaming Coffee Cup to the right
        const cupX = lx + lw + 18;
        if (cupX + 16 < w) {
          ctx.fillStyle = "#e8e1d5";
          ctx.fillRect(cupX, ly + lh - 26, 16, 20);
          // Steam wisps
          ctx.strokeStyle = "rgba(240, 230, 215, 0.4)";
          ctx.lineWidth = 1.5;
          const sOff = Math.sin(frameCount * 0.08) * 3;
          ctx.beginPath();
          ctx.moveTo(cupX + 8, ly + lh - 30);
          ctx.quadraticCurveTo(cupX + 8 + sOff, ly + lh - 42, cupX + 8, ly + lh - 50);
          ctx.stroke();
        }

        // Status
        ctx.fillStyle = "#d5e8dc";
        ctx.font = "600 12px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Meja Bersih, Fokus Penuh: Mulai 5 Menit Pertama Sekarang", w / 2, h - 16);
      }

      canvasAnimId = requestAnimationFrame(draw);
    }

    draw();
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? "0" : ""}${rem}`;
  }

  // Master Render
  function render() {
    const s = steps[currentStep];
    const progressPercent = ((currentStep + 1) / steps.length) * 100;
    const isCompleted = pState.completed;

    host.innerHTML = `
      <!-- Header -->
      <div class="rf-header">
        <div class="rf-header-text">
          <div class="rf-badge">
            <span class="rf-badge-dot"></span>
            Framework Nyata · Materi 18. Bakar
          </div>
          <h3 class="rf-title">Protokol Bakar & Eksekusi Meja Kerja</h3>
          <p class="rf-subtitle">
            Berdasarkan latihan riil di video: tuliskan beban nyata di secarik kertas, pisahkan dari dirimu, bakar hingga habis sebagai simbol pelepasan tanpa jalan mundur, lalu langsung mulai aksi 5 menit di mejamu.
          </p>
        </div>
        <button class="rf-sim-btn ${isSimulating ? "active" : ""}" id="rfSimBtn">
          <span>${isSimulating ? "⏸ Jeda Alur" : "▶ Simulasi Langkah"}</span>
        </button>
      </div>

      <!-- 4-Step Stepper Cards -->
      <div class="rf-stepper" role="tablist">
        ${steps.map((st, i) => `
          <div class="rf-step-card ${currentStep === i ? "active" : ""} ${i < currentStep || isCompleted ? "done" : ""}" data-step="${i}" role="tab" aria-selected="${currentStep === i}">
            <div class="rf-step-card-top">
              <span class="rf-step-num">${st.num} / ${st.tag}</span>
              <span class="rf-step-tag">
                ${i < currentStep || isCompleted ? "SELESAI ✓" : (currentStep === i ? "AKTIF" : "ANTRI")}
              </span>
            </div>
            <div class="rf-step-name">${st.name}</div>
            <div class="rf-step-desc">${st.desc}</div>
          </div>
        `).join("")}
      </div>

      <!-- Progress Track -->
      <div class="rf-track">
        <div class="rf-track-fill" style="width: ${progressPercent}%;"></div>
      </div>

      <!-- Main Stage Interaction Panel -->
      <div class="rf-main-stage">
        <!-- Visual Canvas Arena -->
        <div class="rf-visual-box">
          <canvas id="rfCanvas" class="rf-visual-canvas"></canvas>
        </div>

        <div class="rf-stage-header">
          <h4 class="rf-stage-title">${s.title}</h4>
          <span class="rf-stage-phase-label">${s.phaseLabel}</span>
        </div>

        <p class="rf-stage-instruction">${s.instruction}</p>

        <!-- 3 Ready-to-Tap Options Cards -->
        <div class="rf-cards-grid" role="group">
          ${s.cards.map((c, idx) => `
            <div class="rf-item-card ${selectedCards[currentStep] === idx ? "selected" : ""}" data-card="${idx}">
              <div class="rf-item-card-title">
                <span style="font-size: 11px; opacity: 0.7;">[${idx + 1}]</span>
                ${c.title}
              </div>
              <div class="rf-item-card-desc">${c.desc}</div>
            </div>
          `).join("")}
        </div>

        <!-- Optional Focus Timer on Step 4 -->
        ${currentStep === 3 ? `
          <div class="rf-timer-module">
            <div class="rf-timer-left">
              <span class="rf-timer-eyebrow">Stopwatch 5 Menit Pertama (Langsung Mulai)</span>
              <span class="rf-timer-clock" id="rfTimerClock">${formatTime(timerSec)}</span>
            </div>
            <div class="rf-timer-controls">
              <button class="rf-btn-clock" id="rfTimerToggle">${timerActive ? "Jeda Waktu" : "Mulai Stopwatch"}</button>
              <button class="rf-btn-clock" id="rfTimerReset">Reset 5 Mnt</button>
            </div>
          </div>
        ` : ""}

        <!-- Action Bar -->
        <div class="rf-action-bar">
          <div class="rf-insight-text">
            <strong>Kunci Aksi:</strong> ${s.insight}
          </div>
          <div class="rf-action-buttons">
            ${currentStep > 0 ? `<button class="rf-btn-prev" id="rfPrevBtn">← Kembali</button>` : ""}
            <button class="rf-btn-next" id="rfNextBtn">
              ${currentStep === steps.length - 1 ? (isCompleted ? "Tersimpan: Sudah Praktik Nyata ✓" : s.btnLabel) : s.btnLabel}
            </button>
          </div>
        </div>
      </div>
    `;

    // Initialize Canvas Visuals
    setTimeout(() => {
      initCanvasAnimation(currentStep);
    }, 10);

    // Event Handlers
    host.querySelectorAll(".rf-step-card").forEach(card => {
      card.onclick = () => {
        currentStep = Number(card.dataset.step);
        isSimulating = false;
        saveState();
        render();
      };
    });

    host.querySelectorAll(".rf-item-card").forEach(item => {
      item.onclick = () => {
        selectedCards[currentStep] = Number(item.dataset.card);
        saveState();
        render();
      };
    });

    const nextBtn = host.querySelector("#rfNextBtn");
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          saveState();
          render();
        } else {
          // Finish Step 4
          pState.completed = true;
          pState.completedAt = new Date().toISOString();
          saveState();
          save(); // Trigger global Ruang Belajar persistence
          render();

          const notif = document.getElementById("backupStatus");
          if (notif) {
            notif.textContent = "Langkah nyata berhasil dikonfirmasi dan tersimpan di catatan!";
          }
        }
      };
    }

    const prevBtn = host.querySelector("#rfPrevBtn");
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (currentStep > 0) {
          currentStep--;
          saveState();
          render();
        }
      };
    }

    const simBtn = host.querySelector("#rfSimBtn");
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

    // Step 4 Timer
    if (currentStep === 3) {
      const toggle = host.querySelector("#rfTimerToggle");
      if (toggle) {
        toggle.onclick = () => {
          timerActive = !timerActive;
          if (timerActive) {
            startTimer();
          } else {
            stopTimer();
          }
          render();
        };
      }
      const resetBtn = host.querySelector("#rfTimerReset");
      if (resetBtn) {
        resetBtn.onclick = () => {
          stopTimer();
          timerSec = 300;
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
        const clock = host.querySelector("#rfTimerClock");
        if (clock) clock.textContent = formatTime(timerSec);
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

  function saveState() {
    pState.step = currentStep;
    pState.selectedCards = selectedCards;
    pState.timerSeconds = timerSec;
    save();
  }

  function runSimulationCycle() {
    render();
    clearTimeout(simTimer);
    simTimer = setTimeout(() => {
      if (!isSimulating) return;
      currentStep = (currentStep + 1) % steps.length;
      saveState();
      runSimulationCycle();
    }, 3200);
  }

  // Initial render
  render();

  // Hook celebrate popup
  const closeCelebrate = document.getElementById("closeCelebrate");
  if (closeCelebrate) {
    closeCelebrate.textContent = "Buka Protokol Bakar";
    closeCelebrate.onclick = () => {
      document.getElementById("celebrate").close();
      host.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }
})();
