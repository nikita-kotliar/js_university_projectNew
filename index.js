import{d as N,h as C}from"./assets/exercises_card-BlOGFIQp.js";import{i as p}from"./assets/vendor-I1I71QQ2.js";const r={filters:document.querySelector(".filters"),navButtons:document.querySelector(".nav-buttons"),musclesBtn:document.querySelector(".muscles-btn"),exercisesTitle:document.querySelector(".exercises-title"),searchForm:document.querySelector(".search-form"),loadMoreBtn:document.querySelector(".load-more-btn"),quoteContainer:document.querySelector(".quote"),pagination:document.querySelector(".pagination"),exercisesWrapper:document.querySelector(".exercises-div"),exercises:document.querySelector(".exercises-list")};let F=window.innerWidth<768?9:12,H=window.innerWidth<768?8:10,a=1,f="Muscles",T="Muscles",k="",x="",w="",m=[];N(r.quoteContainer);b();r.musclesBtn.classList.add("active-btn");r.filters.addEventListener("click",W);r.exercises.addEventListener("click",I);r.searchForm.addEventListener("input",O);var q;(q=r.loadMoreBtn)==null||q.addEventListener("click",loadMore);async function b(e=!0){e&&(a=1,r.exercises.innerHTML="");let t=`https://your-energy.b.goit.study/api/filters?filter=${f}&page=${a}&limit=${F}`;T.trim()&&(t+=`&name=${T}`);const n=await(await fetch(t)).json();if(!n.results.length){B();return}_(n.results),j(n.totalPages)}function _(e){const t=`
    <ul class="exercises">
      ${e.map(({name:s,filter:n,imgURL:i})=>`
            <li class="exercise">
              <img src="${i}" alt="${s}" loading="lazy" class="exercise-image">
              <div class="exercise-info">
                <h2 class="exercise-subtitle">
                  ${s[0].toUpperCase()+s.slice(1)}
                </h2>
                <p class="exercise-filter">${n}</p>
              </div>
            </li>
          `).join("")}
    </ul>
  `;r.exercises.insertAdjacentHTML("beforeend",t)}function W(e){var t;e.target.tagName==="BUTTON"&&((t=document.querySelector(".active-btn"))==null||t.classList.remove("active-btn"),e.target.classList.add("active-btn"),e.target.classList.contains("muscles-btn")?f="Muscles":e.target.classList.contains("bodyparts-btn")?f="Body parts":e.target.classList.contains("equipment-btn")&&(f="Equipment"),r.exercisesTitle.textContent="Exercises",r.searchForm.style.display="none",b(!0))}async function I(e){const t=e.target.closest(".exercise");if(!t)return;const s=t.querySelector(".exercise-filter"),n=t.querySelector(".exercise-subtitle");!s||!n||(x=s.textContent,w=n.textContent.toLowerCase(),r.exercisesTitle.innerHTML=`
    <ul class="exercises-title">
      Exercises / <span>${g(w)}</span>
    </ul>
  `,r.searchForm.style.display="block",a=1,r.exercises.innerHTML="",await L())}async function L(e=!0){e&&(m=[]);let t=x.toLowerCase();t==="body parts"&&(t="bodypart");const s=`
    https://your-energy.b.goit.study/api/exercises?
    ${t}=${w}
    &keyword=${k}
    &page=${a}
    &limit=${H}
  `.replace(/\s+/g,""),i=await(await fetch(s)).json();if(!i.results.length){B();return}m=i.results,A(i.results),j(i.totalPages)}async function A(e){r.exercises.innerHTML="",m=e;const t=`
    <ul class="exercises-cards">
      ${e.map(({name:s,_id:n,rating:i,burnedCalories:c,bodyPart:o,target:d,time:v})=>{let u=`${c} / ${v} min`,S="...",$=d;return i%1===0&&(i+=".0"),i=parseFloat(i).toFixed(1),s.length>32&&(s=s.slice(0,24)+"..."),window.innerWidth<1440&&(s.length>24&&(s=s.slice(0,20)+"..."),S="...",$="..."),window.innerWidth<768&&(u=`${c} /... min`,s.length>22&&(s=s.slice(0,18)+"...")),`
              <li class="exercise-information" data-id-card="${n}">
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
                    data-id="${n}"
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
                    ${u}
                  </li>
                  <li>
                    <span>Body part:</span>
                    ${g(S)}
                  </li>
                  <li>
                    <span>Target:</span>
                    ${g($)}
                  </li>
                </ul>
              </li>
            `}).join("")}
    </ul>
  `;r.exercises.insertAdjacentHTML("beforeend",t)}function O(e){k=e.target.value.trim().toLowerCase(),a=1,r.exercises.innerHTML="",L(!0)}function j(e){if(!r.pagination)return;if(e<=1){r.pagination.innerHTML="";return}let t="";const s=(o,d,v,u)=>`
    <li>
      <button
        name="Next page"
        aria-label="Next page"
        class="pagination-btn pagination-arrow"
        data-page="${v}"
        ${u?"disabled":""}>
        <svg class="${d} ${o}" width="20" height="20">
          <use href="/js_university_projectNew/symbol-defs.svg#${d}"></use>
        </svg>
      </button>
    </li>
  `,n=o=>`
    <li>
      <button
        name="Next page"
        aria-label="Next page"
        class="pagination-btn ${o===a?"active":""}"
        data-page="${o}">
        ${o}
      </button>
    </li>
  `;t+=s("left","icon-big",a-2,a<=2),t+=s("left","icon-small",a-1,a===1);let i=Math.max(1,a-1),c=Math.min(e,a+1);a===1&&(c=Math.min(e,3)),a===e&&(i=Math.max(1,e-2)),i>1&&(t+=n(1),i>2&&e>4&&(t+='<li class="dots">...</li>'));for(let o=i;o<=c;o++)t+=n(o);c<e&&(c<e-1&&e>4&&(t+='<li class="dots">...</li>'),t+=n(e)),t+=s("right","icon-small",a+1,a===e),t+=s("right","icon-big",a+2,a>=e-1),r.pagination.innerHTML=t}r.pagination.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const s=Number(t.dataset.page);s!==a&&(a=s,r.exercises.innerHTML="",x?L(!1):b(!1))});r.exercises.addEventListener("click",e=>{const t=e.target.closest('[data-action="start"]');if(!t)return;const s=m.find(n=>n._id===t.dataset.id);C(s)});function B(){var e;r.exercises.innerHTML=`
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `,(e=r.loadMoreBtn)==null||e.style.setProperty("display","none"),r.pagination&&(r.pagination.innerHTML="")}function g(e){return e[0].toUpperCase()+e.slice(1)}const M=document.getElementById("progress-scroll");M&&M.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".progress-wrap path");if(e){const t=e.getTotalLength();e.style.transition="none",e.style.strokeDasharray=`${t} ${t}`,e.style.strokeDashoffset=`${t}`,e.getBoundingClientRect(),e.style.transition="stroke-dashoffset 10ms linear";const s=()=>{const i=window.scrollY||document.documentElement.scrollTop,c=document.documentElement.scrollHeight-window.innerHeight,o=t-i*t/c;e.style.strokeDashoffset=`${o}`};window.addEventListener("scroll",s);const n=50;window.addEventListener("scroll",()=>{if(window.scrollY>n){const i=document.querySelector(".progress-wrap");i&&i.classList.add("active-progress")}else{const i=document.querySelector(".progress-wrap");i&&i.classList.remove("active-progress")}})}});async function R(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}const l=document.querySelector("input[name=email]"),h=document.querySelector(".footer-send-button"),E="feedback-form-state";function y(e){return/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)}function D(){localStorage.setItem(E,JSON.stringify({email:l.value}))}function U(){const e=localStorage.getItem(E);if(!e)return;const{email:t}=JSON.parse(e);l.value=t||"",h.disabled=!y(l.value)}U();l.addEventListener("input",()=>{D(),h.disabled=!y(l.value)});l.addEventListener("change",()=>{y(l.value)||p.info({message:"Please enter a valid email address"})});h.addEventListener("click",async e=>{if(e.preventDefault(),!!y(l.value))try{await R(l.value),p.success({title:"Success",message:"Welcome to energy.flow world!"}),l.value="",h.disabled=!0,localStorage.removeItem(E)}catch(t){t.message==="EMAIL_EXISTS"?p.warning({message:"Email already exists"}):p.error({title:"Error",message:"Something went wrong! Please try again later"})}});
//# sourceMappingURL=index.js.map
