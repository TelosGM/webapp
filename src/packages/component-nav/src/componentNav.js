import { LitElement, html, css } from "lit-element";
import { styleNav } from './componentNav.style.js';
import '../../component-search/component-search';
export class ComponentNav extends LitElement {
    static get styles() {
        return styleNav;
    }

    static get properties() {
        return {
            emailUser: { type: String },
            isSticky: { type: Boolean, attribute: 'sticky', reflect: true },
        }
    }

    constructor() {
        super();
        this.isSticky = false;
    }

    handleLogoutEvent(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('on-logout', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html `
           <ul class="container-nav">
               <li class="${this.isSticky ? 'sticky-item' : ''}">
                   ${this.emailUser}
               </li>
               <li>
                   <component-search></component-search>
               </li>
               <li>
                   <button @click="${this.handleLogoutEvent}">logout</button>
               </li>
               <li>
                <slot name="slot1"></slot>
               </li>
               <li>
                <slot name="slot2"></slot>
               </li>
           </ul>
        `;
    }

}