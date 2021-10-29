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
        this.searchNo=0;
        this.searchType='dog';
    }



    async connectedCallback() {
        super.connectedCallback();
        this.cardsGif = [...await this.getGifs()];
        this.addEventListener('on-search', this.handleSearch);
        this.addEventListener('on-logout', this.handleLogout);
        var target = this.shadowRoot.querySelector('#grid-cards');

        
    }
    
    more(){
        console.log("pasando por more");
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('on-search', this.handleSearch);
        this.removeEventListener('on-logout', this.handleLogout);
        
    }

    async handleLogout(event) {
        
        const { user } = await Login.logOut();
        
        sessionStorage.removeItem('emailUserLogin');
        this.navigator('/');
    }


    async handleSearch(event) {
        this.searchType=event.detail;
        this.cardsGif = [ ...await this.getGifs(this.searchType)];
        this.searchNo=0;
    }

    async handleMore(event) {
        this.cardsGif = [...this.cardsGif, ...await this.getGifs(this.searchType,  this.searchNo* limit )];
        this.searchNo++;
        debugger
    }


    async getGifs(searchType = 'dogs', offset='0') {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchType}&limit=${limit}&offset=${offset}&api_key=${apiKey}`)
        const { data } = await response.json();
        return data;
    }

    scrollTopAndChangeBar(event) {
        window.scrollTo(0,0);
        let bar = event.currentTarget.parentElement.previousElementSibling.previousElementSibling.shadowRoot.querySelector('ul');
        bar.style.backgroundColor="#ffd7ba"


    }


    render() {
            return html `
            <component-nav .emailUser="${sessionStorage.getItem('emailUserLogin')}"></component-nav>
            
            <section class="grid-cards">
                ${this.cardsGif.map((cardGif) => html `
                    <component-card image="${cardGif.images.fixed_height.url}" description="${cardGif.source}" title="${cardGif.title}  "></component-card>
                `)}
            </section>
            <section>
                <button @click=${this.handleMore}>NEXT</button>
            <button @click="${this.scrollTopAndChangeBar}">Vovler Arriba</button>
            </section>
        `;
    }
}


// boton de subir todo
// al subir cambiar  color de barra 