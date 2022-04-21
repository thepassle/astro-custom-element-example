class a extends HTMLElement{constructor(){super(),this.updateComplete=this.__resolver(),this.__uuid=a.uuid++}update(){}async requestUpdate(s){this.__renderRequest||(this.__renderRequest=!0,await 0,this.update(),s&&(this.constructor.config.disabled&&this.hasAttribute("disabled")||this.__dispatch()),this.__res(),this.updateComplete=this.__resolver(),this.__renderRequest=!1)}__dispatch(){}__resolver(){return new Promise(s=>{this.__res=s})}}a.uuid=0;const r={TAB:9,ENTER:13,SHIFT:16,ESC:27,SPACE:32,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40},c=n=>class extends n{constructor(){super(),this.__onClick=this.__onClick.bind(this),this.__onKeyDown=this.__onKeyDown.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.hasAttribute("selected")?this.__index=Number(this.getAttribute("selected")):(this.__index=0,this.requestUpdate(!1)),this.shadowRoot.addEventListener("click",this.__onClick),this.shadowRoot.addEventListener("keydown",this.__onKeyDown),this.shadowRoot.addEventListener("slotchange",async()=>{this.requestUpdate(!1)})}static get observedAttributes(){return["selected"]}attributeChangedCallback(e,i,t){e==="selected"&&t!==i&&(this.__index=Number(this.getAttribute("selected")),this.requestUpdate(!0))}getElements(){const e={};return Object.entries(this.constructor.config.selectors).forEach(([i,t])=>{e[i]=t.selector(this)}),e}__getFocusableElements(){return[...Object.entries(this.constructor.config.selectors).find(([,i])=>i.focusTarget)[1].selector(this)]}__dispatch(){const{selected:e}=this;this.dispatchEvent(new CustomEvent("selected-changed",{detail:e}))}__focus(){this.__getFocusableElements()[this.__index].focus()}__onClick(e){if(this.constructor.config.disabled&&this.hasAttribute("disabled"))return;const i=this.__getFocusableElements();![...i].includes(e.target)||(this.__index=i.indexOf(e.target),this.requestUpdate(!0),this.constructor.config.shouldFocus&&this.__focus())}__onKeyDown(e){if(this.constructor.config.disabled&&this.hasAttribute("disabled"))return;const i=this.__getFocusableElements();let{orientation:t,multiDirectional:l}=this.constructor.config;switch(t==="horizontal"&&l&&this.hasAttribute("vertical")&&(t="vertical"),e.keyCode){case(t==="horizontal"?r.LEFT:r.UP):this.__index===0?this.__index=i.length-1:this.__index--;break;case(t==="horizontal"?r.RIGHT:r.DOWN):this.__index===i.length-1?this.__index=0:this.__index++;break;case r.HOME:this.__index=0;break;case r.END:this.__index=i.length-1;break;default:return}e.preventDefault(),this.constructor.config.activateOnKeydown&&this.requestUpdate(!0),this.constructor.config.shouldFocus&&this.__focus()}get selected(){return this.__index}set selected(e){this.__index=e,e!==null&&this.requestUpdate(!0)}},o=document.createElement("template");o.innerHTML=`
  <style>
    :host {
      display: block;
    }

    :host([vertical]) {
      display: flex;
    }

    :host([vertical]) div[role="tablist"] {
      flex-direction: column;
    }

    div[role="tablist"] {
      display: flex;
      gap: 0.5rem;
    }
  </style>
  
  <slot></slot>

  <div part="tablist" role="tablist">
    <slot name="tab"></slot>
  </div>

  <div part="panel">
    <slot name="panel"></slot>
  </div>
`;class h extends c(a){static get config(){return{selectors:{tabs:{selector:s=>Array.from(s.children).filter(e=>e.matches('h1, h2, h3, h4, h5, h6, [slot="tab"]')),focusTarget:!0},panels:{selector:s=>Array.from(s.children).filter(e=>e.matches('h1 ~ *, h2 ~ *, h3 ~ *, h4 ~ *, h5 ~ *, h6 ~ *, [slot="panel"]')&&!e.matches('h1, h2, h3, h4, h5, h6, [slot="tab"]'))}},multiDirectional:!0,orientation:"horizontal",shouldFocus:!0,activateOnKeydown:!0,disabled:!1}}static get observedAttributes(){return[...super.observedAttributes,"vertical"]}attributeChangedCallback(s,e,i){super.attributeChangedCallback(s,e,i),s==="vertical"&&this.requestUpdate(!1)}connectedCallback(){super.connectedCallback(),this.shadowRoot.querySelector('[role="tablist"]').setAttribute("aria-label",this.getAttribute("label")||"tablist")}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(o.content.cloneNode(!0))}update(){const{tabs:s,panels:e}=this.getElements();s.forEach((i,t)=>{s[t].slot="tab",t===this.selected?(s[t].setAttribute("selected",""),s[t].setAttribute("aria-selected","true"),s[t].setAttribute("tabindex","0"),e[t].removeAttribute("hidden"),this.value=s[t].textContent.trim()):(s[t].removeAttribute("selected"),s[t].setAttribute("aria-selected","false"),s[t].setAttribute("tabindex","-1"),e[t].setAttribute("hidden","")),s[t].id.startsWith("generic-tab-")||(s[t].setAttribute("role","tab"),e[t].setAttribute("role","tabpanel"),s[t].id=`generic-tab-${this.__uuid}-${t}`,s[t].setAttribute("aria-controls",`generic-tab-${this.__uuid}-${t}`),e[t].setAttribute("aria-labelledby",`generic-tab-${this.__uuid}-${t}`))}),e.forEach((i,t)=>{e[t].slot="panel"})}}const d="generic-tabs";console.log(1,"before upgrade");debugger;customElements.define(d,h);export{d as tagName};
