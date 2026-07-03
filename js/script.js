/**
 * MK Garments — Website Scripts
 */

const WHATSAPP_NUMBER = '9779805809353';

// ---- Mobile Navigation ----
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ---- Header Scroll Effect ----
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ---- Scroll Animations ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.serve__card, .services__item, .why__item, .contact__card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ---- Contact Form → WhatsApp ----
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  let isValid = true;

  [name, email, message].forEach(field => {
    field.classList.remove('error');
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    }
  });

  if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.classList.add('error');
    isValid = false;
  }

  if (!isValid) return;

  const whatsappMessage = [
    '*New Inquiry from MK Garments Website*',
    '',
    `*Name:* ${name.value.trim()}`,
    `*Email:* ${email.value.trim()}`,
    phone.value.trim() ? `*Phone:* ${phone.value.trim()}` : '',
    '',
    `*Message:*`,
    message.value.trim()
  ].filter(Boolean).join('\n');

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
});
