const $ = (s) => document.querySelector(s);
const display = $("#timerDisplay");
const startBtn = $("#startBtn");
const resetBtn = $("#resetBtn");
const wakeToggle = $("#wakeToggle");
const wakeStatus = $("#wakeStatus");
const wakeHint = $("#wakeHint");
const customMinutes = $("#customMinutes");
const timerMessage = $("#timerMessage");
const themeToggle = $("#themeToggle");
const fullscreenToggle = $("#fullscreenToggle");

let selectedSeconds = 25 * 60;
let remaining = selectedSeconds;
let running = false;
let interval = null;
let wakeLock = null;

function applyTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light", isLight);
  document.body.classList.toggle("dark", !isLight);
  themeToggle.textContent = isLight ? "☾" : "☀";
  const nextLabel = isLight ? "Switch to dark mode" : "Switch to light mode";
  themeToggle.setAttribute("aria-label", nextLabel);
  themeToggle.title = nextLabel;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isLight ? "#f4f1eb" : "#111315");
}

function updateFullscreenState() {
  const isFullscreen = Boolean(document.fullscreenElement);
  document.body.classList.toggle("fullscreen", isFullscreen);
  fullscreenToggle.textContent = isFullscreen ? "×" : "⛶";
  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
  fullscreenToggle.setAttribute("aria-label", label);
  fullscreenToggle.title = label;
}

fullscreenToggle.addEventListener("click", async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }
  await document.documentElement.requestFullscreen();
});
document.addEventListener("fullscreenchange", updateFullscreenState);

const savedTheme = localStorage.getItem("omerta-theme");
applyTheme(savedTheme === "light" ? "light" : "dark");
themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
  localStorage.setItem("omerta-theme", nextTheme);
  applyTheme(nextTheme);
});

function updateClock() {
  const d = new Date();
  const s = d.getSeconds();
  const m = d.getMinutes() + s / 60;
  const h = (d.getHours() % 12) + m / 60;
  $("#secondHand").style.transform = `rotate(${s * 6}deg)`;
  $("#minuteHand").style.transform = `rotate(${m * 6}deg)`;
  $("#hourHand").style.transform = `rotate(${h * 30}deg)`;
}
updateClock();
setInterval(updateClock, 1000);

function renderTimer() {
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  display.textContent = `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
  document.title = running ? `${display.textContent} · Omerta Focus Timer` : "Omerta Focus Timer";
  document.body.classList.toggle("timer-running", running);
}
function stopTimer() {
  running = false;
  clearInterval(interval);
  interval = null;
  startBtn.textContent = remaining === 0 ? "Start again" : "Start";
  document.body.classList.remove("timer-running");
}
function startTimer() {
  if (remaining <= 0) remaining = selectedSeconds;
  running = true;
  startBtn.textContent = "Pause";
  timerMessage.textContent = "";
  renderTimer();
  let next = Date.now() + remaining * 1000;
  interval = setInterval(() => {
    remaining = Math.max(0, Math.ceil((next - Date.now()) / 1000));
    renderTimer();
    if (remaining <= 0) {
      stopTimer();
      timerMessage.textContent = "Focus session complete.";
      try { new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=").play(); } catch(e) {}
    }
  }, 250);
}
startBtn.addEventListener("click", () => running ? stopTimer() : startTimer());
resetBtn.addEventListener("click", () => {
  stopTimer(); remaining = selectedSeconds; timerMessage.textContent = ""; renderTimer();
});

document.querySelectorAll(".preset").forEach(btn => {
  btn.addEventListener("click", () => {
    stopTimer();
    document.querySelectorAll(".preset").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSeconds = Number(btn.dataset.minutes) * 60;
    remaining = selectedSeconds;
    timerMessage.textContent = "";
    renderTimer();
  });
});
$("#setCustom").addEventListener("click", () => {
  const n = Math.floor(Number(customMinutes.value));
  if (!Number.isFinite(n) || n < 1 || n > 999) {
    timerMessage.textContent = "Choose between 1 and 999 minutes.";
    return;
  }
  stopTimer();
  document.querySelectorAll(".preset").forEach(b => b.classList.remove("active"));
  selectedSeconds = n * 60; remaining = selectedSeconds;
  timerMessage.textContent = ""; renderTimer();
});

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) {
    wakeToggle.checked = false;
    wakeHint.textContent = "Wake Lock is not supported by this browser.";
    return;
  }
  try {
    wakeLock = await navigator.wakeLock.request("screen");
    wakeStatus.classList.add("on");
    wakeHint.textContent = "Screen will stay awake while this page is visible.";
    wakeLock.addEventListener("release", () => wakeStatus.classList.remove("on"));
  } catch (err) {
    wakeToggle.checked = false;
    wakeStatus.classList.remove("on");
    wakeHint.textContent = "Could not keep the screen awake.";
  }
}
async function releaseWakeLock() {
  if (wakeLock) { await wakeLock.release(); wakeLock = null; }
  wakeStatus.classList.remove("on");
  wakeHint.textContent = "Prevent your display from sleeping while you study.";
}
wakeToggle.addEventListener("change", () => wakeToggle.checked ? requestWakeLock() : releaseWakeLock());
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && wakeToggle.checked && !wakeLock) requestWakeLock();
});
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "f" && !event.ctrlKey && !event.metaKey && !event.altKey && event.target.tagName !== "INPUT") {
    event.preventDefault();
    fullscreenToggle.click();
  }
});
renderTimer();
