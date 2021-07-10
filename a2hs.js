function AddToHomeScreen(e={}){var o=e.backgroundColor||"#f9f9f9",n=e.padding||"10px",t=e.shadowColor||"#e9e9e9",a=e.shadowSize||"10px",d=e.fontFamily||"-apple-system, sans-serif",i=e.color||"#5d5d5d",s=e.fontSize||"0.9rem",r=e.brandName||"",l=e.logoImage||`<svg enable-background="new 0 0 1952.00 734.93" height="25" viewBox="0 0 1952 734.93" width="70" xmlns="http://www.w3.org/2000/svg">
        <g stroke-linejoin="round" stroke-width=".2">
          <path d="m1436.62 603.304 56.39-142.599h162.82l-77.27-216.315 96.64-244.38947166 276.8 734.93247166h-204.13l-47.3-131.629z" fill="#3d3d3d"/>
          <path d="m1262.47 734.935 296.32-734.93343407-196.45.00097657-202.7 474.9304575-144.14-474.92948094h-151.001l-154.768 474.92948094-109.146-216.416-98.773 304.302 100.284 172.116h193.331l139.857-425.91 133.346 425.91z" fill="#5a0fc8"/>
          <path d="m186.476 482.643h121.003c36.654 0 69.293-4.091 97.917-12.273l31.293-96.408 87.459-269.446c-6.664-10.5625-14.272-20.5493-22.824-29.9591-44.905-49.7049-110.605-74.55649373-197.102-74.55649373h-304.22200381v734.93259373h186.47600381zm160.166-313.564c17.54 17.653 26.309 41.276 26.309 70.871 0 29.822-7.713 53.474-23.138 70.956-16.91 19.425-48.047 29.137-93.409 29.137h-69.928v-197.445h70.442c42.277 0 72.185 8.827 89.724 26.481z" fill="#3d3d3d"/>
        </g>
      </svg>`,c=e.htmlContent||`Install <strong>${r} web app</strong> on your iOS device: tap share and <strong>Add to Home Screen</strong> ↓`,e=/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()),r="standalone"in window.navigator&&window.navigator.standalone;if(e&&!r&&!window.localStorage.a2hs_message){const h=document.createElement("div"),g=document.createElement("style");g.innerHTML=`
      .a2hs__container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        box-sizing: border-box;
        box-shadow: ${t} 0 0 ${a};
        background-color: ${o};
        padding: ${n};
        width: 100%;
        bottom: 0;
        right: 0;
        left: 0;
      }
      .a2hs__container .a2hs__logo {
        padding: ${n};
      }
      .a2hs__container .a2hs__text {
        font-family: ${d};
        font-size: ${s};
        color: ${i};
      }`,h.innerHTML=`<div class="a2hs__logo">${l}</div>
      <div class="a2hs__text">${c}</div>`,h.setAttribute("class","a2hs__container"),h.onclick=function(e){e.preventDefault(),window.localStorage.setItem("a2hs_message","hide"),document.querySelector(".a2hs__container").remove()},document.head.appendChild(g),document.body.appendChild(h)}}