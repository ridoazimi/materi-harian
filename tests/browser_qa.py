import asyncio,json
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(args=["--no-sandbox"]);page=await b.new_page(viewport={"width":390,"height":844});errors=[];page.on("pageerror",lambda e:errors.append(str(e)))
  await page.goto("http://127.0.0.1:8767");await page.wait_for_function("lessons.length===656")
  await page.click("#openLibrary");await page.fill("#search","bakar");assert await page.locator(".row").count()==2
  await page.fill("#search","zzzzunfindable");assert "Tidak ada" in await page.inner_text("#results")
  await page.keyboard.press("Escape");await page.wait_for_function("!library.open")
  await page.fill("#note","Tes catatan personal");await page.reload();assert await page.input_value("#note")=="Tes catatan personal"
  await page.wait_for_function("video.readyState>=2");await page.select_option("#speed","1.5");assert await page.evaluate("video.playbackRate")==1.5
  await page.click("#forward10");await page.wait_for_function("video.currentTime>=9.9")
  await page.evaluate("video.dispatchEvent(new Event(`ended`))");assert not await page.evaluate("!!state.completedLessons[LESSON]")
  await page.evaluate("state.watched[LESSON]=[[0,video.duration]];video.dispatchEvent(new Event(`ended`))");assert await page.locator("#celebrate").is_visible();assert await page.evaluate("state.streak")==1
  await page.click("#closeCelebrate");await page.reload();await page.wait_for_function("lessons.length===656");assert await page.evaluate("!!state.completedLessons[LESSON]")
  await page.click("#openLibrary");await page.click("[data-filter=done]");assert await page.locator(".row").count()==1;await page.keyboard.press("Escape")
  async with page.expect_download() as info:await page.click("#export")
  dl=await info.value;assert dl.suggested_filename.endswith(".json")
  await page.set_viewport_size({"width":1440,"height":1000});await page.screenshot(path="/opt/data/ruang-belajar-desktop.png",full_page=True)
  for width in [320,375,390,430,768,1440]:
   await page.set_viewport_size({"width":width,"height":900});assert await page.evaluate("document.documentElement.scrollWidth<=innerWidth"),width
  await page.route("**/curriculum_lessons.json",lambda r:r.abort());await page.reload();await page.click("#openLibrary");await page.wait_for_function("loadState===`error`");assert "gagal" in await page.inner_text("#results")
  await page.unroute("**/curriculum_lessons.json");await page.get_by_role("button",name="Coba lagi",exact=True).last.click();await page.wait_for_function("lessons.length===656")
  assert not errors,errors
  print(json.dumps({"passed":["656 lessons","6 viewport widths","drawer escape","search matches/empty","notes persist","speed","seek","skip cannot complete","completion/streak simulated","progress persists","completed filter","backup download","fetch error/retry"],"page_errors":errors}));await b.close()
asyncio.run(main())
