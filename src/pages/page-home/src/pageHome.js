import { LitElement, css, html } from "lit-element";
import '../../../packages/component-nav/component-nav';
import '../../../packages/component-card/component-card';


export class PageHome extends  LitElement {
    
    render() {
        return html `
            <component-nav .emailUser="${sessionStorage.getItem('emailUserLogin')}"></component-nav>
            <section>
                ${[1,2,3].map((element) => html`
                <component-card></component-card>
            `)}
            </section>

        `;
    }
}