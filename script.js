// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ========== LANGUAGE TOGGLE ==========
const langToggle = document.getElementById('langToggle');
let currentLang = 'fr';

function applyLang(lang) {
    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if (val) el.innerHTML = val;
    });
    document.querySelectorAll('input[placeholder]').forEach(input => {
        // Placeholder generic - keeps same
    });
    document.documentElement.lang = lang;
    // Update toggle UI
    const active = langToggle.querySelector('.lang-active');
    const inactive = langToggle.querySelector('.lang-inactive');
    active.textContent = lang.toUpperCase();
    inactive.textContent = lang === 'fr' ? 'EN' : 'FR';
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    applyLang(currentLang);
});

// ========== PORTFOLIO FILTERS ==========
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.p-card');
filters.forEach(f => {
    f.addEventListener('click', () => {
        filters.forEach(x => x.classList.remove('active'));
        f.classList.add('active');
        const cat = f.dataset.filter;
        cards.forEach(c => {
            if (cat === 'all' || c.dataset.cat === cat) c.classList.remove('hidden');
            else c.classList.add('hidden');
        });
    });
});

// ========== FADE-IN ON SCROLL ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.section-head, .about-grid, .p-card, .b-card, .testi, .contact-grid')
    .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

// ========== NEWSLETTER SUBMIT ==========
document.querySelector('.newsletter').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const msg = currentLang === 'fr' ? '✨ Merci ! Nous vous écrirons bientôt.' : '✨ Thank you! We\'ll write to you soon.';
    alert(msg);
    input.value = '';
});
