import{a as f,i as a,S as p}from"./assets/vendor-DuKcLXOA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const m="56318160-8874d10fff9d5cc9a89c98525",h="https://pixabay.com/api/";async function y(o){const e={key:m,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await f.get(h,{params:e})).data}function g(o){return o.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${e.likes}</p>
          <p><b>Views:</b> ${e.views}</p>
          <p><b>Comments:</b> ${e.comments}</p>
          <p><b>Downloads:</b> ${e.downloads}</p>
        </div>
      </li>
    `).join("")}const L=document.querySelector(".search-form"),l=document.querySelector(".gallery"),d=document.querySelector(".loader-container");let n=null;function u(){n&&(n.destroy(),n=null),n=new p(".gallery a",{captionsData:"alt",captionDelay:250})}function b(){d.classList.remove("hidden")}function w(){d.classList.add("hidden")}L.addEventListener("submit",v);async function v(o){o.preventDefault();const e=o.target.elements.searchQuery.value.trim();if(!e){a.error({title:"Error",message:"Please enter a search query!",position:"topLeft"});return}try{b();const s=await y(e);if(!s.hits.length){l.innerHTML="",u(),a.info({title:"Немає результатів",message:"За вашим запитом нічого не знайдено.",position:"topRight"});return}l.innerHTML=g(s.hits),u()}catch(s){console.error(s),a.error({title:"Помилка",message:"Щось пішло не так. Спробуйте пізніше.",position:"topRight"})}finally{w()}}
//# sourceMappingURL=index.js.map
