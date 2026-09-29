// Modal "Colabora con nosotros": apertura, cierre y validación del formulario
const collabModal = document.querySelector('#collabModal');
const collabForm = document.querySelector('#collabForm');
const collabCount = document.querySelector('#collabCount');
const collabStatus = document.querySelector('#collabStatus');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function openCollab() {
  collabStatus.textContent = '';
  if (!collabModal.open) collabModal.showModal();
  collabForm.elements.name.focus();
}

// Al cerrar se limpia el #colabora de la URL para poder volver a abrirlo desde el menú
function closeCollab() {
  collabModal.close();
  if (location.hash === '#colabora') history.replaceState(null, '', location.pathname);
}

document.querySelector('#collaborateButton').addEventListener('click', openCollab);
collabModal.querySelector('.collab-close').addEventListener('click', closeCollab);
collabModal.addEventListener('cancel', event => { event.preventDefault(); closeCollab(); });
// Clic en el fondo oscuro (fuera de la tarjeta) también cierra
collabModal.addEventListener('click', event => { if (event.target === collabModal) closeCollab(); });

// Enlace "Colabora" del menú: contacto.html#colabora abre el modal
function checkHash() { if (location.hash === '#colabora') openCollab(); }
window.addEventListener('hashchange', checkHash);
checkHash();

collabForm.elements.proposal.addEventListener('input', event => { collabCount.textContent = event.target.value.length; });

// Reglas de validación: devuelven el mensaje de error o '' si el campo es válido
const rules = {
  name: value => value.length < 3 ? 'Escribe tu nombre completo (mínimo 3 caracteres).' : '',
  email: value => !value ? 'El correo es obligatorio.' : !emailPattern.test(value) ? 'Ingresa un correo válido, por ejemplo tu@email.com.' : '',
  type: value => !value ? 'Selecciona un tipo de colaboración.' : '',
  proposal: value => value.length < 20 ? `Cuéntanos un poco más (mínimo 20 caracteres, llevas ${value.length}).` : ''
};

function validateField(field) {
  const error = rules[field.name](field.value.trim());
  field.classList.toggle('invalid', Boolean(error));
  field.setAttribute('aria-invalid', Boolean(error));
  field.closest('label').querySelector('.field-error').textContent = error;
  return !error;
}

// Revalida en vivo los campos que ya se marcaron como inválidos
Object.keys(rules).forEach(name => {
  const field = collabForm.elements[name];
  field.addEventListener('input', () => { if (field.classList.contains('invalid')) validateField(field); });
  field.addEventListener('blur', () => { if (field.value) validateField(field); });
});

collabForm.addEventListener('submit', event => {
  event.preventDefault();
  const fields = Object.keys(rules).map(name => collabForm.elements[name]);
  const valid = fields.map(validateField).every(Boolean);
  if (!valid) {
    collabStatus.textContent = '';
    fields.find(field => field.classList.contains('invalid')).focus();
    return;
  }
  const name = collabForm.elements.name.value.trim().split(' ')[0];
  collabStatus.textContent = `¡Gracias, ${name}! Recibimos tu propuesta y te responderemos pronto.`;
  collabForm.reset();
  collabCount.textContent = '0';
});
