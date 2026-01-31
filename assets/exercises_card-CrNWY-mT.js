import{i as v}from"./vendor-I1I71QQ2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const u="favourite",F=e=>{localStorage.setItem(u,JSON.stringify(e))},b=e=>{try{return JSON.parse(localStorage.getItem(e))}catch(s){console.log(s.message)}},k=e=>{const s=b(u).filter(t=>t._id!==e);localStorage.removeItem(u),localStorage.setItem(u,JSON.stringify(s))},x="daily_quote",q="daily_quote_time",A=24*60*60*1e3;async function R(){const e=localStorage.getItem(x),s=localStorage.getItem(q);if(e&&s&&Date.now()-Number(s)<A)return JSON.parse(e);try{const o=await(await fetch("https://your-energy.b.goit.study/api/quote")).json();return localStorage.setItem(x,JSON.stringify(o)),localStorage.setItem(q,Date.now().toString()),o}catch(t){return console.error("Error fetching quote:",t),e?JSON.parse(e):{quote:"No quote available",author:""}}}const H=async e=>{const{quote:s,author:t}=await R();e.innerHTML=J(s,t)},J=(e,s)=>`
  <svg width="32" height="32" class="quote-text-icon">
    <use href="/js_university_projectNew/symbol-defs.svg#icon-run"></use>
  </svg>
  <div>
    <h3 class="main-quote-title">Quote of the day</h3>
    <p class="main-quote-text">${e}</p>
    <p class="main-quote-author">${s}</p>
    <svg width="24" height="24" class="quote-text-icon-commas">
      <use href="/js_university_projectNew/symbol-defs.svg#icon-commas"></use>
    </svg>
  </div>
`,E=window.location.pathname,j=document.getElementById("homeLink"),$=document.getElementById("favoritesLink");j.classList.remove("active");$.classList.remove("active");E.includes("index.html")?j.classList.add("active"):E.includes("favorites.html")&&$.classList.add("active");const D=document.querySelector(".open-mobile-menu-btn"),Q=document.querySelector(".close-mobile-menu-btn"),L=document.querySelector(".mobile-menu-wrapper"),W=document.querySelector(".mobile-menu");D.addEventListener("click",()=>{L.classList.add("is-open"),document.body.classList.add("not-scrollable")});Q.addEventListener("click",()=>{I()});L.addEventListener("click",()=>{I()});W.addEventListener("click",e=>{e.stopPropagation()});function I(){L.classList.remove("is-open"),document.body.classList.remove("not-scrollable")}const n={cardSet:document.querySelector(".fav_card_list"),noCards:document.querySelector(".no_cards_wrapper"),quoteContainer:document.querySelector(".quote"),noCardsContainer:document.querySelector(".no_cards_wrapper-container"),paginationCards:document.querySelector(".pagination-cards")};let g=1;const y=8,U=(e,s)=>{const t=(s-1)*y,o=t+y;return e.slice(t,o)},Y=(e=[])=>{const s=new Set;return e.filter(t=>!(t!=null&&t._id)||s.has(t._id)?!1:(s.add(t._id),!0))},C=e=>{const s=e.map(({name:t,_id:o,burnedCalories:r,bodyPart:i,target:a,time:O=3})=>{let _=`${r} / ${O} min`,S=i,w=a;return t.length>32&&(t=t.slice(0,26)+"..."),window.innerWidth<1440&&(t.length>24&&(t=t.slice(0,20)+"..."),S="...",w="..."),window.innerWidth<768&&(_=`${r} /... min`,t.length>22&&(t=t.slice(0,18)+"...")),`
        <li class="exercise-information" data-id-card="${o}" data-component="fav_card">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <button
                name="trash"
                data-id-del-btn="${o}"
                data-action="delete_fav_card"
                class="trash-btn">
                <svg class="trash-icon" width="16" height="16">
                  <use href="/js_university_projectNew/symbol-defs.svg#icon-trash"></use>
                </svg>
              </button>
            </div>

            <div class="actions">
              <button
                name="start"
                data-id-start-btn="${o}"
                data-action="start_exercise_btn"
                class="details-link">
                Start
                <svg class="arrow-icon" width="16" height="16">
                  <use href="/js_university_projectNew/symbol-defs.svg#icon-arrow"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="exercise-header">
            <svg class="icon-man" width="24" height="24">
              <use href="/js_university_projectNew/symbol-defs.svg#icon-run"></use>
            </svg>
            <h2 class="exercise-name">${t}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${_}</li>
            <li><span>Body part:</span> ${S}</li>
            <li><span>Target:</span> ${w}</li>
          </ul>
        </li>
      `}).join("");n.cardSet.innerHTML=s},z=e=>{const s=e.target.closest('[data-action="start_exercise_btn"]'),t=e.target.closest('[data-action="delete_fav_card"]');if(!(!s&&!t)){if(t){k(t.dataset.idDelBtn),m();return}if(s){const r=(b(u)||[]).find(i=>i._id===s.dataset.idStartBtn);r&&ie(r,!0,!0)}}};n.cardSet&&n.cardSet.addEventListener("click",z);function K(e){if(n.paginationCards){if(e<=1){n.paginationCards.innerHTML="";return}n.paginationCards.innerHTML=Array.from({length:e},(s,t)=>`
      <li>
        <button
          name="pagination"
          class="pagination-btn ${g===t+1?"active":""}"
          data-page="${t+1}">
          ${t+1}
        </button>
      </li>
    `).join("")}}n.paginationCards&&n.paginationCards.addEventListener("click",e=>{const s=e.target.closest(".pagination-btn");s&&(g=Number(s.dataset.page),m())});const m=()=>{if(!document.querySelector(".favourite_exercises"))return;const e=b(u)||[],s=Y(e);if(!s.length){n.noCards.classList.remove("visually-hidden"),n.noCardsContainer.classList.remove("visually-hidden"),n.cardSet.classList.add("visually-hidden"),n.paginationCards.innerHTML="";return}if(n.noCards.classList.add("visually-hidden"),n.noCardsContainer.classList.add("visually-hidden"),n.cardSet.classList.remove("visually-hidden"),window.innerWidth<1440){const t=Math.ceil(s.length/y);g>t&&(g=t),C(U(s,g)),K(t)}else C(s),n.paginationCards.innerHTML=""};window.addEventListener("resize",()=>{g=1,m()});m();H(n.quoteContainer);async function G(e,{email:s,rate:t,comment:o}){const r=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;t=Number(t);const i=await fetch(r,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,rate:t,review:o})});if(!i.ok){const a=await i.json();throw new Error(a.message||"Rating failed")}return i.json()}const V=document.getElementById("form-close-btn"),p=document.querySelector(".backdrop"),B=document.querySelector("#user-email"),M=document.getElementById("user-comment"),X=document.querySelector(".form-send-btn"),Z=document.querySelector(".rating-wrapper"),T=document.querySelector(".rating-star-value"),ee=document.querySelector(".backdrop-form");let P=null;const c={rate:0,email:"",comment:""};X.disabled=!1;function te(){B.value="",M.value="",c.rate=0,c.comment="",c.email="",T.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(s=>{s.style.fill="var(--white-20)"})}V.addEventListener("click",()=>{p.classList.remove("is-open")});p.addEventListener("click",e=>{e.target===p&&p.classList.remove("is-open")});Z.addEventListener("click",e=>{const s=document.querySelectorAll(".rating-star-icons");if(e.target.dataset.id){c.rate=Number(e.target.dataset.id);for(let t=0;t<5;t++)s[t].style.fill=t<c.rate?"var(--orange-color)":"var(--white-20)";T.textContent=`${c.rate}.0`}});function se(e){P=e,p.classList.add("is-open")}ee.addEventListener("submit",re);async function re(e){if(e.preventDefault(),c.email=B.value.trim(),c.comment=M.value.trim()||void 0,!c.rate){v.error({message:"Please select a rating",position:"topRight",color:"red"});return}if(c.email)try{await G(P,c),v.success({message:"Your rating is accepted",position:"topRight",color:"green"}),te(),p.classList.remove("is-open")}catch(s){v.error({message:`${s.message}`,position:"topRight",color:"red"})}else v.error({message:"Please enter your email",position:"topRight",color:"red"})}const l=document.querySelector(".exr-card-backdrop");let d=!1,f=[],N=JSON.parse(localStorage.getItem("favourite"));N&&N.forEach(e=>{f[0]||(f[0]=e),f.push(e)});function h(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function ie(e,s=!1,t=!1){d=s,d||f.forEach(o=>{o._id===e._id&&(d=!0)}),oe(e),l.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),d===!0&&(document.querySelector(".add-favourite-btn").innerHTML=`Remove from
          <svg class="heart-icon">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`)}function oe(e,s){let t=e.rating;t%1===0&&(t+=".0"),t=parseFloat(t).toFixed(1);const o=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon" width="12px" height="12px">
        <use href="/js_university_projectNew/symbol-defs.svg#icon-x"></use>
      </svg>
      </button>
      <img src="${e.gifUrl}" alt="example-img" class="exr-image" />
      <div>
      <h3 class="exercise-name">${h(e.name)}</h3>
      <div class="rating-container">
        <ul class="star-rating-list">
          <li>
            <p class="rating-score">${t}</p>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_projectNew/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_projectNew/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_projectNew/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_projectNew/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_projectNew/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
        </ul>
      </div>
      <div class="exr-information-container">
        <div class="exr-info-block">
          <p class="info-label">Target</p>
          <p class="exr-info" id="exr-target">${h(e.target)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Body Part</p>
          <p class="exr-info" id="body-part">${h(e.bodyPart)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Equipment</p>
          <p class="exr-info" id="exr-equip">${h(e.equipment)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Popular</p>
          <p class="exr-info" id="exr-popularity">${e.popularity}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Burned Calories</p>
          <p class="exr-info" id="burned-cal">${e.burnedCalories}/${e.time} min</p>
        </div>
      </div>
      <p class="exr-description">${e.description}</p>
      <div class="buttons-cont">
        <button name="add-favorurite" class="add-favourite-btn">
          Add to favourites
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>
        </button>
        <button name="rating" class="give-rating-btn">Give a rating</button>
      </div>
    </div>`;l.innerHTML=o;const r=document.querySelectorAll(".star-rating-icon");for(let a=0;a<Math.round(e.rating);++a)r[a].style.fill="#eea10c";const i=document.querySelector(".add-favourite-btn");i.addEventListener("click",function(){d?(k(e._id),i.innerHTML=`Add to favourite
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`,d=!1):(f.push(e),F(f),i.innerHTML=`Remove from
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`,d=!0),m()}),document.getElementById("close-card").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable")}),l.addEventListener("click",a=>{a.target===l&&(l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"))}),document.querySelector(".give-rating-btn").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),se(e._id)})}export{H as d,ie as h};
//# sourceMappingURL=exercises_card-CrNWY-mT.js.map
