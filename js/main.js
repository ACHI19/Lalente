'use strict';

/* ============================================
   DATI: elenco funzionalità (renderizzate dinamicamente
   per evitare duplicazione di markup nel file HTML)
   ============================================ */
const FEATURES = [
  { title: 'Pagine di atterraggio', text: 'Crea landing page ad alta conversione per ogni tua campagna.', icon: 'layout' },
  { title: 'Sondaggi interattivi', text: 'Raccogli dati sui tuoi visitatori e personalizza l’offerta.', icon: 'chat' },
  { title: 'Countdown dinamici', text: 'Aggiungi urgenza reale a qualsiasi promozione.', icon: 'clock' },
  { title: 'Corsi online', text: 'Trasforma la tua conoscenza in un prodotto digitale scalabile.', icon: 'book' },
  { title: 'Community', text: 'Costruisci e modera uno spazio per i tuoi utenti più fedeli.', icon: 'users' },
  { title: 'Store online', text: 'Vendi prodotti fisici o digitali con un checkout fluido.', icon: 'cart' },
  { title: 'Email marketing', text: 'Sequenze e broadcast per restare nella mente dei tuoi clienti.', icon: 'mail' },
  { title: 'Automazioni', text: 'Flussi di lavoro che lavorano per te 24 ore su 24.', icon: 'bolt' },
];

const ICONS = {
  layout: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.6 8.6 0 0 1-3.9-.9L3 20l1.1-4A8.4 8.4 0 1 1 21 11.5Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>',
};

/* ============================================
   RENDER: griglia funzionalità
   ============================================ */
function renderFeatures() {
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;

  const markup = FEATURES.map(f => `
    <article class="feature-card reveal">
      <div class="feature-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#featGrad)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[f.icon]}</svg>
      </div>
      <h3>${f.title}</h3>
      <p>${f.text}</p>
    </article>
  `).join('');

  grid.innerHTML = `
    <svg width="0" height="0" style="position:absolute">
      <defs>
        <linearGradient id="featGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#7C5CFC"/>
          <stop offset="1" stop-color="#22D3EE"/>
        </linearGradient>
      </defs>
    </svg>
    ${markup}
  `;
}

/* ============================================
   NAV: toggle menu mobile
   ============================================ */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================
   REVEAL ON SCROLL
   ============================================ */
function initRevealAnimations() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(t => t.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => observer.observe(t));
}

/* ============================================
   TESTIMONIAL SLIDER
   ============================================ */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  let index = 0;
  let autoplayTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Vai alla testimonianza ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => goTo(index + 1), 6000);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn?.addEventListener('click', () => { goTo(index - 1); startAutoplay(); });
  nextBtn?.addEventListener('click', () => { goTo(index + 1); startAutoplay(); });

  track.style.display = 'flex';
  track.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
  slides.forEach(s => { s.style.minWidth = '100%'; });

  goTo(0);
  startAutoplay();

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
}

/* ============================================
   FORM: invio e validazione email (Formspree)
   ============================================ */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function initForm(formId, hintId) {
  const form = document.getElementById(formId);
  const hint = document.getElementById(hintId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const value = input ? input.value : '';

    if (!isValidEmail(value)) {
      if (input) input.classList.add('input-error');
      if (hint) {
        hint.textContent = 'Inserisci un indirizzo email valido.';
        hint.className = 'form-hint error';
      }
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mzeppqbr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: value })
      });

      if (response.ok) {
        if (input) input.classList.remove('input-error');
        if (hint) {
          hint.textContent = 'Fatto! Email inviata con successo.';
          hint.className = 'form-hint success';
        }
        form.reset();
      } else {
        if (hint) {
          hint.textContent = 'Si è verificato un errore durante l invio.';
          hint.className = 'form-hint error';
        }
      }
    } catch (err) {
      if (hint) {
        hint.textContent = 'Errore di connessione. Riprova più tardi.';
        hint.className = 'form-hint error';
      }
    }
  });
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      items.forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      question.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : `${answer.scrollHeight}px`;
    });
  });
}

/* ============================================
   BACK TO TOP
   ============================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 480);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderFeatures();
  initMobileNav();
  initRevealAnimations();
  initTestimonialSlider();
  initForm('heroForm', 'heroFormHint');
  initForm('ctaForm', 'ctaFormHint');
  initFaqAccordion();
  initBackToTop();
});
