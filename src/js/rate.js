import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import handlerStartBtn from './exercises_card.js';
export async function addExerciseRatingById(id, { email, rate, comment }) {
  const url = `https://your-energy.b.goit.study/api/exercises/${id}/rating`;
  rate = Number(rate);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      rate,
      review: comment,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Rating failed');
  }

  return response.json();
}

const formCloseBtn = document.getElementById('form-close-btn');
const backdrop = document.querySelector('.backdrop');
const userEmail = document.querySelector('#user-email');
const userComment = document.getElementById('user-comment');
const formSendBtn = document.querySelector('.form-send-btn');
const ratingWrapper = document.querySelector('.rating-wrapper');
const ratingStarValue = document.querySelector('.rating-star-value');
const backdropForm = document.querySelector('.backdrop-form');

let exerciseId = null;
let previousExercise = null; 

const userFeedback = {
  rate: 0,
  email: '',
  comment: '',
};

function resetForm() {
  userEmail.value = '';
  userComment.value = '';
  userFeedback.rate = 0;
  userFeedback.comment = '';
  userFeedback.email = '';
  ratingStarValue.textContent = '0.0';
  const ratingStarIcons = document.querySelectorAll('.rating-star-icons');
  ratingStarIcons.forEach(icon => {
    icon.style.fill = 'var(--white-20)';
  });
}

function handleEscClose(event) {
  if (event.key === 'Escape') closeRateModal(true);
}

function closeRateModal(returnCard = false) {
  backdrop.classList.remove('is-open');
  document.removeEventListener('keydown', handleEscClose);
  if (returnCard && previousExercise) handlerStartBtn(previousExercise);
}

formCloseBtn.addEventListener('click', () => closeRateModal(true));
backdrop.addEventListener('click', event => {
  if (event.target === backdrop) closeRateModal(true);
});

ratingWrapper.addEventListener('click', event => {
  if (!event.target.dataset.id) return;
  userFeedback.rate = Number(event.target.dataset.id);
  ratingStarValue.textContent = `${userFeedback.rate}.0`;

  const ratingStarIcons = document.querySelectorAll('.rating-star-icons');
  for (let i = 0; i < 5; i++) {
    ratingStarIcons[i].style.fill =
      i < userFeedback.rate ? 'var(--orange-color)' : 'var(--white-20)';
  }
});

export function handlerOpenRate(id, exercise = null) {
  exerciseId = id;
  previousExercise = exercise;
  backdrop.classList.add('is-open');
  document.addEventListener('keydown', handleEscClose);
}

backdropForm.addEventListener('submit', async event => {
  event.preventDefault();
  userFeedback.email = userEmail.value.trim();
  userFeedback.comment = userComment.value.trim() || undefined;

  if (!userFeedback.rate) {
    iziToast.error({
      message: 'Please select a rating',
      position: 'topRight',
      color: 'red',
    });
    return;
  }

  if (!userFeedback.email) {
    iziToast.error({
      message: 'Please enter your email',
      position: 'topRight',
      color: 'red',
    });
    return;
  }

  try {
    await addExerciseRatingById(exerciseId, userFeedback);
    iziToast.success({
      message: 'Your rating is accepted',
      position: 'topRight',
      color: 'green',
    });
    resetForm();
    closeRateModal(); 
  } catch (error) {
    iziToast.error({
      message: `${error.message}`,
      position: 'topRight',
      color: 'red',
    });
  }
});
