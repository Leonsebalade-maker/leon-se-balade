const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Fermer' : 'Menu';
});

document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const translations = {
  en: {
    "Accueil": "Home",
    "Nos voyages": "Our travels",
    "Carnets de route": "Travel journals",
    "Vie en camping-car": "Motorhome life",
    "Conseils & astuces": "Tips & advice",
    "Nous & Léon": "Us & Léon",
    "Contact": "Contact",

    "hero-eyebrow": "Travel • discover • share",
    "hero-title": "Some memories deserve more than one life.",
    "hero-text": "Welcome aboard Léon. Motorhome getaways, travel journals and ideas for hitting the road — without necessarily going to the ends of the earth.",
    "hero-travels": "Discover our travels",
    "hero-meet": "Get to know us"
  }
};

const originalMenuTexts = new Map();

document.querySelectorAll('#menu a').forEach(link => {
  originalMenuTexts.set(link, link.textContent.trim());
});

document.querySelectorAll('[data-i18n]').forEach(element => {
  if (!element.dataset.fr) {
    element.dataset.fr = element.textContent.trim();
  }
});

const langFr = document.querySelector('#lang-fr');
const langEn = document.querySelector('#lang-en');

function setLanguage(lang) {
  if (lang === 'en') {
    document.querySelectorAll('#menu a').forEach(link => {
      const french = originalMenuTexts.get(link);
      link.textContent = translations.en[french] || french;
    });

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      element.textContent = translations.en[key] || element.dataset.fr;
    });

    document.documentElement.lang = 'en';
    langEn.classList.add('lang-active');
    langFr.classList.remove('lang-active');
  } else {
    document.querySelectorAll('#menu a').forEach(link => {
      link.textContent = originalMenuTexts.get(link);
    });

    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = element.dataset.fr;
    });

    document.documentElement.lang = 'fr';
    langFr.classList.add('lang-active');
    langEn.classList.remove('lang-active');
  }

  localStorage.setItem('leon-language', lang);
}

langEn.addEventListener('click', () => {
  setLanguage('en');
});

langFr.addEventListener('click', () => {
  setLanguage('fr');
});

const savedLanguage = localStorage.getItem('leon-language') || 'fr';
setLanguage(savedLanguage);
// Navigation des régions - Page France
document.querySelectorAll('.france-region-links a').forEach(link => {
  link.addEventListener('click', function (event) {

    const targetId = this.getAttribute('href');

    if (!targetId || !targetId.startsWith('#')) return;

    const region = document.querySelector(targetId);

    if (region && region.tagName.toLowerCase() === 'details') {
      event.preventDefault();

      // Ferme les autres régions ouvertes
      document.querySelectorAll('.region-accordion').forEach(item => {
        if (item !== region) {
          item.removeAttribute('open');
        }
      });

      // Ouvre la région choisie
      region.setAttribute('open', '');

      // Descend doucement jusqu'à la région
      region.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

  });
});
