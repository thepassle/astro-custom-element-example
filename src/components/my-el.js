import { GenericTabs } from '@generic-components/components/generic-tabs/GenericTabs.js';


// const template = document.createElement('template');
// template.innerHTML = `hi WORLD`;
// debugger;
// class GenericTabs extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.appendChild(template.content.cloneNode(true));
//   }
// }

export const tagName = 'generic-tabs';
console.log(1, 'before upgrade');
// debugger;
customElements.define(tagName, GenericTabs);