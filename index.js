import{h as _}from"./assets/exercises_card-BlUP6G50.js";import{i as p}from"./assets/vendor-I1I71QQ2.js";const r={filters:document.querySelector(".filters"),navButtons:document.querySelector(".nav-buttons"),musclesBtn:document.querySelector(".muscles-btn"),exercisesTitle:document.querySelector(".exercises-title"),searchForm:document.querySelector(".search-form"),loadMoreBtn:document.querySelector(".load-more-btn"),quoteContainer:document.querySelector(".quote"),pagination:document.querySelector(".pagination"),exercisesWrapper:document.querySelector(".exercises-div"),exercises:document.querySelector(".exercises-list")};let k=window.innerWidth<768?8:12,n=1,f="Muscles",q="Muscles",j="",b="",w="",m=[];D();x();r.musclesBtn.classList.add("active-btn");r.filters.addEventListener("click",C);r.exercises.addEventListener("click",F);r.searchForm.addEventListener("input",W);var M;(M=r.loadMoreBtn)==null||M.addEventListener("click",loadMore);async function x(e=!0){e&&(n=1,r.exercises.innerHTML="");let t=`https://your-energy.b.goit.study/api/filters?filter=${f}&page=${n}&limit=${k}`;q.trim()&&(t+=`&name=${q}`);const a=await(await fetch(t)).json();if(!a.results.length){B();return}H(a.results),N(a.totalPages)}function H(e){const t=`
    <ul class="exercises">
      ${e.map(({name:s,filter:a,imgURL:i})=>`
            <li class="exercise">
              <img src="${i}" alt="${s}" loading="lazy" class="exercise-image">
              <div class="exercise-info">
                <h2 class="exercise-subtitle">
                  ${s[0].toUpperCase()+s.slice(1)}
                </h2>
                <p class="exercise-filter">${a}</p>
              </div>
            </li>
          `).join("")}
    </ul>
  `;r.exercises.insertAdjacentHTML("beforeend",t)}function C(e){var t;e.target.tagName==="BUTTON"&&((t=document.querySelector(".active-btn"))==null||t.classList.remove("active-btn"),e.target.classList.add("active-btn"),e.target.classList.contains("muscles-btn")?f="Muscles":e.target.classList.contains("bodyparts-btn")?f="Body parts":e.target.classList.contains("equipment-btn")&&(f="Equipment"),r.exercisesTitle.textContent="Exercises",r.searchForm.style.display="none",x(!0))}async function F(e){let t=e.target.closest(".exercise");t&&(b=t.querySelector("p").textContent,w=t.querySelector("h1").textContent.toLowerCase(),r.exercisesTitle.innerHTML=`
    <ul class="exercises-title">
      Exercises / <span>${g(w)}</span>
    </ul>
  `,r.searchForm.style.display="block",n=1,r.exercises.innerHTML="",await L())}async function L(e=!0){e&&(m=[]);let t=b.toLowerCase();t==="body parts"&&(t="bodypart");const s=`
    https://your-energy.b.goit.study/api/exercises?
    ${t}=${w}
    &keyword=${j}
    &page=${n}
    &limit=${k}
  `.replace(/\s+/g,""),i=await(await fetch(s)).json();if(!i.results.length){B();return}m=i.results,I(i.results),N(i.totalPages)}async function I(e){r.exercises.innerHTML="",m=e;const t=`
    <ul class="exercises-cards">
      ${e.map(({name:s,_id:a,rating:i,burnedCalories:l,bodyPart:o,target:u,time:v})=>{let d=`${l} / ${v} min`,S="...",E=u;return i%1===0&&(i+=".0"),i=parseFloat(i).toFixed(1),s.length>32&&(s=s.slice(0,24)+"..."),window.innerWidth<1440&&(s.length>24&&(s=s.slice(0,20)+"..."),S="...",E="..."),window.innerWidth<768&&(d=`${l} /... min`,s.length>22&&(s=s.slice(0,18)+"...")),`
              <li class="exercise-information" data-id-card="${a}">
                <div class="top-nav">
                  <div>
                    <p class="tag">Workout</p>
                    <span class="rating">
                      ${i}
                      <svg class="star-icon" width="14" height="14">
                        <use href="/js_university_projectNew/symbol-defs.svg#icon-star"></use>
                      </svg>
                    </span>
                  </div>
                  <button
                    name="start"
                    data-action="start"
                    data-id="${a}"
                    class="details-link">
                    Start
                    <svg class="arrow-icon" width="16" height="16">
                      <use href="/js_university_projectNew/symbol-defs.svg#icon-arrow"></use>
                    </svg>
                  </button>
                </div>

                <div class="exercise-header">
                  <svg class="icon-man" fill="white" width="24" height="24">
                    <use href="/js_university_projectNew/symbol-defs.svg#icon-run"></use>
                  </svg>
                  <h2 class="exercise-name">
                    ${g(s)}
                  </h2>
                </div>

                <ul class="exercise-details">
                  <li>
                    <span>Burned calories:</span>
                    ${d}
                  </li>
                  <li>
                    <span>Body part:</span>
                    ${g(S)}
                  </li>
                  <li>
                    <span>Target:</span>
                    ${g(E)}
                  </li>
                </ul>
              </li>
            `}).join("")}
    </ul>
  `;r.exercises.insertAdjacentHTML("beforeend",t)}function W(e){j=e.target.value.trim().toLowerCase(),n=1,r.exercises.innerHTML="",L(!0)}function N(e){if(!r.pagination)return;if(e<=1){r.pagination.innerHTML="";return}let t="";const s=(o,u,v,d)=>`
    <li>
      <button
        name="Next page"
        aria-label="Next page"
        class="pagination-btn pagination-arrow"
        data-page="${v}"
        ${d?"disabled":""}>
        <svg class="${u} ${o}" width="20" height="20">
          <use href="/js_university_projectNew/symbol-defs.svg#${u}"></use>
        </svg>
      </button>
    </li>
  `,a=o=>`
    <li>
      <button
        name="Next page"
        aria-label="Next page"
        class="pagination-btn ${o===n?"active":""}"
        data-page="${o}">
        ${o}
      </button>
    </li>
  `;t+=s("left","icon-big",n-2,n<=2),t+=s("left","icon-small",n-1,n===1);let i=Math.max(1,n-1),l=Math.min(e,n+1);n===1&&(l=Math.min(e,3)),n===e&&(i=Math.max(1,e-2)),i>1&&(t+=a(1),i>2&&e>4&&(t+='<li class="dots">...</li>'));for(let o=i;o<=l;o++)t+=a(o);l<e&&(l<e-1&&e>4&&(t+='<li class="dots">...</li>'),t+=a(e)),t+=s("right","icon-small",n+1,n===e),t+=s("right","icon-big",n+2,n>=e-1),r.pagination.innerHTML=t}r.pagination.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const s=Number(t.dataset.page);s!==n&&(n=s,r.exercises.innerHTML="",b?L(!1):x(!1))});r.exercises.addEventListener("click",e=>{const t=e.target.closest('[data-action="start"]');if(!t)return;const s=m.find(a=>a._id===t.dataset.id);_(s)});function B(){var e;r.exercises.innerHTML=`
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `,(e=r.loadMoreBtn)==null||e.style.setProperty("display","none"),r.pagination&&(r.pagination.innerHTML="")}function g(e){return e[0].toUpperCase()+e.slice(1)}async function A(){return await(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function D(){try{const e=await A(),t=`
      <svg width="32" height="32" class="quote-text-icon">
        <use href="/js_university_projectNew/symbol-defs.svg#icon-run"></use>
      </svg>
      <div>
        <h3 class="main-quote-title">Quote of the day</h3>
        <p class="main-quote-text">${e.quote}</p>
        <p class="main-quote-author">${e.author}</p>
        <svg width="24" height="24" class="quote-text-icon-commas">
          <use href="/js_university_projectNew/symbol-defs.svg#icon-commas"></use>
        </svg>
      </div>
    `;r.quoteContainer.innerHTML=t}catch(e){console.error("Error fetching or displaying quote:",e)}}const T=document.getElementById("progress-scroll");T&&T.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".progress-wrap path");if(e){const t=e.getTotalLength();e.style.transition="none",e.style.strokeDasharray=`${t} ${t}`,e.style.strokeDashoffset=`${t}`,e.getBoundingClientRect(),e.style.transition="stroke-dashoffset 10ms linear";const s=()=>{const i=window.scrollY||document.documentElement.scrollTop,l=document.documentElement.scrollHeight-window.innerHeight,o=t-i*t/l;e.style.strokeDashoffset=`${o}`};window.addEventListener("scroll",s);const a=50;window.addEventListener("scroll",()=>{if(window.scrollY>a){const i=document.querySelector(".progress-wrap");i&&i.classList.add("active-progress")}else{const i=document.querySelector(".progress-wrap");i&&i.classList.remove("active-progress")}})}});async function O(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}const c=document.querySelector("input[name=email]"),h=document.querySelector(".footer-send-button"),$="feedback-form-state";function y(e){return/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)}function R(){localStorage.setItem($,JSON.stringify({email:c.value}))}function Q(){const e=localStorage.getItem($);if(!e)return;const{email:t}=JSON.parse(e);c.value=t||"",h.disabled=!y(c.value)}Q();c.addEventListener("input",()=>{R(),h.disabled=!y(c.value)});c.addEventListener("change",()=>{y(c.value)||p.info({message:"Please enter a valid email address"})});h.addEventListener("click",async e=>{if(e.preventDefault(),!!y(c.value))try{await O(c.value),p.success({title:"Success",message:"Welcome to energy.flow world!"}),c.value="",h.disabled=!0,localStorage.removeItem($)}catch(t){t.message==="EMAIL_EXISTS"?p.warning({message:"Email already exists"}):p.error({title:"Error",message:"Something went wrong! Please try again later"})}});
//# sourceMappingURL=index.js.map
