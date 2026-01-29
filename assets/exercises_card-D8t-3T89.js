import{i as m}from"./vendor-I1I71QQ2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const u="favourite",F=e=>{localStorage.setItem(u,JSON.stringify(e))},b=e=>{try{return JSON.parse(localStorage.getItem(e))}catch(s){console.log(s.message)}},j=e=>{const s=b(u).filter(t=>t._id!==e);localStorage.removeItem(u),localStorage.setItem(u,JSON.stringify(s))},_=window.location.pathname,C=document.getElementById("homeLink"),$=document.getElementById("favoritesLink");C.classList.remove("active");$.classList.remove("active");_.includes("index.html")?C.classList.add("active"):_.includes("favorites.html")&&$.classList.add("active");const M=document.querySelector(".open-mobile-menu-btn"),A=document.querySelector(".close-mobile-menu-btn"),k=document.querySelector(".mobile-menu-wrapper");M.addEventListener("click",function(){k.classList.add("is-open"),document.body.classList.add("not-scrollable")});A.addEventListener("click",function(){k.classList.remove("is-open"),document.body.classList.remove("not-scrollable")});const n={cardSet:document.querySelector(".fav_card_list"),noCards:document.querySelector(".no_cards_wrapper"),quoteContainer:document.querySelector(".quote"),noCardsContainer:document.querySelector(".no_cards_wrapper-container"),paginationCards:document.querySelector(".pagination-cards")};let f=1;const y=8,T=(e,s)=>{const t=(s-1)*y,o=t+y;return e.slice(t,o)},R=e=>{const s=new Set;return e.filter(t=>s.has(t._id)?!1:(s.add(t._id),!0))},S=e=>{const s=e.map(({name:t,_id:o,burnedCalories:r,bodyPart:i,target:a,time:P=3})=>{let L=`${r} / ${P} min`,w=i,x=a;return t.length>32&&(t=t.slice(0,26)+"..."),window.innerWidth<1440&&(t.length>24&&(t=t.slice(0,20)+"..."),w="...",x="..."),window.innerWidth<768&&(L=`${r} /... min`,t.length>22&&(t=t.slice(0,18)+"...")),`
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
            <li><span>Burned calories:</span> ${L}</li>
            <li><span>Body part:</span> ${w}</li>
            <li><span>Target:</span> ${x}</li>
          </ul>
        </li>
      `}).join("");n.cardSet.innerHTML=s},O=e=>{const s=e.target.closest('[data-action="start_exercise_btn"]'),t=e.target.closest('[data-action="delete_fav_card"]');if(e.target.closest('[data-component="fav_card"]'),!(!s&&!t)){if(t){j(t.dataset.idDelBtn),v();return}if(s){const r=b(u).find(i=>i._id===s.dataset.idStartBtn);r&&X(r,!0,!0)}}};n.cardSet&&n.cardSet.addEventListener("click",O);function H(e){if(n.paginationCards){if(e<=1){n.paginationCards.innerHTML="";return}n.paginationCards.innerHTML=Array.from({length:e},(s,t)=>`
      <li>
        <button
          name="pagination"
          class="pagination-btn ${f===t+1?"active":""}"
          data-page="${t+1}">
          ${t+1}
        </button>
      </li>
    `).join("")}}n.paginationCards&&n.paginationCards.addEventListener("click",e=>{const s=e.target.closest(".pagination-btn");s&&(f=Number(s.dataset.page),v())});const v=()=>{if(!document.querySelector(".favourite_exercises"))return;const e=b(u),s=R(e);if(!s.length){n.noCards.classList.remove("visually-hidden"),n.noCardsContainer.classList.remove("visually-hidden"),n.cardSet.classList.add("visually-hidden"),n.paginationCards.innerHTML="";return}if(n.noCards.classList.add("visually-hidden"),n.noCardsContainer.classList.add("visually-hidden"),n.cardSet.classList.remove("visually-hidden"),window.innerWidth<1440){const t=Math.ceil(s.length/y);f>t&&(f=t),S(T(s,f)),H(t)}else S(s),n.paginationCards.innerHTML=""};async function J(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function W(){try{const{quote:e,author:s}=await J();n.quoteContainer.innerHTML=`
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
    `}catch(e){console.error(e)}}window.addEventListener("resize",()=>{f=1,v()});v();W();async function D(e,{email:s,rate:t,comment:o}){const r=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;t=Number(t);const i=await fetch(r,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,rate:t,review:o})});if(!i.ok){const a=await i.json();throw new Error(a.message||"Rating failed")}return i.json()}const z=document.getElementById("form-close-btn"),p=document.querySelector(".backdrop"),E=document.querySelector("#user-email"),N=document.getElementById("user-comment"),Q=document.querySelector(".form-send-btn"),G=document.querySelector(".rating-wrapper"),B=document.querySelector(".rating-star-value"),U=document.querySelector(".backdrop-form");let I=null;const c={rate:0,email:"",comment:""};Q.disabled=!1;function V(){E.value="",N.value="",c.rate=0,c.comment="",c.email="",B.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(s=>{s.style.fill="var(--white-20)"})}z.addEventListener("click",()=>{p.classList.remove("is-open")});p.addEventListener("click",e=>{e.target===p&&p.classList.remove("is-open")});G.addEventListener("click",e=>{const s=document.querySelectorAll(".rating-star-icons");if(e.target.dataset.id){c.rate=Number(e.target.dataset.id);for(let t=0;t<5;t++)s[t].style.fill=t<c.rate?"var(--orange-color)":"var(--white-20)";B.textContent=`${c.rate}.0`}});function K(e){I=e,p.classList.add("is-open")}U.addEventListener("submit",Y);async function Y(e){if(e.preventDefault(),c.email=E.value.trim(),c.comment=N.value.trim()||void 0,!c.rate){m.error({message:"Please select a rating",position:"topRight",color:"red"});return}if(c.email)try{await D(I,c),m.success({message:"Your rating is accepted",position:"topRight",color:"green"}),V(),p.classList.remove("is-open")}catch(s){m.error({message:`${s.message}`,position:"topRight",color:"red"})}else m.error({message:"Please enter your email",position:"topRight",color:"red"})}const l=document.querySelector(".exr-card-backdrop");let d=!1,g=[],q=JSON.parse(localStorage.getItem("favourite"));q&&q.forEach(e=>{g[0]||(g[0]=e),g.push(e)});function h(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function X(e,s=!1,t=!1){d=s,d||g.forEach(o=>{o._id===e._id&&(d=!0)}),Z(e),l.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),d===!0&&(document.querySelector(".add-favourite-btn").innerHTML=`Remove from
          <svg class="heart-icon">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`)}function Z(e,s){let t=e.rating;t%1===0&&(t+=".0"),t=parseFloat(t).toFixed(1);const o=`
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
    </div>`;l.innerHTML=o;const r=document.querySelectorAll(".star-rating-icon");for(let a=0;a<Math.round(e.rating);++a)r[a].style.fill="#eea10c";const i=document.querySelector(".add-favourite-btn");i.addEventListener("click",function(){d?(j(e._id),i.innerHTML=`Add to favourite
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`,d=!1):(g.push(e),F(g),i.innerHTML=`Remove from
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`,d=!0),v()}),document.getElementById("close-card").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable")}),l.addEventListener("click",a=>{a.target===l&&(l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"))}),document.querySelector(".give-rating-btn").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),K(e._id)})}export{X as h};
//# sourceMappingURL=exercises_card-D8t-3T89.js.map
