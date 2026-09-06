// ----- Live clock strip (Jhansi + 4 world cities) -----
const CITIES = [
  { label: "Jhansi", tz: "Asia/Kolkata" },
  { label: "London", tz: "Europe/London" },
  { label: "New York", tz: "America/New_York" },
  { label: "Tokyo", tz: "Asia/Tokyo" },
  { label: "Dubai", tz: "Asia/Dubai" },
];

function renderClocks() {
  const strip = document.getElementById("clockStrip");
  if (!strip) return;
  strip.innerHTML = CITIES.map((c) => {
    const time = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: c.tz,
    }).format(new Date());
    return `<div class="clock"><span class="clock-city">${c.label}</span><span class="clock-time">${time}</span></div>`;
  }).join("");
}
renderClocks();
setInterval(renderClocks, 1000);

// ----- REST API demo: live public repo count from GitHub -----
// Replace with your real GitHub username to make this go live.
const GITHUB_USERNAME = "yourusername";

(async function loadRepoBadge() {
  const badge = document.getElementById("repoBadge");
  if (!badge || GITHUB_USERNAME === "yourusername") return;
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!res.ok) throw new Error("GitHub request failed");
    const data = await res.json();
    badge.textContent = `🔧 ${data.public_repos} public repos on GitHub`;
  } catch (err) {
    badge.textContent = "";
  }
})();

// ----- Mobile nav toggle -----
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ----- Scroll reveal -----
const revealEls = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

// ----- Active nav link on scroll -----
const navItems = document.querySelectorAll(".nav-link");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((n) => n.classList.remove("active"));
      document.querySelector(`.nav-link[href="#${entry.target.id}"]`)?.classList.add("active");
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("section[id], header[id]").forEach((sec) => navObserver.observe(sec));

// ----- Footer year -----
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
