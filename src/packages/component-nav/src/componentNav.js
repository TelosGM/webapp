import { LitElement, html, css } from "lit-element";

export class ComponentNav extends LitElement {
    static get styles() {
        return css`
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

    render() {
        return html `
           <ul class="container-nav">
               <li>
                   ${this.emailUser}
               </li>
               <li>
                   <button>logout</button>
               </li>
           </ul>
        `;
    }

}