import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function postSubscriptions(email) {
  const response = await fetch(
    'https://your-energy.b.goit.study/api/subscription',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  );

  if (response.status === 409) {
    throw new Error('EMAIL_EXISTS');
  }

  if (!response.ok) {
    throw new Error('REQUEST_FAILED');
  }

  return await response.json();
}


const email = document.querySelector('input[name=email]');
const submitBtnFooter = document.querySelector('.footer-send-button');
const STORAGE_KEY = 'feedback-form-state';

function isValidEmail(value) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(value);
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: email.value }));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;

  const { email: savedEmail } = JSON.parse(data);
  email.value = savedEmail || '';
  submitBtnFooter.disabled = !isValidEmail(email.value);
}

loadFromLocalStorage();

email.addEventListener('input', () => {
  saveToLocalStorage();
  submitBtnFooter.disabled = !isValidEmail(email.value);
});

email.addEventListener('change', () => {
  if (!isValidEmail(email.value)) {
    iziToast.info({
      message: 'Please enter a valid email address',
    });
  }
});

submitBtnFooter.addEventListener('click', async e => {
  e.preventDefault();

  if (!isValidEmail(email.value)) return;

  try {
    await postSubscriptions(email.value);

    iziToast.success({
      title: 'Success',
      message: 'Welcome to energy.flow world!',
    });

    email.value = '';
    submitBtnFooter.disabled = true;
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      iziToast.warning({
        message: 'Email already exists',
      });
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong! Please try again later',
      });
    }
  }
});
