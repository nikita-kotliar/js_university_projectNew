import handlerStartBtn from './exercises_card.js';

const refs = {
  filters: document.querySelector('.filters'),
  navButtons: document.querySelector('.nav-buttons'),
  musclesBtn: document.querySelector('.muscles-btn'),
  exercisesTitle: document.querySelector('.exercises-title'),
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  quoteContainer: document.querySelector('.quote'),
  pagination: document.querySelector('.pagination'),
  exercisesWrapper: document.querySelector('.exercises-div'),
  exercises: document.querySelector('.exercises-list'),
};

let limit = window.innerWidth < 768 ? 8 : 12;
let page = 1;

let currentFilter = 'Muscles';
let searchQuery = 'Muscles';
let keyWord = '';
let filter = '';
let name = '';
let localResponse = [];

displayQuote();
fetchFilters();
refs.musclesBtn.classList.add('active-btn');

refs.filters.addEventListener('click', pressFilterBtn);
refs.exercises.addEventListener('click', loadExercises);
refs.searchForm.addEventListener('input', onLiveSearch);
refs.loadMoreBtn?.addEventListener('click', loadMore);


async function fetchFilters(reset = true) {
  if (reset) {
    page = 1;
    refs.exercises.innerHTML = '';
  }

  let url = `https://your-energy.b.goit.study/api/filters?filter=${currentFilter}&page=${page}&limit=${limit}`;

  if (searchQuery.trim()) {
    url += `&name=${searchQuery}`;
  }

  const res = await fetch(url);
  const data = await res.json();


  if (!data.results.length) {
    showNoResults();
    return;
  }

  makeFilterCards(data.results);
  renderPagination(data.totalPages);
}

function makeFilterCards(items) {
  const markup = `
    <ul class="exercises">
      ${items
        .map(({ name, filter, imgURL }) => {
          return `
            <li class="exercise">
              <img src="${imgURL}" alt="${name}" loading="lazy" class="exercise-image">
              <div class="exercise-info">
                <h1 class="exercise-subtitle">
                  ${name[0].toUpperCase() + name.slice(1)}
                </h1>
                <p class="exercise-filter">${filter}</p>
              </div>
            </li>
          `;
        })
        .join('')}
    </ul>
  `;

  refs.exercises.insertAdjacentHTML('beforeend', markup);
}

/* ================= FILTER BUTTONS ================= */

function pressFilterBtn(event) {
  if (event.target.tagName !== 'BUTTON') return;

  document.querySelector('.active-btn')?.classList.remove('active-btn');
  event.target.classList.add('active-btn');
  if (event.target.classList.contains('muscles-btn')) {
    currentFilter = 'Muscles';
  } else if (event.target.classList.contains('bodyparts-btn')) {
    currentFilter = 'Body parts';
  } else if (event.target.classList.contains('equipment-btn')) {
    currentFilter = 'Equipment';
  }

  refs.exercisesTitle.textContent = 'Exercises';
  refs.searchForm.style.display = 'none';

  fetchFilters(true);
}

/* ================= LOAD EXERCISES ================= */

async function loadExercises(event) {
  let card = event.target.closest('.exercise');
  if (!card) return;

  filter = card.querySelector('p').textContent;
  name = card.querySelector('h1').textContent.toLowerCase();

  refs.exercisesTitle.innerHTML = `
    <ul class="exercises-title">
      Exercises / <span>${capitalize(name)}</span>
    </ul>
  `;
  refs.searchForm.style.display = 'block';

  page = 1;
  refs.exercises.innerHTML = '';

  await fetchExercises();
}

async function fetchExercises(reset = true) {
  if (reset) localResponse = [];

  let preparedFilter = filter.toLowerCase();
  if (preparedFilter === 'body parts') preparedFilter = 'bodypart';

  const url = `
    https://your-energy.b.goit.study/api/exercises?
    ${preparedFilter}=${name}
    &keyword=${keyWord}
    &page=${page}
    &limit=${limit}
  `.replace(/\s+/g, '');

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results.length) {
    showNoResults();
    return;
  }

  localResponse = data.results;
  makeExercisesCards(data.results);
  renderPagination(data.totalPages);
}

async function makeExercisesCards(response) {
  refs.exercises.innerHTML = '';
  localResponse = response;

  const markup = `
    <ul class="exercises-cards">
      ${response
        .map(
          ({ name, _id, rating, burnedCalories, bodyPart, target, time }) => {
            let calories = `${burnedCalories} / ${time} min`;

            let bodyPartLet = "...";
            let targetLet = target;
            if (rating % 1 === 0) rating += '.0';
            rating = parseFloat(rating).toFixed(1);
            if (name.length > 32) name = name.slice(0, 24) + '...';
            if (window.innerWidth < 1440) {
              if (name.length > 24) name = name.slice(0, 20) + '...';
              bodyPartLet = '...';
              targetLet = '...';
            }
            if (window.innerWidth < 768) {
              calories = `${burnedCalories} /... min`;
              if (name.length > 22) name = name.slice(0, 18) + '...';
            }

            return `
              <li class="exercise-information" data-id-card="${_id}">
                <div class="top-nav">
                  <div>
                    <p class="tag">Workout</p>
                    <span class="rating">
                      ${rating}
                      <svg class="star-icon" width="14" height="14">
                        <use href="../img/icons/symbol-defs.svg#icon-star"></use>
                      </svg>
                    </span>
                  </div>
                  <button
                    name="start"
                    data-action="start"
                    data-id="${_id}"
                    class="details-link">
                    Start
                    <svg class="arrow-icon" width="16" height="16">
                      <use href="../img/icons/symbol-defs.svg#icon-arrow"></use>
                    </svg>
                  </button>
                </div>

                <div class="exercise-header">
                  <svg class="icon-man" fill="white" width="24" height="24">
                    <use href="../img/icons/symbol-defs.svg#icon-run"></use>
                  </svg>
                  <h2 class="exercise-name">
                    ${capitalize(name)}
                  </h2>
                </div>

                <ul class="exercise-details">
                  <li>
                    <span>Burned calories:</span>
                    ${calories}
                  </li>
                  <li>
                    <span>Body part:</span>
                    ${capitalize(bodyPartLet)}
                  </li>
                  <li>
                    <span>Target:</span>
                    ${capitalize(targetLet)}
                  </li>
                </ul>
              </li>
            `;
          }
        )
        .join('')}
    </ul>
  `;

  refs.exercises.insertAdjacentHTML('beforeend', markup);
}

/* ================= SEARCH ================= */

function onLiveSearch(event) {
  const value = event.target.value.trim().toLowerCase();
  keyWord = value;
  page = 1;

  refs.exercises.innerHTML = '';

  fetchExercises(true);
}

function onSearch(event) {
  event.preventDefault();

  keyWord = event.target.searchQuery.value.trim();
  page = 1;
  filter = ''; 
  currentFilter = '';
  refs.exercises.innerHTML = '';
  refs.exercisesTitle.textContent = `Search results for "${keyWord}"`;
  refs.searchForm.style.display = 'block';

  if (!keyWord) {
    currentFilter = 'Muscles';
    refs.exercisesTitle.textContent = 'Exercises';
    refs.searchForm.style.display = 'none';
    fetchFilters(true);
  } else {
    fetchExercises(true);
  }
}


function renderPagination(totalPages) {
  if (!refs.pagination) return;
  if (totalPages <= 1) {
    refs.pagination.innerHTML = '';
    return;
  }

  let html = '';

  const createArrow = (side, icon, targetPage, disabled) => `
    <li>
      <button
        name="arrow"
        class="pagination-btn pagination-arrow"
        data-page="${targetPage}"
        ${disabled ? 'disabled' : ''}>
        <svg class="${icon} ${side}" width="20" height="20">
          <use href="../img/icons/symbol-defs.svg#${icon}"></use>
        </svg>
      </button>
    </li>
  `;

  const createPageBtn = p => `
    <li>
      <button
        name="pagination"
        class="pagination-btn ${p === page ? 'active' : ''}"
        data-page="${p}">
        ${p}
      </button>
    </li>
  `;

  html += createArrow('left', 'icon-big', page - 2, page <= 2);
  html += createArrow('left', 'icon-small', page - 1, page === 1);

  let start = Math.max(1, page - 1);
  let end = Math.min(totalPages, page + 1);

  if (page === 1) end = Math.min(totalPages, 3);
  if (page === totalPages) start = Math.max(1, totalPages - 2);

  if (start > 1) {
    html += createPageBtn(1);

    if (start > 2 && totalPages > 4) {
      html += `<li class="dots">...</li>`;
    }
  }

  for (let i = start; i <= end; i++) {
    html += createPageBtn(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1 && totalPages > 4) {
      html += `<li class="dots">...</li>`;
    }

    html += createPageBtn(totalPages);
  }

  html += createArrow('right', 'icon-small', page + 1, page === totalPages);
  html += createArrow('right', 'icon-big', page + 2, page >= totalPages - 1);

  refs.pagination.innerHTML = html;
}


refs.pagination.addEventListener('click', e => {
  const btn = e.target.closest('.pagination-btn');
  if (!btn) return;

  const selectedPage = Number(btn.dataset.page);
  if (selectedPage === page) return;

  page = selectedPage;
  refs.exercises.innerHTML = '';

  filter ? fetchExercises(false) : fetchFilters(false);
});

/* ================= START BTN ================= */

refs.exercises.addEventListener('click', event => {
  const btn = event.target.closest('[data-action="start"]');
  if (!btn) return;

  const exercise = localResponse.find(el => el._id === btn.dataset.id);
  handlerStartBtn(exercise);
});

/* ================= HELPERS ================= */

function showNoResults() {
  refs.exercises.innerHTML = `
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `;
  refs.loadMoreBtn?.style.setProperty('display', 'none');
  if (refs.pagination) {
    refs.pagination.innerHTML = ''; 
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export async function fetchQuote() {
  const url = 'https://your-energy.b.goit.study/api/quote';
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
export async function displayQuote() {
  try {
    const quoteData = await fetchQuote();
    const quoteMarkup = `
      <svg width="32" height="32" class="quote-text-icon">
        <use href="../img/icons/symbol-defs.svg#icon-run"></use>
      </svg>
      <div>
        <h3 class="main-quote-title">Quote of the day</h3>
        <p class="main-quote-text">${quoteData.quote}</p>
        <p class="main-quote-author">${quoteData.author}</p>
        <svg width="24" height="24" class="quote-text-icon-commas">
          <use href="../img/icons/symbol-defs.svg#icon-commas"></use>
        </svg>
      </div>
    `;
    refs.quoteContainer.innerHTML = quoteMarkup;
  } catch (error) {
    console.error('Error fetching or displaying quote:', error);
  }
}
