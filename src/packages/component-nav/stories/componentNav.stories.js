import { html } from 'lit-element';
import '../component-nav.js'
export default {
    title: 'Component Nav',
};

export const BasicCase = () => {
    return html`
       <component-nav></component-nav>
    `;
};

export const StickyBar = () => {
    return html`
       <component-nav .isSticky="${true}"></component-nav>
       <section style="height: 4000px; background: red"></section>
    `;
}