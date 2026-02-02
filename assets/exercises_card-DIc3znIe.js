import{i as v}from"./vendor-I1I71QQ2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const d="favourite",W=e=>{localStorage.setItem(d,JSON.stringify(e))},L=e=>{try{return JSON.parse(localStorage.getItem(e))}catch(s){console.log(s.message)}},M=e=>{const s=L(d).filter(t=>t._id!==e);localStorage.removeItem(d),localStorage.setItem(d,JSON.stringify(s))},k="daily_quote",C="daily_quote_time",U=24*60*60*1e3;async function Y(){const e=localStorage.getItem(k),s=localStorage.getItem(C);if(e&&s&&Date.now()-Number(s)<U)return JSON.parse(e);try{const n=await(await fetch("https://your-energy.b.goit.study/api/quote")).json();return localStorage.setItem(k,JSON.stringify(n)),localStorage.setItem(C,Date.now().toString()),n}catch(t){return console.error("Error fetching quote:",t),e?JSON.parse(e):{quote:"No quote available",author:""}}}const z=async e=>{const{quote:s,author:t}=await Y();e.innerHTML=K(s,t)},K=(e,s)=>`
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
`,N=window.location.pathname,I=document.getElementById("homeLink"),B=document.getElementById("favoritesLink");I.classList.remove("active");B.classList.remove("active");N.includes("index.html")?I.classList.add("active"):N.includes("favorites.html")&&B.classList.add("active");const G=document.querySelector(".open-mobile-menu-btn"),V=document.querySelector(".close-mobile-menu-btn"),S=document.querySelector(".mobile-menu-wrapper"),X=document.querySelector(".mobile-menu");G.addEventListener("click",()=>{S.classList.add("is-open"),document.body.classList.add("not-scrollable")});V.addEventListener("click",()=>{T()});S.addEventListener("click",()=>{T()});X.addEventListener("click",e=>{e.stopPropagation()});function T(){S.classList.remove("is-open"),document.body.classList.remove("not-scrollable")}const o={cardSet:document.querySelector(".fav_card_list"),noCards:document.querySelector(".no_cards_wrapper"),quoteContainer:document.querySelector(".quote"),noCardsContainer:document.querySelector(".no_cards_wrapper-container"),paginationCards:document.querySelector(".pagination-cards")};let u=1;const _=8,Z=(e,s)=>{const t=(s-1)*_,n=t+_;return e.slice(t,n)},ee=(e=[])=>{const s=new Set;return e.filter(t=>!(t!=null&&t._id)||s.has(t._id)?!1:(s.add(t._id),!0))},$=e=>{const s=e.map(({name:t,_id:n,burnedCalories:r,bodyPart:i,target:a,time:Q=3})=>{let x=`${r} / ${Q} min`,E=i,q=a;return t.length>32&&(t=t.slice(0,26)+"..."),window.innerWidth<1440&&(t.length>24&&(t=t.slice(0,20)+"..."),E="...",q="..."),window.innerWidth<768&&(x=`${r} /... min`,t.length>22&&(t=t.slice(0,18)+"...")),`
        <li class="exercise-information" data-id-card="${n}" data-component="fav_card">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <button
                name="trash"
                data-id-del-btn="${n}"
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
                data-id-start-btn="${n}"
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
            <li><span>Burned calories:</span> ${x}</li>
            <li><span>Body part:</span> ${E}</li>
            <li><span>Target:</span> ${q}</li>
          </ul>
        </li>
      `}).join("");o.cardSet.innerHTML=s},te=e=>{const s=e.target.closest('[data-action="start_exercise_btn"]'),t=e.target.closest('[data-action="delete_fav_card"]');if(!(!s&&!t)){if(t){M(t.dataset.idDelBtn),p();return}if(s){const r=(L(d)||[]).find(i=>i._id===s.dataset.idStartBtn);r&&J(r,!0,!0)}}};o.cardSet&&o.cardSet.addEventListener("click",te);function se(e){if(o.paginationCards){if(e<=1){o.paginationCards.innerHTML="";return}o.paginationCards.innerHTML=Array.from({length:e},(s,t)=>`
      <li>
        <button
          name="pagination"
          class="pagination-btn ${u===t+1?"active":""}"
          data-page="${t+1}">
          ${t+1}
        </button>
      </li>
    `).join("")}}o.paginationCards&&o.paginationCards.addEventListener("click",e=>{const s=e.target.closest(".pagination-btn");s&&(u=Number(s.dataset.page),p())});const p=()=>{if(!document.querySelector(".favourite_exercises"))return;const e=L(d)||[],s=ee(e);if(!s.length){o.noCards.classList.remove("visually-hidden"),o.noCardsContainer.classList.remove("visually-hidden"),o.cardSet.classList.add("visually-hidden"),o.paginationCards.innerHTML="";return}if(o.noCards.classList.add("visually-hidden"),o.noCardsContainer.classList.add("visually-hidden"),o.cardSet.classList.remove("visually-hidden"),window.innerWidth<1440){const t=Math.ceil(s.length/_);u>t&&(u=t),$(Z(s,u)),se(t)}else $(s),o.paginationCards.innerHTML=""};window.addEventListener("resize",()=>{u=1,p()});p();z(o.quoteContainer);async function re(e,{email:s,rate:t,comment:n}){const r=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;t=Number(t);const i=await fetch(r,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,rate:t,review:n})});if(!i.ok){const a=await i.json();throw new Error(a.message||"Rating failed")}return i.json()}const ie=document.getElementById("form-close-btn"),y=document.querySelector(".backdrop"),P=document.querySelector("#user-email"),O=document.getElementById("user-comment");document.querySelector(".form-send-btn");const ne=document.querySelector(".rating-wrapper"),F=document.querySelector(".rating-star-value"),oe=document.querySelector(".backdrop-form");let A=null,w=null;const c={rate:0,email:"",comment:""};function ae(){P.value="",O.value="",c.rate=0,c.comment="",c.email="",F.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(s=>{s.style.fill="var(--white-20)"})}function R(e){e.key==="Escape"&&b(!0)}function b(e=!1){y.classList.remove("is-open"),document.removeEventListener("keydown",R),e&&w&&J(w)}ie.addEventListener("click",()=>b(!0));y.addEventListener("click",e=>{e.target===y&&b(!0)});ne.addEventListener("click",e=>{if(!e.target.dataset.id)return;c.rate=Number(e.target.dataset.id),F.textContent=`${c.rate}.0`;const s=document.querySelectorAll(".rating-star-icons");for(let t=0;t<5;t++)s[t].style.fill=t<c.rate?"var(--orange-color)":"var(--white-20)"});function ce(e,s=null){A=e,w=s,y.classList.add("is-open"),document.addEventListener("keydown",R)}oe.addEventListener("submit",async e=>{if(e.preventDefault(),c.email=P.value.trim(),c.comment=O.value.trim()||void 0,!c.rate){v.error({message:"Please select a rating",position:"topRight",color:"red"});return}if(!c.email){v.error({message:"Please enter your email",position:"topRight",color:"red"});return}try{await re(A,c),v.success({message:"Your rating is accepted",position:"topRight",color:"green"}),ae(),b(!0)}catch(s){v.error({message:`${s.message}`,position:"topRight",color:"red"})}});const f=document.querySelector(".exr-card-backdrop");let l=!1,g=[],j=JSON.parse(localStorage.getItem("favourite"));j&&j.forEach(e=>{g[0]||(g[0]=e),g.push(e)});let H=null;function m(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function J(e,s=!1,t=!1){H=e,l=s,l||g.forEach(n=>{n._id===e._id&&(l=!0)}),le(e),f.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),document.addEventListener("keydown",D),l===!0&&(document.querySelector(".add-favourite-btn").innerHTML=`Remove from
          <svg class="heart-icon">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`)}function le(e,s){let t=e.rating;t%1===0&&(t+=".0"),t=parseFloat(t).toFixed(1);const n=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon"">
        <use href="/js_university_projectNew/symbol-defs.svg#icon-x"></use>
      </svg>
      </button>
      <img src="${e.gifUrl}" alt="example-img" class="exr-image" />
      <div>
      <h3 class="exercise-name">${m(e.name)}</h3>
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
          <p class="exr-info" id="exr-target">${m(e.target)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Body Part</p>
          <p class="exr-info" id="body-part">${m(e.bodyPart)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Equipment</p>
          <p class="exr-info" id="exr-equip">${m(e.equipment)}</p>
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
    </div>`;f.innerHTML=n;const r=document.querySelectorAll(".star-rating-icon");for(let a=0;a<Math.round(e.rating);++a)r[a].style.fill="#eea10c";const i=document.querySelector(".add-favourite-btn");i.addEventListener("click",function(){l?(M(e._id),i.innerHTML=`Add to favourite
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`,l=!1):(g.push(e),W(g),i.innerHTML=`Remove from
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_projectNew/symbol-defs.svg#icon-heart"></use>
          </svg>`,l=!0),p()}),document.getElementById("close-card").addEventListener("click",h),f.addEventListener("click",a=>{a.target===f&&h()}),document.querySelector(".give-rating-btn").addEventListener("click",()=>{h(),ce(e._id,H)})}function D(e){e.key==="Escape"&&h()}function h(){f.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),document.removeEventListener("keydown",D)}export{z as d,J as h};
//# sourceMappingURL=exercises_card-DIc3znIe.js.map
