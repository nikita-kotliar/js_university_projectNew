export const LS_FAV = 'favourite';

export const setFav = arr => {
  localStorage.setItem(LS_FAV, JSON.stringify(arr));
};

export const getFav = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.log(err.message);
  }
};

export const removeFromFav = id => {
  const filteredArr = getFav(LS_FAV).filter(obj => obj._id !== id);
  localStorage.removeItem(LS_FAV);
  localStorage.setItem(LS_FAV, JSON.stringify(filteredArr));
};

const QUOTE_KEY = 'daily_quote';
const QUOTE_TIME_KEY = 'daily_quote_time';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function getQuote() {
  const storedQuote = localStorage.getItem(QUOTE_KEY);
  const storedTime = localStorage.getItem(QUOTE_TIME_KEY);

  if (
    storedQuote &&
    storedTime &&
    Date.now() - Number(storedTime) < ONE_DAY_MS
  ) {
    return JSON.parse(storedQuote);
  }

  try {
    const res = await fetch('https://your-energy.b.goit.study/api/quote');
    const data = await res.json();

    localStorage.setItem(QUOTE_KEY, JSON.stringify(data));
    localStorage.setItem(QUOTE_TIME_KEY, Date.now().toString());

    return data;
  } catch (err) {
    console.error('Error fetching quote:', err);
    if (storedQuote) return JSON.parse(storedQuote);
    return { quote: 'No quote available', author: '' };
  }
}

export const displayQuote = async quoteContainer => {
  const { quote, author } = await getQuote();
  quoteContainer.innerHTML = renderQuoteHTML(quote, author);
};

const renderQuoteHTML = (quote, author) => `
  <svg width="32" height="32" class="quote-text-icon">
    <use href="/js_university_projectNew/symbol-defs.svg#icon-run"></use>
  </svg>
  <div>
    <h3 class="main-quote-title">Quote of the day</h3>
    <p class="main-quote-text">${quote}</p>
    <p class="main-quote-author">${author}</p>
    <svg width="24" height="24" class="quote-text-icon-commas">
      <use href="/js_university_projectNew/symbol-defs.svg#icon-commas"></use>
    </svg>
  </div>
`;
