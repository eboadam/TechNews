const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const form = document.querySelector('#contactForm');
const message = document.querySelector('#message');
const count = document.querySelector('#charCount');
const status = document.querySelector('#contactStatus');

menuButton.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', mainNav.classList.contains('open'));
});

message.addEventListener('input', () => { count.textContent = message.value.length; });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '¡Mensaje enviado! Nos pondremos en contacto contigo muy pronto.';
  form.reset();
  count.textContent = '0';
});

// El botón "Quiero colaborar" abre el modal definido en colabora.js
