// Site-wide behaviour: mobile/desktop menu, private-events dialog,
// first-visit popup, scroll reveals and the homepage hero carousel.

document.documentElement.classList.add('js');

// Menu
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
if (toggle && menu) {
  const setMenu = (open: boolean) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.querySelector<HTMLElement>('[data-icon-open]')!.hidden = open;
    toggle.querySelector<HTMLElement>('[data-icon-close]')!.hidden = !open;
  };
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
}

// Private events dialog: links fall back to /inquiry/ on pages without it
const eventDialog = document.querySelector<HTMLDialogElement>('[data-event-dialog]');
if (eventDialog) {
  document.querySelectorAll<HTMLElement>('[data-open-event]').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (menu && toggle && !menu.hidden) toggle.click();
      eventDialog.showModal();
    }),
  );
}

// Close dialogs when the backdrop is clicked
document.querySelectorAll<HTMLDialogElement>('dialog.sheet').forEach((d) =>
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); }),
);

// First-visit popup
const welcome = document.querySelector<HTMLDialogElement>('[data-welcome-dialog]');
if (welcome) {
  const KEY = 'lhg_popup_v1';
  const markSeen = () => { try { localStorage.setItem(KEY, '1'); } catch {} };
  let seen = false;
  try { seen = localStorage.getItem(KEY) === '1'; } catch {}
  if (!seen) {
    setTimeout(() => { if (!document.querySelector('dialog[open]')) welcome.showModal(); }, 2600);
  }
  welcome.addEventListener('close', markSeen);
  welcome.querySelector('form[name]')?.addEventListener('submit', markSeen);
  welcome.querySelector('[data-close-welcome]')?.addEventListener('click', () => welcome.close());
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Hero carousel
const hero = document.querySelector<HTMLElement>('[data-carousel]');
if (hero) {
  const slides = [...hero.querySelectorAll<HTMLElement>('[data-slide]')];
  const bars = [...hero.querySelectorAll<HTMLButtonElement>('[data-bar]')];
  const counter = hero.querySelector<HTMLElement>('[data-current]');
  let i = 0;
  let timer: number | undefined;
  const go = (n: number) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('on', k === i));
    bars.forEach((b, k) => {
      b.classList.remove('on');
      if (k === i) { void b.offsetWidth; b.classList.add('on'); }
      b.setAttribute('aria-current', k === i ? 'true' : 'false');
    });
    if (counter) counter.textContent = String(i + 1).padStart(2, '0');
    window.clearInterval(timer);
    timer = window.setInterval(() => go(i + 1), 6500);
  };
  hero.querySelector('[data-prev]')?.addEventListener('click', () => go(i - 1));
  hero.querySelector('[data-next]')?.addEventListener('click', () => go(i + 1));
  bars.forEach((b, k) => b.addEventListener('click', () => go(k)));
  go(0);
}
