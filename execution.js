(() => {
const host = document.createElement("section");
host.className = "execution";
host.setAttribute("aria-labelledby", "actionTitle");
host.innerHTML = `<div class="exec-heading"><div><div class="eyebrow">Dari materi ke aksi</div><h2 id="actionTitle">Satu langkah nyata.</h2></div><span id="execSaved" class="small" role="status">Tersimpan di browser</span></div><p class="small">Alat bantu praktik pribadi, bukan kutipan atau framework resmi dari video.</p><div class="exec-tabs" role="group" aria-label="Langkah eksekusi"><button data-step="0">01 · Tentukan</button><button data-step="1">02 · Kerjakan</button><button data-step="2">03 · Buktikan</button></div><progress id="execProgress" max="3" value="0" aria-label="Progres eksekusi"></progress><div id="execPanel"></div><p class="foot">Status praktik terpisah dari checklist menonton. Tidak ada langkah yang ditandai selesai otomatis.</p>`;
document.querySelector(".notes").before(host);
const css = document.createElement("style");
css.textContent = `.execution{margin:28px 0;padding:24px;border:1px solid #d8d7ce;border-radius:16px;background:#fffdf8}.exec-heading{display:flex;gap:16px;align-items:start;justify-content:space-between}.exec-heading h2{margin:8px 0}.exec-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:22px}.exec-tabs button{padding:12px 4px;font-size:12px;min-width:0}.exec-tabs [aria-pressed=true]{background:#282d25;color:white;border-color:#282d25}.execution progress{width:100%;height:5px;accent-color:#a94e30;margin:18px 0}.exec-panel{animation:execEnter .25s ease-out}.exec-panel label{display:block;font-size:14px;font-weight:600;margin:18px 0 8px}.exec-panel input,.exec-panel textarea{box-sizing:border-box;width:100%;padding:13px;border:1px solid #a4a69d;border-radius:8px;background:white;font:inherit;min-height:46px}.exec-panel textarea{min-height:90px}.exec-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.exec-timer{font-size:64px;line-height:1.2;font-variant-numeric:tabular-nums;letter-spacing:-3px;margin:22px 0 8px}.exec-task{padding:14px 16px;border-left:3px solid #a94e30;background:#f4eee4;overflow-wrap:anywhere}.exec-chips{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}.exec-chips button[aria-pressed=true]{border-color:#a94e30;background:#f4eee4}.exec-success{border-left:3px solid #35704b;padding:12px 16px;background:#eef5ee;margin-top:16px;animation:execEnter .3s ease-out}.exec-error{color:#913516;min-height:24px}.execution [hidden]{display:none!important}.exec-panel button:disabled{opacity:.55;cursor:not-allowed}@keyframes execEnter{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){.execution{padding:18px 14px}.exec-heading{display:block}.exec-heading>span{display:block;margin-top:8px}.exec-tabs button{font-size:11px}.exec-timer{font-size:56px}}@media(prefers-reduced-motion:reduce){.exec-panel,.exec-success{animation:none}}`;
document.head.append(css);
const defaults = () => ({step:0,insight:"",action:"",proof:"",minutes:10,remaining:600,deadline:null,started:false,done:false});
function current(){
 if(!state.execution||typeof state.execution!=="object"||Array.isArray(state.execution))state.execution={};
 const raw=state.execution[LESSON];
 if(!raw||typeof raw!=="object")state.execution[LESSON]=defaults();
 return state.execution[LESSON];
}
function persist(){document.getElementById("execSaved").textContent=save()?"Tersimpan di browser":"Belum tersimpan. Unduh cadangan.";}
const panel=document.getElementById("execPanel");
function remaining(s){return s.deadline?Math.max(0,Math.ceil((s.deadline-Date.now())/1000)):Math.max(0,Number(s.remaining)||0);}
function tick(){const s=current(), t=remaining(s), clock=document.getElementById("execClock");if(clock)clock.textContent=String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0");if(s.deadline&&t===0){s.deadline=null;s.remaining=0;persist();render();}}
function error(text){document.getElementById("execError").textContent=text;}
function render(){
 const s=current();s.step=[0,1,2].includes(s.step)?s.step:0;
 host.querySelectorAll("[data-step]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.step)===s.step)));
 document.getElementById("execProgress").value=s.done?3:s.started?2:s.action?.trim()?1:0;
 panel.className="exec-panel";
 if(s.step===0){panel.innerHTML=`<h3>Apa yang mau kamu ubah?</h3><label for="execInsight">Satu hal yang kamu pahami</label><textarea id="execInsight" maxlength="2000" placeholder="Menurut saya, hal yang perlu saya ubah adalah..."></textarea><label for="execAction">Satu aksi yang bisa dikerjakan sekarang</label><input id="execAction" maxlength="300" placeholder="Contoh: tulis tiga prioritas untuk besok"><p class="small">Pilih aksi yang ada hasilnya. Bukan sekadar “lebih semangat”.</p><div id="execError" class="exec-error" role="status"></div><div class="exec-actions"><button id="execNext" class="primary">Siapkan sesi fokus →</button></div>`;
 document.getElementById("execInsight").value=s.insight||"";document.getElementById("execAction").value=s.action||"";
 for(const [id,key] of [["execInsight","insight"],["execAction","action"]])document.getElementById(id).oninput=e=>{s[key]=e.target.value;s.done=false;persist();};
 document.getElementById("execNext").onclick=()=>{if(!(s.action||"").trim()){error("Tulis satu aksi konkret terlebih dahulu.");document.getElementById("execAction").focus();return;}s.step=1;persist();render();};
 }else if(s.step===1){panel.innerHTML=`<h3>Kerjakan satu hal ini.</h3><div class="exec-task" id="execTask"></div><div class="exec-chips" role="group" aria-label="Durasi fokus"><button data-min="5">5 menit</button><button data-min="10">10 menit</button><button data-min="15">15 menit</button></div><div class="exec-timer" id="execClock" aria-label="Sisa waktu fokus"></div><p class="small" id="execTimerHelp"></p><div id="execError" class="exec-error" role="status"></div><div class="exec-actions"><button id="execToggle" class="primary"></button><button id="execToProof">Catat hasil →</button></div>`;
 document.getElementById("execTask").textContent=s.action||"Belum ada aksi. Kembali ke Tentukan.";
 document.getElementById("execTimerHelp").textContent=remaining(s)===0?"Waktu habis. Catat hasilnya; eksekusi belum otomatis selesai.":"Timer berjalan selama sesi aktif, termasuk saat tab ditinggalkan. Jeda jika perlu.";
 host.querySelectorAll("[data-min]").forEach(b=>{b.setAttribute("aria-pressed",String(Number(b.dataset.min)===s.minutes));b.disabled=!!s.deadline;b.onclick=()=>{s.minutes=Number(b.dataset.min);s.remaining=s.minutes*60;persist();render();};});
 document.getElementById("execToggle").textContent=s.deadline?"Jeda":remaining(s)===0?"Ulangi sesi":"Mulai fokus";
 document.getElementById("execToggle").onclick=()=>{if(!(s.action||"").trim()){error("Tentukan aksi terlebih dahulu pada langkah 01.");return;}if(s.deadline){s.remaining=remaining(s);s.deadline=null;}else{s.remaining=remaining(s)||s.minutes*60;s.deadline=Date.now()+s.remaining*1000;s.started=true;}persist();render();};
 document.getElementById("execToProof").onclick=()=>{s.step=2;persist();render();};tick();
 }else{panel.innerHTML=`<h3>Apa hasil nyatanya?</h3><div class="exec-task" id="execTask"></div><label for="execProof">Bukti hasil atau hal yang sudah berubah</label><textarea id="execProof" maxlength="4000" placeholder="Saya sudah... Hasilnya..."></textarea><p class="small">Tulis hasil, angka, atau tautan bukti. Boleh catat hasil parsial tanpa menandainya selesai.</p><div id="execError" class="exec-error" role="status"></div><div class="exec-actions"><button id="execFinish" class="primary">Tandai aksi sudah dikerjakan</button><button id="execCopy">Salin rencana & hasil</button></div><div id="execDone" class="exec-success" role="status" hidden>Aksi tercatat selesai. Hasilnya tersimpan untuk kamu baca kembali.</div>`;
 document.getElementById("execTask").textContent=s.action||"Belum ada aksi yang ditentukan.";document.getElementById("execProof").value=s.proof||"";document.getElementById("execDone").hidden=!s.done;
 document.getElementById("execProof").oninput=e=>{s.proof=e.target.value;s.done=false;document.getElementById("execDone").hidden=true;persist();};
 document.getElementById("execFinish").onclick=()=>{if(!(s.action||"").trim()||!(s.proof||"").trim()){error("Isi aksi di langkah 01 dan hasil nyata sebelum menandai selesai.");return;}s.remaining=remaining(s);s.deadline=null;s.done=true;s.completedAt=new Date().toISOString();persist();render();};
 document.getElementById("execCopy").onclick=async()=>{try{await navigator.clipboard.writeText(["Materi: 18. Bakar","Pemahaman: "+(s.insight||""),"Aksi: "+(s.action||""),"Hasil: "+(s.proof||"")].join("\n"));error("Rencana dan hasil berhasil disalin.");}catch{error("Browser menolak akses clipboard. Salin teks isian secara manual.");}};
 }
}
host.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{current().step=Number(b.dataset.step);persist();render();});
const previousImport=document.getElementById("importFile").onchange;
document.getElementById("importFile").onchange=async e=>{const file=e.target.files[0];await previousImport(e);if(file&&document.getElementById("backupStatus").textContent==="Cadangan berhasil dipulihkan."){try{const data=JSON.parse(await file.text());if(data.state.execution&&typeof data.state.execution==="object"&&!Array.isArray(data.state.execution)){state.execution={...state.execution,...data.state.execution};persist();render();}}catch{}}};
render();setInterval(tick,1000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)tick();});
})();

document.getElementById("importFile").addEventListener("change",()=>{document.getElementById("backupStatus").textContent="";},true);
new MutationObserver(()=>{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.getElementById("execPanel").animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"translateY(0)"}],{duration:220,easing:"ease-out"});}).observe(document.getElementById("execPanel"),{childList:true});
