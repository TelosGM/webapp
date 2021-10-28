import { LitElement, css, html } from "lit-element";
import '../../../packages/component-nav/component-nav';
import '../../../packages/component-card/component-card';
import Login from '../../../core/login';
import { RouterProvider } from '../../../core/router';
const apiKey = 'dc6zaTOxFJmzC';
const limit = '10';

export class PageHome extends RouterProvider(LitElement) {

    static get properties() {
        return {
            cardsGif: { type: Array }
        }
    }

    static get styles() {
        return css `
            :host {
                display: block;
            }

            .grid-cards {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
        `;
    }

    constructor() {
        super();
        this.cardsGif = [];
    }

    async connectedCallback() {
        super.connectedCallback();
        this.cardsGif = [...await this.getGifs()];
        this.addEventListener('on-search', this.handleSearch);
        this.addEventListener('on-logout', this.handleLogout);
    }


    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('on-search', this.handleSearch);
        this.removeEventListener('on-logout', this.handleLogout);
    }

    async handleLogout(event) {
        debugger
        const { user } = await Login.logOut();
        debugger
        sessionStorage.removeItem('emailUserLogin');
        this.navigator('/');
    }


    async handleSearch(event) {
        this.cardsGif = [...this.cardsGif, ...await this.getGifs(event.detail)];
    }

    async getGifs(searchType = 'dogs') {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchType}&limit=${limit}&api_key=${apiKey}`)
        const { data } = await response.json();
        return data;
    }

    render() {
            return html `
            <component-nav .emailUser="${sessionStorage.getItem('emailUserLogin')}"></component-nav>
            <section class="grid-cards">
                ${this.cardsGif.map((cardGif) => html `
                    <component-card image="${cardGif.images.fixed_height.url}" description="${cardGif.source}" title="${cardGif.title}"></component-card>
                `)}
            </section>

        `;
    }
}