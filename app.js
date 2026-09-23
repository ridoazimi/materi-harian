const KEY = "rido_study_hub_v2";
const TODAY_ID = "1hIdh1kfKCutQbzjwJPWhop5Tt8NKWWn2"; // 19. Kompetensi Sekali Lagi
const $ = id => document.getElementById(id);
const video = $("mainVideo");
const driveFrame = $("driveFrame");

let currentLesson = {
  id: TODAY_ID,
  title: "19. Kompetensi Sekali Lagi",
  folder: "1. Servo Mechanism Advanced",
  phase_name: "Fase 1: Mindset & Subconscious"
};

let lessons = [], filter = "all", loadState = "loading", state, lastTime = null, lastWall = null, lastSave = 0;

function clean(raw) {
  const s = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  for (const k of ["completedLessons", "positions", "notes", "watched"]) {
    if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k])) s[k] = {};
  }
  s.streak = Number.isFinite(s.streak) && s.streak >= 0 ? Math.floor(s.streak) : 0;
  s.lastDate = typeof s.lastDate === "string" ? s.lastDate : "";
  return s;
}

let storageReadFailed = false;
try {
  state = clean(JSON.parse(localStorage.getItem(KEY) || "{}"));
} catch {
  state = clean({});
  storageReadFailed = true;
  $("storageWarning").hidden = false;
  $("storageWarning").textContent = "Data tersimpan tidak bisa dibaca. Data asli tidak ditimpa. Pulihkan dari cadangan untuk melanjutkan.";
}

function save() {
  if (storageReadFailed) return false;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    $("storageWarning").hidden = false;
    $("storageWarning").textContent = "Browser tidak bisa menyimpan progres. Unduh cadangan sebelum menutup halaman.";
    return false;
  }
}

function day(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}

function refresh() {
  const streak = [day(), day(-1)].includes(state.lastDate) ? state.streak : 0;
  $("streakCount").textContent = streak;
  $("streakLabel").setAttribute("aria-label", streak + " hari belajar berturut-turut");
  
  const total = lessons.length;
  const count = lessons.filter(x => state.completedLessons[x.id]).length;
  $("totalProgress").value = total ? (count / total) * 100 : 0;
  $("totalLabel").textContent = loadState === "error"
    ? "Kurikulum belum termuat. Buka kurikulum untuk mencoba lagi."
    : total ? count + " dari " + total + " video selesai" : "Memuat kurikulum...";

  const isDone = !!state.completedLessons[currentLesson.id];
  if (isDone) {
    $("watchStatus").textContent = "Selesai ditonton. Progres tercatat.";
    $("watchStatus").className = "done";
  } else {
    $("watchStatus").textContent = currentLesson.id === TODAY_ID
      ? "Checklist otomatis setelah video selesai."
      : "Menonton materi kurikulum (Drive Player).";
    $("watchStatus").className = "";
  }

  // Check next lesson button in header
  const idx = lessons.findIndex(x => x.id === currentLesson.id);
  const nextItem = idx >= 0 && idx + 1 < lessons.length ? lessons[idx + 1] : null;
  const btnNext = $("btnNextHeader");
  if (isDone && nextItem) {
    btnNext.style.display = "inline-flex";
    btnNext.textContent = "Materi Selanjutnya (" + nextItem.title.split(".")[0] + ") →";
    btnNext.onclick = () => setLesson(nextItem);
  } else {
    btnNext.style.display = "none";
  }

  const btnMark = $("btnMarkDone");
  if (currentLesson.id !== TODAY_ID) {
    btnMark.style.display = "inline-flex";
    btnMark.textContent = isDone ? "Tandai Belum Selesai" : "Tandai Selesai ✓";
    btnMark.onclick = () => {
      state.completedLessons[currentLesson.id] = !state.completedLessons[currentLesson.id];
      if (state.completedLessons[currentLesson.id] && state.lastDate !== day()) {
        state.streak = state.lastDate === day(-1) ? state.streak + 1 : 1;
        state.lastDate = day();
      }
      save();
      refresh();
      render();
    };
  } else {
    btnMark.style.display = "none";
  }

  updateWatch();
}

function ranges() {
  return Array.isArray(state.watched[currentLesson.id])
    ? state.watched[currentLesson.id].filter(r => Array.isArray(r) && r.length === 2 && r.every(Number.isFinite) && r[0] >= 0 && r[1] > r[0])
    : [];
}

function addRange(a, b) {
  const rs = [...ranges(), [Math.max(0, a), Math.min(video.duration, b)]].sort((x, y) => x[0] - y[0]);
  const out = [];
  for (const r of rs) {
    const prev = out[out.length - 1];
    if (prev && r[0] <= prev[1] + 0.3) prev[1] = Math.max(prev[1], r[1]);
    else out.push(r);
  }
  state.watched[currentLesson.id] = out;
}

function coverage() {
  return Number.isFinite(video.duration) && video.duration > 0
    ? Math.min(1, ranges().reduce((n, r) => n + r[1] - r[0], 0) / video.duration)
    : 0;
}

function updateWatch() {
  if (currentLesson.id !== TODAY_ID) {
    $("watchPercent").textContent = state.completedLessons[currentLesson.id] ? "100% (Selesai)" : "Drive Player";
    return;
  }
  $("watchPercent").textContent = (state.completedLessons[currentLesson.id] ? 100 : Math.floor(coverage() * 100)) + "% ditonton";
}

function resetClock() {
  lastTime = video.currentTime;
  lastWall = performance.now();
}

video.addEventListener("playing", resetClock);
video.addEventListener("seeking", () => { lastTime = null; lastWall = null; });
video.addEventListener("seeked", resetClock);
video.addEventListener("timeupdate", () => {
  if (currentLesson.id !== TODAY_ID) return;
  const now = performance.now(), t = video.currentTime;
  if (!video.paused && !video.seeking && lastTime !== null && lastWall !== null) {
    const delta = t - lastTime, allowed = (now - lastWall) / 1000 * video.playbackRate + 0.6;
    if (delta > 0 && delta <= allowed && delta < 10) addRange(lastTime, t);
  }
  lastTime = t;
  lastWall = now;
  state.positions[currentLesson.id] = t;
  updateWatch();
  if (now - lastSave > 4000) { save(); lastSave = now; }
});

video.addEventListener("pause", save);

video.addEventListener("loadedmetadata", () => {
  if (currentLesson.id !== TODAY_ID) return;
  $("duration").textContent = Math.ceil(video.duration / 60) + " menit";
  const position = Number(state.positions[currentLesson.id]);
  if (position > 0 && position < video.duration - 3) video.currentTime = position;
  $("videoError").hidden = true;
  const rate = Number(state.speed);
  if ([1, 1.25, 1.5, 2].includes(rate)) {
    video.playbackRate = rate;
    $("speed").value = String(rate);
  }
  updateWatch();
});

video.addEventListener("error", () => {
  if (currentLesson.id === TODAY_ID) $("videoError").hidden = false;
});

$("retryVideo").onclick = () => video.load();

video.addEventListener("ended", () => {
  if (currentLesson.id !== TODAY_ID) return;
  if (state.completedLessons[currentLesson.id]) return;
  if (coverage() < 0.98) {
    $("watchStatus").textContent = "Ada bagian yang terlewat. Tonton bagian itu agar checklist tercatat.";
    save();
    return;
  }
  state.completedLessons[currentLesson.id] = true;
  if (state.lastDate !== day()) {
    state.streak = state.lastDate === day(-1) ? state.streak + 1 : 1;
    state.lastDate = day();
  }
  save();
  refresh();
  render();

  const idx = lessons.findIndex(x => x.id === currentLesson.id);
  const nextItem = idx >= 0 && idx + 1 < lessons.length ? lessons[idx + 1] : null;

  $("celebrateText").textContent = currentLesson.title + " sudah selesai! Streak kamu sekarang " + state.streak + " hari berturut-turut.";
  const btnNext = $("btnNextLesson");
  if (nextItem) {
    btnNext.style.display = "block";
    btnNext.textContent = "Lanjut ke: " + nextItem.title + " 🚀";
    btnNext.onclick = () => {
      $("celebrate").close();
      setLesson(nextItem);
    };
  } else {
    btnNext.style.display = "none";
  }
  $("celebrate").showModal();
});

function setLesson(item) {
  currentLesson = item;
  $("lessonTitle").textContent = item.title;
  $("lessonFolder").textContent = (item.id === TODAY_ID ? "Materi hari ini / " : "Materi kurikulum / ") + (item.folder || "");
  $("note").value = typeof state.notes[item.id] === "string" ? state.notes[item.id] : "";
  $("errorDriveLink").href = "https://drive.google.com/file/d/" + encodeURIComponent(item.id) + "/view";

  if (item.id === TODAY_ID) {
    driveFrame.hidden = true;
    driveFrame.style.display = "none";
    driveFrame.src = "";
    video.hidden = false;
    video.style.display = "block";
    $("nativeControls").style.display = "flex";
    if ($("driveNotice")) { $("driveNotice").hidden = true; $("driveNotice").style.display = "none"; }
  } else {
    video.pause();
    video.hidden = true;
    video.style.display = "none";
    driveFrame.hidden = false;
    driveFrame.style.display = "block";
    driveFrame.src = "https://drive.google.com/file/d/" + encodeURIComponent(item.id) + "/preview";
    $("nativeControls").style.display = "none";
    $("duration").textContent = "";
    if ($("driveNotice")) {
      $("driveNotice").hidden = false;
      $("driveNotice").style.display = "flex";
      $("driveDirectLink").href = "https://drive.google.com/file/d/" + encodeURIComponent(item.id) + "/view";
    }
  }

  refresh();
  render();
  $("main").scrollIntoView({ behavior: "smooth" });
}

$("back10").onclick = () => { if (Number.isFinite(video.duration)) video.currentTime = Math.max(0, video.currentTime - 10); };
$("forward10").onclick = () => { if (Number.isFinite(video.duration)) video.currentTime = Math.min(video.duration, video.currentTime + 10); };
$("speed").onchange = e => {
  video.playbackRate = Number(e.target.value);
  state.speed = video.playbackRate;
  save();
};

$("note").oninput = () => {
  state.notes[currentLesson.id] = $("note").value;
  $("noteStatus").textContent = save() ? "Tersimpan di browser" : "Belum tersimpan";
};

$("closeCelebrate").onclick = () => {
  $("celebrate").close();
  $("note").focus();
};

function openLibrary(current = false) {
  if (current) {
    filter = "all";
    $("search").value = "";
    syncFilters();
    render();
  }
  $("library").showModal();
  document.body.style.overflow = "hidden";
  if (current) {
    const row = document.querySelector(".row.current");
    if (row) {
      let parent = row.parentElement;
      while (parent) {
        if (parent.tagName === "DETAILS") parent.open = true;
        parent = parent.parentElement;
      }
      row.scrollIntoView({ block: "center" });
    }
  }
}

$("openLibrary").onclick = () => openLibrary();
$("viewCurrent").onclick = () => openLibrary(true);
$("closeLibrary").onclick = () => $("library").close();
$("library").addEventListener("close", () => { document.body.style.overflow = ""; });
$("library").addEventListener("click", e => { if (e.target === $("library")) $("library").close(); });
$("search").oninput = render;

function syncFilters() {
  document.querySelectorAll("[data-filter]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
}

document.querySelectorAll("[data-filter]").forEach(b => b.onclick = () => {
  filter = b.dataset.filter;
  syncFilters();
  render();
});

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

async function loadLessons() {
  loadState = "loading";
  render();
  try {
    const r = await fetch("curriculum_lessons.json");
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    if (!Array.isArray(data)) throw new Error("Format tidak valid");
    lessons = data;
    loadState = "ready";
    
    // Check if initial active lesson exists in curriculum
    const matched = lessons.find(x => x.id === TODAY_ID);
    if (matched) currentLesson = matched;
  } catch {
    loadState = "error";
  }
  refresh();
  render();
}

function render() {
  const root = $("results");
  root.replaceChildren();
  if (loadState === "loading") {
    root.append(el("p", "empty", "Memuat daftar materi..."));
    return;
  }
  if (loadState === "error") {
    root.append(el("p", "empty", "Daftar materi gagal dimuat. Periksa koneksi lalu coba lagi."));
    const retry = el("button", "", "Coba lagi");
    retry.onclick = loadLessons;
    root.append(retry);
    return;
  }

  const q = $("search").value.trim().toLocaleLowerCase("id");
  const found = lessons.filter(x =>
    (x.title + " " + x.folder + " " + (x.phase_name || "")).toLocaleLowerCase("id").includes(q) &&
    (filter === "all" || (filter === "done" ? !!state.completedLessons[x.id] : !state.completedLessons[x.id]))
  );

  root.append(el("div", "result-label", found.length + " video ditampilkan"));
  if (!found.length) {
    root.append(el("p", "empty", q ? "Tidak ada judul yang cocok. Coba kata lain atau pilih Semua." : "Belum ada materi di filter ini."));
    return;
  }

  const phases = new Map();
  for (const item of found) {
    const phaseName = item.phase_name || "Materi";
    if (!phases.has(phaseName)) phases.set(phaseName, new Map());
    const folders = phases.get(phaseName);
    if (!folders.has(item.folder)) folders.set(item.folder, []);
    folders.get(item.folder).push(item);
  }

  for (const [phase, folders] of phases) {
    root.append(el("h3", "phase", phase));
    for (const [name, items] of folders) {
      const detail = el("details", "folder");
      detail.open = !!q || filter !== "all" || items.some(x => x.id === currentLesson.id);
      detail.append(el("summary", "", name + " (" + items.length + ")"));
      
      for (const item of items) {
        const done = !!state.completedLessons[item.id];
        const current = item.id === currentLesson.id;
        const isToday = item.id === TODAY_ID;
        
        const row = el("div", "row" + (done ? " completed" : "") + (current ? " current" : ""));
        if (current) row.setAttribute("aria-current", "true");
        
        // Interactive Checkmark button
        const check = el("button", "check", done ? "✓" : "");
        check.setAttribute("aria-label", done ? "Tandai belum selesai" : "Tandai selesai");
        check.title = done ? "Tandai belum selesai" : "Tandai selesai";
        check.onclick = (e) => {
          e.stopPropagation();
          state.completedLessons[item.id] = !state.completedLessons[item.id];
          if (state.completedLessons[item.id] && state.lastDate !== day()) {
            state.streak = state.lastDate === day(-1) ? state.streak + 1 : 1;
            state.lastDate = day();
          }
          save();
          refresh();
          render();
        };
        row.append(check);

        const nameEl = el("div", "row-name", item.title);
        if (isToday) nameEl.append(el("small", "", "Materi hari ini (Lokal)"));
        row.append(nameEl);

        const actions = el("div", "row-actions");
        const watchBtn = el("button", "watch-btn button small" + (current ? " primary" : ""), current ? "Sedang Diputar" : "Tonton");
        watchBtn.onclick = () => {
          $("library").close();
          setLesson(item);
        };
        actions.append(watchBtn);

        const driveA = el("a", "small", "↗");
        driveA.href = "https://drive.google.com/file/d/" + encodeURIComponent(item.id) + "/view";
        driveA.target = "_blank";
        driveA.rel = "noopener";
        driveA.title = "Buka di Google Drive";
        actions.append(driveA);

        row.append(actions);
        detail.append(row);
      }
      root.append(detail);
    }
  }
}

$("export").onclick = () => {
  const blob = new Blob([JSON.stringify({ format: "rido-study-backup", version: 1, state }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url;
  a.download = "rido-belajar-" + day() + ".json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("backupStatus").textContent = "Cadangan disiapkan untuk diunduh.";
};

$("import").onclick = () => $("importFile").click();
$("importFile").onchange = async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    if (file.size > 5000000) throw new Error();
    const data = JSON.parse(await file.text());
    if (data.format !== "rido-study-backup" || data.version !== 1 || !data.state || typeof data.state !== "object" || Array.isArray(data.state)) throw new Error();
    if (!confirm("Pulihkan cadangan ini? Progres digabung. Catatan untuk materi yang sama diganti dari cadangan.")) return;
    const incoming = clean(data.state);
    for (const k of ["notes", "positions", "watched"]) state[k] = { ...state[k], ...incoming[k] };
    for (const [id, done] of Object.entries(incoming.completedLessons)) if (done === true) state.completedLessons[id] = true;
    if (incoming.lastDate > state.lastDate) { state.lastDate = incoming.lastDate; state.streak = incoming.streak; }
    storageReadFailed = false;
    const saved = save();
    if (saved) $("storageWarning").hidden = true;
    $("note").value = typeof state.notes[currentLesson.id] === "string" ? state.notes[currentLesson.id] : "";
    refresh();
    render();
    $("backupStatus").textContent = saved ? "Cadangan berhasil dipulihkan." : "Data dipulihkan sementara, tetapi browser tidak bisa menyimpannya.";
  } catch {
    $("backupStatus").textContent = "File tidak valid. Pilih cadangan JSON dari Ruang Belajar.";
  } finally {
    e.target.value = "";
  }
};

window.addEventListener("pagehide", save);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) save();
  else refresh();
});

$("note").value = typeof state.notes[TODAY_ID] === "string" ? state.notes[TODAY_ID] : "";

refresh();
loadLessons();

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if ($("celebrate").open) { e.preventDefault(); $("celebrate").close(); }
    else if ($("library").open) { e.preventDefault(); $("library").close(); }
  }
});
