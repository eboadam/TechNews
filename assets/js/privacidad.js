// Política de Privacidad: menú móvil, índice activo, cookies y botón "volver arriba"
const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const tocLinks = document.querySelectorAll('.privacy-toc a');
const sections = document.querySelectorAll('.privacy-content section');
const cookiesToggle = document.querySelector('#cookiesToggle');
const cookiesMore = document.querySelector('#cookiesMore');
const backToTop = document.querySelector('#backToTop');

menuButton.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', mainNav.classList.contains('open'));
});

// Marca en el índice la sección que se está leyendo
function setActive(id) {
  tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
}, { rootMargin: '-20% 0px -70% 0px' });
sections.forEach(section => observer.observe(section));
setActive(sections[0].id);

// Muestra u oculta la información ampliada sobre cookies y localStorage
cookiesToggle.addEventListener('click', () => {
  cookiesMore.hidden = !cookiesMore.hidden;
  cookiesToggle.setAttribute('aria-expanded', !cookiesMore.hidden);
  cookiesToggle.firstChild.textContent = cookiesMore.hidden ? 'Conoce más sobre el uso de cookies ' : 'Ver menos ';
});

// El botón "volver arriba" aparece al bajar en la página
window.addEventListener('scroll', () => { backToTop.hidden = window.scrollY < 500; });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
