"use strict";(self.webpackChunkgracefullight_github_io=self.webpackChunkgracefullight_github_io||[]).push([["18815"],{62059:function(t,e,i){i.d(e,{zM:()=>d});let n=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting","waitingforkey","resize","enterpictureinpicture","leavepictureinpicture","webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"],s=["autopictureinpicture","disablepictureinpicture","disableremoteplayback","autoplay","controls","controlslist","crossorigin","loop","muted","playsinline","poster","preload","src"];function r(t){return`
    <style>
      :host {
        display: inline-flex;
        line-height: 0;
        flex-direction: column;
        justify-content: end;
      }

      audio {
        width: 100%;
      }
    </style>
    <slot name="media">
      <audio${l(t)}></audio>
    </slot>
    <slot></slot>
  `}function a(t){return`
    <style>
      :host {
        display: inline-block;
        line-height: 0;
      }

      video {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, 50% 50%);
      }

      video::-webkit-media-text-track-container {
        transform: var(--media-webkit-text-track-transform);
        transition: var(--media-webkit-text-track-transition);
      }
    </style>
    <slot name="media">
      <video${l(t)}></video>
    </slot>
    <slot></slot>
  `}function o(t,{tag:e,is:i}){let o=globalThis.document?.createElement?.(e,{is:i}),l=o?function(t){let e=[];for(let i=Object.getPrototypeOf(t);i&&i!==HTMLElement.prototype;i=Object.getPrototypeOf(i)){let t=Object.getOwnPropertyNames(i);e.push(...t)}return e}(o):[];return class d extends t{static getTemplateHTML=e.endsWith("audio")?r:a;static shadowRootOptions={mode:"open"};static Events=n;static #t=!1;static get observedAttributes(){return d.#e(),[...o?.constructor?.observedAttributes??[],...s]}static #e(){if(this.#t)return;this.#t=!0;let t=new Set(this.observedAttributes);for(let e of(t.delete("muted"),l))if(!(e in this.prototype))if("function"==typeof o[e])this.prototype[e]=function(...t){return this.#i(),(()=>{if(this.call)return this.call(e,...t);let i=this.nativeEl?.[e];return i?.apply(this.nativeEl,t)})()};else{let i={get(){this.#i();let i=e.toLowerCase();if(t.has(i)){let t=this.getAttribute(i);return null!==t&&(""===t||t)}return this.get?.(e)??this.nativeEl?.[e]}};e!==e.toUpperCase()&&(i.set=function(i){this.#i();let n=e.toLowerCase();return t.has(n)?void(!0===i||!1===i||null==i?this.toggleAttribute(n,!!i):this.setAttribute(n,i)):this.set?void this.set(e,i):void(this.nativeEl&&(this.nativeEl[e]=i))}),Object.defineProperty(this.prototype,e,i)}}#n=!1;#s=null;#r=new Map;#a;get;set;call;get nativeEl(){return this.#i(),this.#s??this.querySelector(":scope > [slot=media]")??this.querySelector(e)??this.shadowRoot?.querySelector(e)??null}set nativeEl(t){this.#s=t}get defaultMuted(){return this.hasAttribute("muted")}set defaultMuted(t){this.toggleAttribute("muted",t)}get src(){return this.getAttribute("src")}set src(t){this.setAttribute("src",`${t}`)}get preload(){return this.getAttribute("preload")??this.nativeEl?.preload}set preload(t){this.setAttribute("preload",`${t}`)}#i(){this.#n||(this.#n=!0,this.init())}init(){if(!this.shadowRoot){this.attachShadow({mode:"open"});let t=function(t){let e={};for(let i of t)e[i.name]=i.value;return e}(this.attributes);i&&(t.is=i),e&&(t.part=e),this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}for(let t of(this.nativeEl.muted=this.hasAttribute("muted"),l))this.#o(t);for(let t of(this.#a=new MutationObserver(this.#l.bind(this)),this.shadowRoot.addEventListener("slotchange",()=>this.#d()),this.#d(),this.constructor.Events))this.shadowRoot.addEventListener(t,this,!0)}handleEvent(t){t.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(t.type,{detail:t.detail}))}#d(){let t=new Map(this.#r),e=this.shadowRoot?.querySelector("slot:not([name])");(e?.assignedElements({flatten:!0}).filter(t=>["track","source"].includes(t.localName))).forEach(e=>{t.delete(e);let i=this.#r.get(e);i||(i=e.cloneNode(),this.#r.set(e,i),this.#a?.observe(e,{attributes:!0})),this.nativeEl?.append(i),this.#u(i)}),t.forEach((t,e)=>{t.remove(),this.#r.delete(e)})}#l(t){for(let e of t)if("attributes"===e.type){let{target:t,attributeName:i}=e,n=this.#r.get(t);n&&i&&(n.setAttribute(i,t.getAttribute(i)??""),this.#u(n))}}#u(t){t&&"track"===t.localName&&t.default&&("chapters"===t.kind||"metadata"===t.kind)&&"disabled"===t.track.mode&&(t.track.mode="hidden")}#o(t){if(Object.prototype.hasOwnProperty.call(this,t)){let e=this[t];delete this[t],this[t]=e}}attributeChangedCallback(t,e,i){this.#i(),this.#c(t,e,i)}#c(t,e,i){!["id","class"].includes(t)&&(!d.observedAttributes.includes(t)&&this.constructor.observedAttributes.includes(t)||(null===i?this.nativeEl?.removeAttribute(t):this.nativeEl?.getAttribute(t)!==i&&this.nativeEl?.setAttribute(t,i)))}connectedCallback(){this.#i()}}}function l(t){let e="";for(let i in t){if(!s.includes(i))continue;let n=t[i];""===n?e+=` ${i}`:e+=` ${i}="${n}"`}return e}let d=o(globalThis.HTMLElement??class{},{tag:"video"});o(globalThis.HTMLElement??class{},{tag:"audio"})},45114:function(t,e,i){i.r(e),i.d(e,{default:()=>c});var n=i(52136),s=i(62059);class r extends s.zM{static shadowRootOptions={...s.zM.shadowRootOptions};static getTemplateHTML=t=>{let{src:e,...i}=t;return s.zM.getTemplateHTML(i)};#h;attributeChangedCallback(t,e,i){"src"!==t&&super.attributeChangedCallback(t,e,i),"src"===t&&e!=i&&this.load()}async load(){if(this.#h)this.api.attachSource(this.src);else{this.#h=!0;let t=await i.e("53602").then(i.bind(i,99471));this.api=t.MediaPlayer().create(),this.api.initialize(this.nativeEl,this.src,this.autoplay)}}}globalThis.customElements&&!globalThis.customElements.get("dash-video")&&globalThis.customElements.define("dash-video",r);var a=new Set(["style","children","ref","key","suppressContentEditableWarning","suppressHydrationWarning","dangerouslySetInnerHTML"]),o={className:"class",htmlFor:"for"};function l(t){return t.toLowerCase()}function d(t){return"boolean"==typeof t?t?"":void 0:"function"==typeof t?void 0:"object"!=typeof t||null===t?t:void 0}function u(t,e,i){var n;t[e]=i,null==i&&e in((null==(n=globalThis.HTMLElement)?void 0:n.prototype)??{})&&t.removeAttribute(e)}var c=function({react:t,tagName:e,elementClass:i,events:n,displayName:s,defaultProps:r,toAttributeName:c=l,toAttributeValue:h=d}){let p=Number.parseInt(t.version)>=19,f=t.forwardRef((s,l)=>{var f,b;let m=t.useRef(null),v=t.useRef(new Map),g={},y={},w={},E={};for(let[t,e]of Object.entries(s)){if(a.has(t)){w[t]=e;continue}let n=c(o[t]??t);if(t in i.prototype&&!(t in((null==(f=globalThis.HTMLElement)?void 0:f.prototype)??{}))&&!(null==(b=i.observedAttributes)?void 0:b.some(t=>t===n))){E[t]=e;continue}if(t.startsWith("on")){g[t]=e;continue}let s=h(e);n&&null!=s&&(y[n]=String(s),p||(w[n]=s)),n&&p&&(s!==d(e)?w[n]=s:w[n]=e)}if("undefined"!=typeof window){for(let e in g){let i=g[e],s=e.endsWith("Capture"),r=((null==n?void 0:n[e])??e.slice(2).toLowerCase()).slice(0,s?-7:void 0);t.useLayoutEffect(()=>{let t=null==m?void 0:m.current;if(t&&"function"==typeof i)return t.addEventListener(r,i,s),()=>{t.removeEventListener(r,i,s)}},[null==m?void 0:m.current,i])}t.useLayoutEffect(()=>{if(null===m.current)return;let t=new Map;for(let e in E)u(m.current,e,E[e]),v.current.delete(e),t.set(e,E[e]);for(let[t,e]of v.current)u(m.current,t,void 0);v.current=t})}if("undefined"==typeof window&&(null==i?void 0:i.getTemplateHTML)&&(null==i?void 0:i.shadowRootOptions)){let{mode:e,delegatesFocus:n}=i.shadowRootOptions;w.children=[t.createElement("template",{shadowrootmode:e,shadowrootdelegatesfocus:n,dangerouslySetInnerHTML:{__html:i.getTemplateHTML(y,s)}}),w.children]}return t.createElement(e,{...r,...w,ref:t.useCallback(t=>{m.current=t,"function"==typeof l?l(t):null!==l&&(l.current=t)},[l])})});return f.displayName=s??i.name,f}({react:n,tagName:"dash-video",elementClass:r,toAttributeName:t=>"muted"===t?"":"defaultMuted"===t?"muted":l(t)})}}]);