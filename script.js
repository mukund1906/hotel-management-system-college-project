const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

const checkinInput = document.querySelector('input[name="checkin"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().slice(0, 10);
checkinInput.min = localToday;

document.querySelector('#year').textContent = today.getFullYear();

const bookingForm = document.querySelector('#booking-form');
const formMessage = document.querySelector('#form-message');
const toast = document.querySelector('#toast');
let toastTimer;

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const guestName = bookingForm.elements.name.value.trim();
  const message = `Thanks, ${guestName}! Your demo enquiry is ready. Please call the hotel to confirm a booking.`;
  formMessage.textContent = message;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 5000);
  bookingForm.reset();
  checkinInput.min = localToday;
});
