const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 🔸 1. Початкові дані
let formData = {
  email: '',
  message: '',
};

// 🔸 2. Завантаження з localStorage, якщо є
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (form.elements.email) {
      form.elements.email.value = formData.email || '';
    }

    if (form.elements.message) {
      form.elements.message.value = formData.message || '';
    }
  } catch (err) {
    console.error('Error parsing saved form data:', err);
  }
}

// 🔸 3. Слухач події input (делегування)
form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (formData.hasOwnProperty(name)) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// 🔸 4. Слухач події submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Очищення
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
