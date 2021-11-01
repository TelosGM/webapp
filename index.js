import { LitElement, html, css } from "lit-element";
import { RouterMixin } from "./src/core/router";
import './src/pages/page-login/page-login';
import './src/pages/page-home/page-home';
import { storybookPlugin } from '@web/dev-server-storybook';

class WebApp extends  RouterMixin(LitElement) {
    static get properties() {
        return {
            routes: { type: Array }
        }
    }

    constructor() {
        super();
        this.routes = [
            {
                path: '/',
                component: 'page-login',
            },
            {
                path: '/home',
                component: 'page-home',
            }
        ]
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
    }

    render() {
        return html `
           <section id="render-router">
           </section>
        `;
    }
}
export default {
    // type can be 'web-components' or 'preact'
    plugins: [storybookPlugin({ type: 'web-components' })],
  };
  
window.customElements.define('web-app', WebApp);