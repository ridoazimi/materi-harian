const polish = document.createElement("style");
polish.textContent = ".drawer-head label{display:block;margin-bottom:9px}.check{border-color:#7b8075}body{padding-bottom:env(safe-area-inset-bottom,0px)}";
document.head.append(polish);
polish.textContent += ".sr{top:8px;left:8px;transform:translateY(-200%)}.sr:focus-visible{transform:none}@media(min-width:801px){.intro{padding:32px 0 28px}.intro h1{font-size:44px}}";
const KEY = "rido_study_hub_v2";
const LESSON = "1gBTwktXAuxhnDnsS1W-2KmZJqtnlNump";
const $ = id => document.getElementById(id);
const video = $("mainVideo");
let lessons = [], filter = "all", loadState = "loading", state, lastTime = null, lastWall = null, lastSave = 0;
function clean(raw) {
  const s = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  for (const k of ["completedLessons", "positions", "notes", "watched"]) if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k])) s[k] = {};
  s.streak = Number.isFinite(s.streak) && s.streak >= 0 ? Math.floor(s.streak) : 0;
  s.lastDate = typeof s.lastDate === "string" ? s.lastDate : "";
  return s;
}
let storageReadFailed = false;
try { state = clean(JSON.parse(localStorage.getItem(KEY) || "{}")); }
catch { state = clean({}); storageReadFailed = true; $("storageWarning").hidden = false; $("storageWarning").textContent = "Data tersimpan tidak bisa dibaca. Data asli tidak ditimpa. Pulihkan dari cadangan untuk melanjutkan."; }
function save() {
  if (storageReadFailed) return false;
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
  catch { $("storageWarning").hidden = false; $("storageWarning").textContent = "Browser tidak bisa menyimpan progres. Unduh cadangan sebelum menutup halaman."; return false; }
}
function day(offset = 0) { const d = new Date(); d.setDate(d.getDate() + offset); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,"0"), String(d.getDate()).padStart(2,"0")].join("-"); }
function refresh() {
  const streak = [day(), day(-1)].includes(state.lastDate) ? state.streak : 0;
  $("streakCount").textContent = streak;
  $("streakLabel").setAttribute("aria-label", streak + " hari belajar berturut-turut");
  const total = lessons.length, count = lessons.filter(x => state.completedLessons[x.id]).length;
  $("totalProgress").value = total ? count / total * 100 : 0;
  $("totalLabel").textContent = loadState === "error" ? "Kurikulum belum termuat. Buka kurikulum untuk mencoba lagi." : total ? count + " dari " + total + " video selesai" : "Memuat kurikulum...";
  if (state.completedLessons[LESSON]) { $("watchStatus").textContent = "Selesai ditonton. Progres tercatat."; $("watchStatus").className = "done"; }
  else { $("watchStatus").textContent = "Checklist otomatis setelah video selesai."; $("watchStatus").className = ""; }
  updateWatch();
}
function ranges() { return Array.isArray(state.watched[LESSON]) ? state.watched[LESSON].filter(r => Array.isArray(r) && r.length === 2 && r.every(Number.isFinite) && r[0] >= 0 && r[1] > r[0]) : []; }
function addRange(a,b) {
  const rs = [...ranges(), [Math.max(0,a),Math.min(video.duration,b)]].sort((x,y)=>x[0]-y[0]), out = [];
  for (const r of rs) { const prev = out[out.length-1]; if (prev && r[0] <= prev[1] + .3) prev[1] = Math.max(prev[1],r[1]); else out.push(r); }
  state.watched[LESSON] = out;
}
function coverage() { return Number.isFinite(video.duration) && video.duration > 0 ? Math.min(1,ranges().reduce((n,r)=>n+r[1]-r[0],0)/video.duration) : 0; }
function updateWatch() { $("watchPercent").textContent = (state.completedLessons[LESSON] ? 100 : Math.floor(coverage()*100)) + "% ditonton"; }
function resetClock() { lastTime = video.currentTime; lastWall = performance.now(); }
video.addEventListener("playing",resetClock);
video.addEventListener("seeking",()=>{lastTime=null;lastWall=null;});
video.addEventListener("seeked",resetClock);
video.addEventListener("timeupdate",()=>{
 const now=performance.now(), t=video.currentTime;
 if (!video.paused && !video.seeking && lastTime!==null && lastWall!==null) {
   const delta=t-lastTime, allowed=(now-lastWall)/1000*video.playbackRate + .6;
   if(delta>0 && delta<=allowed && delta<10) addRange(lastTime,t);
 }
 lastTime=t;lastWall=now;state.positions[LESSON]=t;updateWatch();
 if(now-lastSave>4000){save();lastSave=now;}
});
video.addEventListener("pause",save);
video.addEventListener("loadedmetadata",()=>{
 $("duration").textContent=Math.ceil(video.duration/60)+" menit";
 const position=Number(state.positions[LESSON]);
 if(position>0 && position<video.duration-3) video.currentTime=position;
 $("videoError").hidden=true;
 const rate=Number(state.speed);if([1,1.25,1.5,2].includes(rate)){video.playbackRate=rate;$("speed").value=String(rate);}
 updateWatch();
});
video.addEventListener("error",()=>{$("videoError").hidden=false;});
$("retryVideo").onclick=()=>video.load();
video.addEventListener("ended",()=>{
 if(state.completedLessons[LESSON])return;
 if(coverage()<.98){$("watchStatus").textContent="Ada bagian yang terlewat. Tonton bagian itu agar checklist tercatat.";save();return;}
 state.completedLessons[LESSON]=true;
 if(state.lastDate!==day()){state.streak=state.lastDate===day(-1)?state.streak+1:1;state.lastDate=day();}
 save();refresh();render();
 $("celebrateText").textContent="18. Bakar sudah tercatat selesai. Streak: "+state.streak+" hari. Sekarang, simpan satu tindakan dari materi ini.";
 $("celebrate").showModal();
});
$("back10").onclick=()=>{if(Number.isFinite(video.duration))video.currentTime=Math.max(0,video.currentTime-10);};
$("forward10").onclick=()=>{if(Number.isFinite(video.duration))video.currentTime=Math.min(video.duration,video.currentTime+10);};
$("speed").onchange=e=>{video.playbackRate=Number(e.target.value);state.speed=video.playbackRate;save();};
$("note").value=typeof state.notes[LESSON]==="string"?state.notes[LESSON]:"";
$("note").oninput=()=>{state.notes[LESSON]=$("note").value;$("noteStatus").textContent=save()?"Tersimpan di browser":"Belum tersimpan";};
$("closeCelebrate").onclick=()=>{$("celebrate").close();$("note").focus();};
function openLibrary(current=false){
 if(current){filter="all";$("search").value="";syncFilters();render();}
 $("library").showModal();document.body.style.overflow="hidden";
 if(current){const row=document.querySelector(".row.current");if(row){let parent=row.parentElement;while(parent){if(parent.tagName==="DETAILS")parent.open=true;parent=parent.parentElement;}row.scrollIntoView({block:"center"});}}
}
$("openLibrary").onclick=()=>openLibrary();$("viewCurrent").onclick=()=>openLibrary(true);
$("closeLibrary").onclick=()=>$("library").close();
$("library").addEventListener("close",()=>{document.body.style.overflow="";});
$("library").addEventListener("click",e=>{if(e.target===$("library"))$("library").close();});
$("search").oninput=render;
function syncFilters(){document.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter===filter)));}
document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;syncFilters();render();});
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
async function loadLessons(){
 loadState="loading";render();
 try{const r=await fetch("curriculum_lessons.json");if(!r.ok)throw new Error("HTTP "+r.status);const data=await r.json();if(!Array.isArray(data)||!data.every(x=>[x.id,x.title,x.folder,x.phase_name].every(v=>typeof v==="string")))throw new Error("Format tidak valid");lessons=data;loadState="ready";}
 catch{loadState="error";}refresh();render();
}
function render(){
 const root=$("results");root.replaceChildren();
 if(loadState==="loading"){root.append(el("p","empty","Memuat daftar materi..."));return;}
 if(loadState==="error"){root.append(el("p","empty","Daftar materi gagal dimuat. Periksa koneksi lalu coba lagi."));const retry=el("button","","Coba lagi");retry.onclick=loadLessons;root.append(retry);return;}
 const q=$("search").value.trim().toLocaleLowerCase("id");
 const found=lessons.filter(x=>(x.title+" "+x.folder+" "+x.phase_name).toLocaleLowerCase("id").includes(q)&&(filter==="all"||(filter==="done"?!!state.completedLessons[x.id]:!state.completedLessons[x.id])));
 root.append(el("div","result-label",found.length+" video ditampilkan"));
 if(!found.length){root.append(el("p","empty",q?"Tidak ada judul yang cocok. Coba kata lain atau pilih Semua.":"Belum ada materi di filter ini."));return;}
 const phases=new Map();for(const item of found){if(!phases.has(item.phase_name))phases.set(item.phase_name,new Map());const folders=phases.get(item.phase_name);if(!folders.has(item.folder))folders.set(item.folder,[]);folders.get(item.folder).push(item);}
 for(const [phase,folders] of phases){root.append(el("h3","phase",phase));for(const [name,items]of folders){const detail=el("details","folder");detail.open=!!q||filter!=="all"||items.some(x=>x.id===LESSON);detail.append(el("summary","",name+" ("+items.length+")"));for(const item of items){const done=!!state.completedLessons[item.id], current=item.id===LESSON;const row=el("div","row"+(done?" completed":"")+(current?" current":""));if(current)row.setAttribute("aria-current","true");const check=el("span","check",done?"✓":"");check.setAttribute("aria-label",done?"Selesai":"Belum selesai");row.append(check);const nameEl=el("div","row-name",item.title);if(current)nameEl.append(el("small","","Materi hari ini"));row.append(nameEl);const a=el("a","",current?"Tonton":"Drive");a.href=current?"#main":"https://drive.google.com/file/d/"+encodeURIComponent(item.id)+"/view";a.setAttribute("aria-label",(current?"Tonton ":"Buka di Drive: ")+item.title);if(current)a.onclick=()=>{$("library").close();video.focus();};else{a.target="_blank";a.rel="noopener";}row.append(a);detail.append(row);}root.append(detail);}}
}
$("export").onclick=()=>{const blob=new Blob([JSON.stringify({format:"rido-study-backup",version:1,state},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob), a=document.createElement("a");a.href=url;a.download="rido-belajar-"+day()+".json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$("backupStatus").textContent="Cadangan disiapkan untuk diunduh.";};
$("import").onclick=()=>$("importFile").click();
$("importFile").onchange = async e => {
 const file = e.target.files[0]; if (!file) return;
 try {
  if (file.size > 5000000) throw new Error();
  const data = JSON.parse(await file.text());
  if(data.format!=="rido-study-backup"||data.version!==1||!data.state||typeof data.state!=="object"||Array.isArray(data.state)) throw new Error();
  if(!confirm("Pulihkan cadangan ini? Progres digabung. Catatan untuk materi yang sama diganti dari cadangan.")) return;
  const incoming = clean(data.state);
  for(const k of ["notes","positions","watched"]) state[k]={...state[k],...incoming[k]};
  for(const [id,done] of Object.entries(incoming.completedLessons)) if(done===true) state.completedLessons[id]=true;
  if(incoming.lastDate>state.lastDate){state.lastDate=incoming.lastDate;state.streak=incoming.streak;}
  storageReadFailed=false;
  const saved=save(); if(saved) $("storageWarning").hidden=true;
  $("note").value=typeof state.notes[LESSON]==="string"?state.notes[LESSON]:"";
  refresh();render();
  $("backupStatus").textContent=saved?"Cadangan berhasil dipulihkan.":"Data dipulihkan sementara, tetapi browser tidak bisa menyimpannya.";
 } catch { $("backupStatus").textContent="File tidak valid. Pilih cadangan JSON dari Ruang Belajar."; }
 finally {e.target.value="";}
};

window.addEventListener("pagehide",save);
document.addEventListener("visibilitychange",()=>{if(document.hidden)save();else refresh();});
$("todayDate").textContent=new Intl.DateTimeFormat("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date());
refresh();loadLessons();

document.addEventListener("keydown",e=>{if(e.key==="Escape"){if($("celebrate").open){e.preventDefault();$("celebrate").close();}else if($("library").open){e.preventDefault();$("library").close();}}});
