// ===== Image placeholders: show the gradient when an image file is missing =====
document.querySelectorAll(".ph img").forEach((img) => {
  const markMissing = () => img.parentElement.classList.add("img-missing");
  if (img.complete && img.naturalWidth === 0) markMissing();
  img.addEventListener("error", markMissing);
});

// ===== Header background on scroll =====
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

// ===== Active nav link while scrolling =====
const links = document.querySelectorAll(".nav__link");
const sections = ["projects", "about"].map((id) => document.getElementById(id));
window.addEventListener("scroll", () => {
  let current = "top";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
}, { passive: true });

// ===== Theme toggle (remembered between visits) =====
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}
document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// ===== Hero slider =====
const slides = document.querySelectorAll(".hero__slide");
const dots = document.querySelectorAll(".dot");
let index = 0;
let timer;

function showSlide(i) {
  slides[index].classList.remove("active");
  dots[index].classList.remove("active");
  index = (i + slides.length) % slides.length;
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}
function startAuto() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(index + 1), 5000);
}
dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); startAuto(); }));
startAuto();

// ===== Project filters =====
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const emptyState = document.getElementById("emptyState");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((f) => f.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    let shown = 0;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.classList.toggle("hide", !match);
      if (match) shown++;
    });
    emptyState.hidden = shown > 0;
  });
});

// ===== Scroll reveal =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Trailer modal =====
const modal = document.getElementById("trailerModal");
document.getElementById("trailerBtn").addEventListener("click", () => (modal.hidden = false));
document.getElementById("modalClose").addEventListener("click", () => (modal.hidden = true));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.hidden = true; });

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
