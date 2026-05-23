document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SOLID ON SCROLL ──────────────────────────────────
  const nav = document.getElementById('nav');
  const nls = document.querySelectorAll('.nl');
  const secs = document.querySelectorAll('section[id]');

  const tickNav = () => {
    const y = window.scrollY;
    nav.classList.toggle('solid', y > 50);

    let cur = '';
    secs.forEach(s => {
      if (y + 120 >= s.offsetTop) cur = s.id;
    });
    nls.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
  };

  window.addEventListener('scroll', tickNav, { passive: true });
  tickNav();

  // ── MOBILE HAMBURGER ─────────────────────────────────────
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');

  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMenu.classList.remove('mobile-open'));
    });
  }

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // ── PRINT CV ─────────────────────────────────────────────
  ['navCV', 'cvAbout'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => window.print());
  });

  // ── CONTACT FORM ─────────────────────────────────────────
  const toast = (msg, type = 'ok') => {
    const box = document.getElementById('toasts');
    if (!box) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    box.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 450);
    }, 4000);
  };

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const payload = {
        name:    document.getElementById('cfName').value.trim(),
        email:   document.getElementById('cfEmail').value.trim(),
        subject: document.getElementById('cfSubject').value.trim(),
        message: document.getElementById('cfMsg').value.trim(),
        at:      new Date().toISOString(),
      };
      try {
        const key = 'jakub_pabis_inquiries';
        const arr = JSON.parse(localStorage.getItem(key) || '[]');
        arr.push(payload);
        localStorage.setItem(key, JSON.stringify(arr));
        toast('Message sent — Jakub will be in touch shortly.', 'ok');
        form.reset();
      } catch {
        toast('Could not send. Please email directly.', 'err');
      }
    });
  }

  // ── FOOTER YEAR ───────────────────────────────────────────
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

});
