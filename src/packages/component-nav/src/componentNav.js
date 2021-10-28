import { LitElement, html, css } from "lit-element";
import '../../component-search/component-search';
export class ComponentNav extends LitElement {
    static get styles() {
        return css `
          :host {
            display: block;
          }
          
          .container-nav {
            list-style-type: none;
            margin: 0;
            padding: 0;
            background: darkgray;
            height: 60px;
            display: flex;
            align-items: center;
          }
        `;
    }

    static get properties() {
        return {
            emailUser: { type: String }
        }
    }

    handleLogoutEvent(event) {
        debugger
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('on-logout', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html `
           <ul class="container-nav">
               <li>
                   ${this.emailUser}
               </li>
               <li>
                   <component-search></component-search>
               </li>
               <li>
                   <button @click="${this.handleLogoutEvent}">logout</button>
               </li>
           </ul>
        `;
    }

}