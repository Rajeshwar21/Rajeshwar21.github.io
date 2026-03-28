// ── Typed text animation ──────────────────────────────────────────────────────
const phrases = [
  'Senior AI/ML Engineer',
  'Generative AI Specialist',
  'LLM Systems Architect',
  'Multi-Agent Builder',
  'RAG Pipeline Engineer',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const el = document.getElementById('typedText');

function type() {
  if (!el) return;
  const current = phrases[phraseIndex];
  if (deleting) {
    el.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
  } else {
    el.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  }
  setTimeout(type, deleting ? 40 : 70);
}

type();

// ── Navbar scroll shrink ──────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(13,13,20,0.97)';
  } else {
    nav.style.background = 'rgba(13,13,20,0.85)';
  }
});

// ── Mobile menu ───────────────────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('navMobile').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navMobile').classList.remove('open');
}

// ── Fade-up on scroll ─────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.skill-group, .timeline-card, .stat-card, .cert-card, .contact-card, .blog-coming-soon'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── Active nav link highlight ─────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});
