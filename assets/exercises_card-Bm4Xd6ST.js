import{i as v}from"./vendor-I1I71QQ2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const u="favourite",A=e=>{localStorage.setItem(u,JSON.stringify(e))},b=e=>{try{return JSON.parse(localStorage.getItem(e))}catch(s){console.log(s.message)}},$=e=>{const s=b(u).filter(t=>t._id!==e);localStorage.removeItem(u),localStorage.setItem(u,JSON.stringify(s))},w=window.location.pathname,k=document.getElementById("homeLink"),E=document.getElementById("favoritesLink");k.classList.remove("active");E.classList.remove("active");w.includes("index.html")?k.classList.add("active"):w.includes("favorites.html")&&E.classList.add("active");const T=document.querySelector(".open-mobile-menu-btn"),R=document.querySelector(".close-mobile-menu-btn"),_=document.querySelector(".mobile-menu-wrapper");T.addEventListener("click",function(){_.classList.add("is-open"),document.body.classList.add("not-scrollable")});R.addEventListener("click",function(){_.classList.remove("is-open"),document.body.classList.remove("not-scrollable")});const n={cardSet:document.querySelector(".fav_card_list"),noCards:document.querySelector(".no_cards_wrapper"),quoteContainer:document.querySelector(".quote"),noCardsContainer:document.querySelector(".no_cards_wrapper-container"),paginationCards:document.querySelector(".pagination-cards")};let g=1;const y=8,O=(e,s)=>{const t=(s-1)*y,o=t+y;return e.slice(t,o)},H=e=>{const s=new Set;return e.filter(t=>s.has(t._id)?!1:(s.add(t._id),!0))},q=e=>{const s=e.map(({name:t,_id:o,burnedCalories:i,bodyPart:r,target:a,time:M=3})=>{let L=`${i} / ${M} min`,x=r,S=a;return t.length>32&&(t=t.slice(0,26)+"..."),window.innerWidth<1440&&(t.length>24&&(t=t.slice(0,20)+"..."),x="...",S="..."),window.innerWidth<768&&(L=`${i} /... min`,t.length>22&&(t=t.slice(0,18)+"...")),`
        <li class="exercise-information" data-id-card="${o}" data-component="fav_card">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <button
                data-id-del-btn="${o}"
                data-action="delete_fav_card"
                class="trash-btn">
                <svg class="trash-icon" width="16" height="16">
                  <use href="../img/icons/symbol-defs.svg#icon-trash"></use>
                </svg>
              </button>
            </div>

            <div class="actions">
              <button
                data-id-start-btn="${o}"
                data-action="start_exercise_btn"
                class="details-link">
                Start
                <svg class="arrow-icon" width="16" height="16">
                  <use href="../img/icons/symbol-defs.svg#icon-arrow"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="exercise-header">
            <svg class="icon-man" width="24" height="24">
              <use href="../img/icons/symbol-defs.svg#icon-run"></use>
            </svg>
            <h2 class="exercise-name">${t}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${L}</li>
            <li><span>Body part:</span> ${x}</li>
            <li><span>Target:</span> ${S}</li>
          </ul>
        </li>
      `}).join("");n.cardSet.innerHTML=s},N=e=>{const s=e.target.closest('[data-action="start_exercise_btn"]'),t=e.target.closest('[data-action="delete_fav_card"]');if(e.target.closest('[data-component="fav_card"]'),!(!s&&!t)){if(t){$(t.dataset.idDelBtn),p();return}if(s){const i=b(u).find(r=>r._id===s.dataset.idStartBtn);i&&X(i,!0,!0)}}};n.cardSet&&n.cardSet.addEventListener("click",N);function j(e){if(n.paginationCards){if(e<=1){n.paginationCards.innerHTML="";return}n.paginationCards.innerHTML=Array.from({length:e},(s,t)=>`
      <li>
        <button
          class="pagination-btn ${g===t+1?"active":""}"
          data-page="${t+1}">
          ${t+1}
        </button>
      </li>
    `).join("")}}n.paginationCards&&n.paginationCards.addEventListener("click",e=>{const s=e.target.closest(".pagination-btn");s&&(g=Number(s.dataset.page),p())});const p=()=>{if(!document.querySelector(".favourite_exercises"))return;const e=b(u),s=H(e);if(!s.length){n.noCards.classList.remove("visually-hidden"),n.noCardsContainer.classList.remove("visually-hidden"),n.cardSet.classList.add("visually-hidden"),n.paginationCards.innerHTML="";return}if(n.noCards.classList.add("visually-hidden"),n.noCardsContainer.classList.add("visually-hidden"),n.cardSet.classList.remove("visually-hidden"),window.innerWidth<1440){const t=Math.ceil(s.length/y);g>t&&(g=t),q(O(s,g)),j(t)}else q(s),n.paginationCards.innerHTML=""};async function J(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function W(){try{const{quote:e,author:s}=await J();n.quoteContainer.innerHTML=`
      <svg width="32" height="32" class="quote-text-icon">
        <use href="../img/icons/symbol-defs.svg#icon-run"></use>
      </svg>
      <div>
        <h3 class="main-quote-title">Quote of the day</h3>
        <p class="main-quote-text">${e}</p>
        <p class="main-quote-author">${s}</p>
        <svg width="24" height="24" class="quote-text-icon-commas">
          <use href="../img/icons/symbol-defs.svg#icon-commas"></use>
        </svg>
      </div>
    `}catch(e){console.error(e)}}window.addEventListener("resize",()=>{g=1,p()});p();W();async function D(e,{email:s,rate:t,comment:o}){const i=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;t=Number(t);const r=await fetch(i,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,rate:t,review:o})});if(!r.ok){const a=await r.json();throw new Error(a.message||"Rating failed")}return r.json()}const z=document.getElementById("form-close-btn"),m=document.querySelector(".backdrop"),B=document.querySelector("#user-email"),I=document.getElementById("user-comment"),Q=document.querySelector(".form-send-btn"),G=document.querySelector(".rating-wrapper"),P=document.querySelector(".rating-star-value"),U=document.querySelector(".backdrop-form");let F=null;const c={rate:0,email:"",comment:""};Q.disabled=!1;function V(){B.value="",I.value="",c.rate=0,c.comment="",c.email="",P.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(s=>{s.style.fill="var(--white-20)"})}z.addEventListener("click",()=>{m.classList.remove("is-open")});m.addEventListener("click",e=>{e.target===m&&m.classList.remove("is-open")});G.addEventListener("click",e=>{const s=document.querySelectorAll(".rating-star-icons");if(e.target.dataset.id){c.rate=Number(e.target.dataset.id);for(let t=0;t<5;t++)s[t].style.fill=t<c.rate?"var(--orange-color)":"var(--white-20)";P.textContent=`${c.rate}.0`}});function K(e){F=e,m.classList.add("is-open")}U.addEventListener("submit",Y);async function Y(e){if(e.preventDefault(),c.email=B.value.trim(),c.comment=I.value.trim()||void 0,!c.rate){v.error({message:"Please select a rating",position:"topRight",color:"red"});return}if(c.email)try{await D(F,c),v.success({message:"Your rating is accepted",position:"topRight",color:"green"}),V(),m.classList.remove("is-open")}catch(s){v.error({message:`${s.message}`,position:"topRight",color:"red"})}else v.error({message:"Please enter your email",position:"topRight",color:"red"})}const l=document.querySelector(".exr-card-backdrop");let d=!1,f=[],C=JSON.parse(localStorage.getItem("favourite"));C&&C.forEach(e=>{f[0]||(f[0]=e),f.push(e)});function h(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function X(e,s=!1,t=!1){d=s,d||f.forEach(o=>{o._id===e._id&&(d=!0)}),Z(e),l.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),d===!0&&(document.querySelector(".add-favourite-btn").innerHTML=`Remove from
          <svg class="heart-icon">
            <use href="../img/icons/symbol-defs.svg#icon-heart"></use>
          </svg>`)}function Z(e,s){let t=e.rating;t%1===0&&(t+=".0"),t=parseFloat(t).toFixed(1);const o=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon" width="12px" height="12px">
        <use href="../img/icons/symbol-defs.svg#icon-x"></use>
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
              <use href="../img/icons/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="../img/icons/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="../img/icons/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="../img/icons/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="../img/icons/symbol-defs.svg#icon-star"></use>
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
            <use href="../img/icons/symbol-defs.svg#icon-heart"></use>
          </svg>
        </button>
        <button name="rating" class="give-rating-btn">Give a rating</button>
      </div>
    </div>`;l.innerHTML=o;const i=document.querySelectorAll(".star-rating-icon");for(let a=0;a<Math.round(e.rating);++a)i[a].style.fill="#eea10c";const r=document.querySelector(".add-favourite-btn");r.addEventListener("click",function(){d?($(e._id),r.innerHTML=`Add to favourite
          <svg class="heart-icon" width="20px" height="20px">
            <use href="../img/icons/symbol-defs.svg#icon-heart"></use>
          </svg>`,d=!1):(f.push(e),A(f),r.innerHTML=`Remove from
          <svg class="heart-icon" width="20px" height="20px">
            <use href="../img/icons/symbol-defs.svg#icon-heart"></use>
          </svg>`,d=!0),p()}),document.getElementById("close-card").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable")}),l.addEventListener("click",a=>{a.target===l&&(l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"))}),document.querySelector(".give-rating-btn").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),K(e._id)})}export{X as h};
//# sourceMappingURL=exercises_card-Bm4Xd6ST.js.map
