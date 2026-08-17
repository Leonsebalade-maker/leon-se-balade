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
    "Contact": "Contact"
  }
};

const originalTexts = new Map();

document.querySelectorAll('#menu a').forEach(link => {
  originalTexts.set(link, link.textContent.trim());
});

const langFr = document.querySelector('#lang-fr');
const langEn = document.querySelector('#lang-en');

langEn.addEventListener('click', () => {
  document.querySelectorAll('#menu a').forEach(link => {
    const french = originalTexts.get(link);
    link.textContent = translations.en[french] || french;
  });

  document.documentElement.lang = 'en';
  langEn.classList.add('lang-active');
  langFr.classList.remove('lang-active');
});

langFr.addEventListener('click', () => {
  document.querySelectorAll('#menu a').forEach(link => {
    link.textContent = originalTexts.get(link);
  });

  document.documentElement.lang = 'fr';
  langFr.classList.add('lang-active');
  langEn.classList.remove('lang-active');
});
