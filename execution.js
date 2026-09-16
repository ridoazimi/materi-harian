(() => {
  // Clean prior instances
  document.querySelectorAll(".mindmap-explainer, .realistic-framework, .framework-engine, .burn-practice, .execution").forEach(el => el.remove());

  const host = document.createElement("section");
  host.className = "mindmap-explainer";
  host.setAttribute("aria-label", "Peta Konsep Intisari Materi");

  const style = document.createElement("style");
  style.textContent = `
    .mindmap-explainer {
      margin: 32px 0 24px;
      padding: 24px;
      background: #fffefa;
      border: 1px solid #dedfd6;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(36, 39, 34, 0.04);
      font-family: inherit;
      color: #242722;
      position: relative;
      overflow: hidden;
    }
    .me-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #ebece4;
    }
    .me-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #a23e26;
      margin-bottom: 4px;
    }
    .me-tag-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #a23e26;
      box-shadow: 0 0 8px rgba(162, 62, 38, 0.5);
      animation: mePulse 2s infinite ease-in-out;
    }
    .me-title {
      margin: 0;
      font-family: "Newsreader", Georgia, serif;
      font-size: 26px;
      font-weight: 600;
      color: #242722;
      line-height: 1.25;
    }
    .me-subtitle {
      margin: 4px 0 0;
      font-size: 13.5px;
      color: #62665d;
      line-height: 1.4;
    }
    .me-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .me-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #dedfd6;
      background: #fff;
      color: #242722;
      transition: all 0.2s ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .me-btn:hover {
      background: #f7f5ef;
      border-color: #c9cbbe;
    }
    .me-btn-primary {
      background: #a23e26;
      border-color: #a23e26;
      color: #fff;
    }
    .me-btn-primary:hover {
      background: #8b321d;
      border-color: #8b321d;
    }
    .me-progress-bar {
      height: 4px;
      background: #eeebe3;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 24px;
      position: relative;
    }
    .me-progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #a23e26, #d97706, #059669);
      transition: width 0.35s ease;
    }

    /* Diagram Canvas / Arena */
    .me-flow-container {
      position: relative;
      margin: 12px 0 20px;
    }

    /* Desktop Horizontal Track */
    .me-track {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      position: relative;
      z-index: 2;
    }

    /* Connecting SVG Conduit */
    .me-svg-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    /* Node Cards */
    .me-node {
      background: #fff;
      border: 1.5px solid #e5e6dc;
      border-radius: 16px;
      padding: 18px 16px;
      position: relative;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 170px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }
    .me-node:hover {
      transform: translateY(-2px);
      border-color: #c9cbbe;
    }
    .me-node.active {
      border: 2px solid #a23e26 !important;
      background: #fffbf9;
      box-shadow: 0 10px 28px rgba(162, 62, 38, 0.16);
      transform: translateY(-4px);
    }
    .me-node.completed {
      border-color: #059669;
      background: #fbfdfc;
    }

    .me-node-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .me-node-step {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #787d72;
      font-family: ui-monospace, monospace;
    }
    .me-node.active .me-node-step {
      color: #a23e26;
    }
    .me-node.completed .me-node-step {
      color: #059669;
    }

    .me-node-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      background: #f7f5ef;
      border: 1px solid #e5e6dc;
      transition: all 0.3s ease;
    }
    .me-node.active .me-node-icon {
      background: #fbf0ec;
      border-color: #f1c7bc;
      transform: scale(1.1);
    }
    .me-node.completed .me-node-icon {
      background: #ecfdf5;
      border-color: #a7f3d0;
    }

    .me-node-title {
      font-family: "Newsreader", Georgia, serif;
      font-size: 17px;
      font-weight: 600;
      color: #242722;
      line-height: 1.3;
      margin: 0;
    }
    .me-node.active .me-node-title {
      color: #a23e26;
    }

    .me-node-desc {
      font-size: 12.5px;
      color: #62665d;
      line-height: 1.45;
      margin: 0;
      flex-grow: 1;
    }

    .me-node-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10.5px;
      font-weight: 600;
      width: fit-content;
      background: #f4f4ee;
      color: #62665d;
    }
    .me-node.active .me-node-badge {
      background: #faece7;
      color: #a23e26;
    }
    .me-node.completed .me-node-badge {
      background: #d1fae5;
      color: #065f46;
    }

    /* Live Narrative Card */
    .me-narrative {
      background: #fbfbf7;
      border: 1px solid #ebece4;
      border-radius: 14px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 16px;
      position: relative;
    }
    .me-narrative-glow {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #a23e26;
      flex-shrink: 0;
      box-shadow: 0 0 12px #a23e26;
      animation: mePulse 1.5s infinite;
    }
    .me-narrative-text {
      flex: 1;
      font-size: 13.5px;
      line-height: 1.5;
      color: #383c34;
      margin: 0;
    }
    .me-narrative-text strong {
      color: #1a1c18;
      font-weight: 600;
    }

    /* Keyframe Animations */
    @keyframes mePulse {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.3); opacity: 1; }
    }
    @keyframes dashMove {
      to { stroke-dashoffset: -32; }
    }
    .me-flowing-line {
      stroke-dasharray: 8 6;
      animation: dashMove 1s linear infinite;
    }

    /* Mobile Responsive Adjustments */
    @media (max-width: 800px) {
      .me-track {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .me-node {
        min-height: auto;
        padding: 14px 16px;
      }
      .me-svg-canvas {
        display: none;
      }
      .me-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .me-controls {
        width: 100%;
        justify-content: space-between;
      }
      .me-btn {
        flex: 1;
        justify-content: center;
      }
    }
  `;
  document.head.appendChild(style);

  // Concept Map Data from "18. Bakar"
  const nodes = [
    {
      step: "01",
      icon: "🧠",
      title: "Beban Dalam Diri",
      desc: "Masalah, trauma masa lalu, atau keraguan yang bersarang dan menyabotase servo pikiran.",
      badge: "Kondisi Awal",
      narrative: "Di materi ini, langkah pertama adalah menyadari bahwa dalam diri ada beban lama atau keraguan yang diam-diam menarik kita mundur."
    },
    {
      step: "02",
      icon: "📝",
      title: "Objektifikasi ke Kertas",
      desc: "Tuliskan masalah di secarik kertas lalu digulung. Pisahkan identitas diri dari masalah tersebut.",
      badge: "Pemisahan Mental",
      narrative: "Masalah ditulis dan digulung di kertas. Seketika beban itu bukan lagi diri kita, melainkan hanya sebuah objek di luar diri yang bisa dibuang."
    },
    {
      step: "03",
      icon: "🔥",
      title: "Pelepasan Total (Bakar)",
      desc: "Buang bola kertas ke api unggun. Hangus menjadi abu, memusnahkan semua opsi jalan mundur.",
      badge: "Burn The Boats",
      narrative: "Bola kertas dilempar ke api. Saat terbakar habis, kita memutus total pintu belakang: tidak ada lagi menoleh ke kegagalan lama."
    },
    {
      step: "04",
      icon: "🎯",
      title: "Servo Baru Terkunci",
      desc: "Pikiran bersih tanpa beban. Mekanisme otomatis langsung meluncur mengunci target produktif di depan.",
      badge: "Target Terkunci",
      narrative: "Dengan beban yang sudah musnah, servo mechanism bekerja bersih tanpa hambatan: otomatis meluncur menuju target nyata."
    }
  ];

  let currentStep = 0;
  let isPlaying = true;
  let timerId = null;
  const STEP_DURATION = 4000; // 4 seconds per node

  host.innerHTML = `
    <div class="me-header">
      <div>
        <div class="me-tag">
          <span class="me-tag-dot"></span>
          <span>Peta Konsep Intisari · Materi 18. Bakar</span>
        </div>
        <h2 class="me-title">Diagram Alir Mekanisme Pelepasan & Servo</h2>
        <p class="me-subtitle">Rangkuman visual otomatis: ikuti bagaimana proses pelepasan mental bekerja dari awal hingga fokus baru terkunci.</p>
      </div>
      <div class="me-controls">
        <button type="button" class="me-btn me-btn-primary" id="mePlayBtn">
          <span id="mePlayIcon">⏸</span> <span id="mePlayText">Jeda</span>
        </button>
        <button type="button" class="me-btn" id="meRestartBtn">
          <span>↺</span> Ulangi
        </button>
      </div>
    </div>

    <div class="me-progress-bar">
      <div class="me-progress-fill" id="meProgressBar"></div>
    </div>

    <div class="me-flow-container">
      <svg class="me-svg-canvas" id="meSvg" preserveAspectRatio="none">
        <!-- Connecting Pipes rendered dynamically -->
      </svg>
      <div class="me-track" id="meTrack">
        ${nodes.map((n, i) => `
          <div class="me-node ${i === 0 ? "active" : ""}" data-index="${i}">
            <div class="me-node-top">
              <span class="me-node-step">LANGKAH ${n.step}</span>
              <span class="me-node-badge">${n.badge}</span>
            </div>
            <div class="me-node-icon">${n.icon}</div>
            <h3 class="me-node-title">${n.title}</h3>
            <p class="me-node-desc">${n.desc}</p>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="me-narrative">
      <div class="me-narrative-glow"></div>
      <p class="me-narrative-text" id="meNarrativeText">
        <strong>Langkah 01 / ${nodes[0].title}:</strong> ${nodes[0].narrative}
      </p>
    </div>
  `;

  // Place directly after the video shell
  const videoShell = document.querySelector(".video-shell") || document.querySelector("main") || document.body;
  if (videoShell && videoShell.parentNode) {
    videoShell.parentNode.insertBefore(host, videoShell.nextSibling);
  } else {
    document.body.appendChild(host);
  }

  const playBtn = host.querySelector("#mePlayBtn");
  const playIcon = host.querySelector("#mePlayIcon");
  const playText = host.querySelector("#mePlayText");
  const restartBtn = host.querySelector("#meRestartBtn");
  const progressBar = host.querySelector("#meProgressBar");
  const narrativeText = host.querySelector("#meNarrativeText");
  const nodeEls = host.querySelectorAll(".me-node");
  const svgEl = host.querySelector("#meSvg");

  function drawConnections() {
    if (window.innerWidth <= 800) {
      svgEl.innerHTML = "";
      return;
    }
    const containerRect = svgEl.getBoundingClientRect();
    if (containerRect.width === 0) return;

    svgEl.setAttribute("viewBox", `0 0 ${containerRect.width} ${containerRect.height}`);
    let paths = "";

    for (let i = 0; i < nodeEls.length - 1; i++) {
      const r1 = nodeEls[i].getBoundingClientRect();
      const r2 = nodeEls[i + 1].getBoundingClientRect();

      const x1 = r1.right - containerRect.left;
      const y1 = r1.top + r1.height / 2 - containerRect.top;
      const x2 = r2.left - containerRect.left;
      const y2 = r2.top + r2.height / 2 - containerRect.top;

      const isCompleted = i < currentStep;
      const isActive = i === currentStep - 1;

      const strokeColor = isCompleted ? "#059669" : isActive ? "#a23e26" : "#dedfd6";
      const strokeWidth = isCompleted || isActive ? "3" : "2";
      const flowClass = isActive ? "me-flowing-line" : "";

      paths += `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
              stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" class="${flowClass}" />
        <circle cx="${x2}" cy="${y2}" r="4" fill="${strokeColor}" />
      `;
    }
    svgEl.innerHTML = paths;
  }

  function setStep(index) {
    currentStep = index;
    nodeEls.forEach((el, idx) => {
      el.classList.remove("active", "completed");
      if (idx < currentStep) el.classList.add("completed");
      else if (idx === currentStep) el.classList.add("active");
    });

    const progressPct = ((currentStep + 1) / nodes.length) * 100;
    progressBar.style.width = `${progressPct}%`;

    const n = nodes[currentStep];
    narrativeText.innerHTML = `<strong>Langkah ${n.step} / ${n.title}:</strong> ${n.narrative}`;
    drawConnections();
  }

  function nextStep() {
    let next = currentStep + 1;
    if (next >= nodes.length) {
      next = 0; // Loop back smoothly
    }
    setStep(next);
  }

  function startPlayback() {
    stopPlayback();
    isPlaying = true;
    playIcon.textContent = "⏸";
    playText.textContent = "Jeda";
    timerId = setInterval(nextStep, STEP_DURATION);
  }

  function stopPlayback() {
    isPlaying = false;
    playIcon.textContent = "▶";
    playText.textContent = "Putar";
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  playBtn.addEventListener("click", () => {
    if (isPlaying) stopPlayback();
    else startPlayback();
  });

  restartBtn.addEventListener("click", () => {
    setStep(0);
    startPlayback();
  });

  nodeEls.forEach(el => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.getAttribute("data-index"), 10);
      setStep(idx);
      // Pause automatic jumping for a moment so user can read, then resume
      stopPlayback();
    });
  });

  window.addEventListener("resize", drawConnections);
  setTimeout(() => {
    setStep(0);
    drawConnections();
    startPlayback();
  }, 100);

})();
