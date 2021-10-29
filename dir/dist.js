import { LitElement, html, css } from 'lit-element';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { Router } from '@vaadin/router';
import { initializeApp } from 'firebase/app';
import { signOut, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { createStore } from 'redux';
import { connect } from 'pwa-helpers';

const RouterMixin = dedupeMixin( superClass =>
    class RouterMixin extends  superClass {
        constructor() {
            super();
        }

        firstUpdated() {
            if(this.routes.length) {
                const router = new Router(this.shadowRoot.querySelector('#render-router'));
                router.setRoutes(this.routes);
            } else {
                console.error('no tienes ruta');
            }
        }
    }
);

const RouterProvider = dedupeMixin( superClass =>
    class RouterProvider extends superClass {
        navigator(path) {
            Router.go(path);
        }
    }
);

const INITIAL_CONFIG_FIREBASE = {
    apiKey: "AIzaSyCFru0FajNyNEbz2cLbWfufNXT33ycZmzM",
    authDomain: "javi-login.firebaseapp.com",
    projectId: "javi-login",
    storageBucket: "javi-login.appspot.com",
    messagingSenderId: "750094152471",
    appId: "1:750094152471:web:520faade128661dc8f7d52"

};

class Login {
    constructor() {
        this.auth = initializeApp(INITIAL_CONFIG_FIREBASE);
    }


    async logOut(){
        try{
            
            
            return await signOut(auth);
            
        }catch (err){
            
            return err;
        }
    }

    async registerUser({ email, password }){
        try {
            
            return await createUserWithEmailAndPassword(getAuth(), email, password);

        } catch (err) {
            
            switch(err.code){

                case "auth/email-already-in-use":
                    try{
                        return await signInWithEmailAndPassword(getAuth(), email, password);
                        break;
                    }catch{
                        return err;
                    }
                default:
                    return err;
            }
            
        }
    }


}

var Login$1 = new Login();

class ComponentForm extends LitElement {
    render() {
        return html `
            <form action="" @submit="${this.handleSubmitEvent}">
                <input type="text">
                <input type="password">
                <button type="submit">Enviar</button>
            </form>
        `;
    }

    handleSubmitEvent(event) {
        event.preventDefault();
        let nodeInputs = [...event.currentTarget.querySelectorAll('input')];
        this.dispatchEvent(new CustomEvent('on-submit-form', {
            bubbles: true,
            composed: true,
            detail: [...nodeInputs.map((inputNode) => inputNode.value)]
        }));
    }
}

window.customElements.define('component-form', ComponentForm);

const INITIALSTATE = {
    profileData: {}
};

const dispatchRedux = (state = INITIALSTATE, actions) => {
    switch (actions.type) {
        case 'PROFILE_DATA':
            return {
                ...state,
                profileData: actions.data
            }

        default:
            return state;
    }
};

const store = createStore(dispatchRedux);

class PageLogin extends connect(store)(RouterProvider(LitElement)) {
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('on-submit-form', this.handleLogin);
        
    }

    async handleLogin(event) {
        const { user } = await Login$1.registerUser({ email: event.detail[0], password: event.detail[1] });
        sessionStorage.setItem('emailUserLogin',user.email);
        this.navigator('/home');
    }
    
    
    render() {
        return html `
            <component-form></component-form>
        `;
    }

    stateChanged(state) {
        
    }


    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('on-submit-form', this.handleLogin);
        
    }
}

window.customElements.define('page-login', PageLogin);

const styleNav = css `
    :host {
            display: block;
          }

          :host([sticky]) {
              position: fixed;
              width: 100%;
          }
          
          .container-nav {
            list-style-type: none;
            margin: 0;
            padding: 0;
            background: var(--background-color-nav, grey);
            height: 60px;
            display: flex;
            align-items: center;
          }

          .container-nav > .sticky-item {
              color: red;
          }

          ::slotted(*){
              color: green;
          }
`;

class ComponentSearch extends LitElement {

    handleSubmitSearch(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('on-search', {
            bubbles: true,
            composed: true,
            detail: event.target.querySelector('input').value
        }));
    }

    render() {
        return html `
            <section>
                <form @submit="${this.handleSubmitSearch}">
                    <input type="text"/>
                    <button type="submit">Buscar</button>
                </form>
            </section>
        `;
    }
}

window.customElements.define('component-search', ComponentSearch);

class ComponentNav extends LitElement {
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

window.customElements.define('component-nav', ComponentNav);

class ComponentCard extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            description: { type: String },
            image: { type: String }
        }
    }


    static get styles() {
        return css `
        
            :host {
                display: block;
            }

            .container-card {
                border: 1px solid black;
            }

            .container-card header {
                background-color:  #581845;
            }

            .container-card main {
                background-color: #99A3A4;
            }
        `;
    }


    render() {
        return html `
            <section class="container-card">
                
                <header>
                    <h1>${this.title}</h1>
                </header>
                <main>
                    <img src="${this.image}">
                </main>
                <footer>
                    ${this.description}
                </footer>
            </section>
        `;
    }
}

window.customElements.define('component-card', ComponentCard);

const apiKey = 'dc6zaTOxFJmzC';
const limit = '10';

class PageHome extends RouterProvider(LitElement) {

        static get properties() {
            return {
                cardsGif: { type: Array },
                searchType: { type: String }
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

            component-nav {
                --background-color-nav: yellow;
            }
        `;
        }

        constructor() {
            super();
            this.cardsGif = [];
            this.searchNo = 0;
            this.searchType = 'dog';
        }

        firstUpdated() {
            this.shadowRoot.querySelector('#goTop').addEventListener('click', this.scrollTopAndChangeBar.bind(this));
        }



        async connectedCallback() {
            super.connectedCallback();
            this.cardsGif = [...await this.getGifs()];
            this.addEventListener('on-search', this.handleSearch);
            this.addEventListener('on-logout', this.handleLogout);
            this.shadowRoot.querySelector('#grid-cards');


        }

        async updated(_changeProperties) {
            super.updated(_changeProperties);
            if (_changeProperties.has('searchType') && this.searchType) {
                this.cardsGif = [...await this.getGifs(this.searchType)];
                this.searchNo = 0;
            }
        }

        more() {
            console.log("pasando por more");
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            this.removeEventListener('on-search', this.handleSearch);
            this.removeEventListener('on-logout', this.handleLogout);

        }

        async handleLogout(event) {

            await Login$1.logOut();

            sessionStorage.removeItem('emailUserLogin');
            this.navigator('/');
        }


        async handleSearch(event) {
            this.searchType = event.detail;
        }

        async handleMore(event) {
            this.cardsGif = [...this.cardsGif, ...await this.getGifs(this.searchType, this.searchNo * limit)];
            this.searchNo++;
        }


        async getGifs(searchType = 'dogs', offset = '0') {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchType}&limit=${limit}&offset=${offset}&api_key=${apiKey}`);
            const { data } = await response.json();
            return data;
        }

        scrollTopAndChangeBar(event) {
            window.scrollTo(0, 0);
            const componentNav = this.shadowRoot.querySelector('component-nav');
            componentNav.shadowRoot.querySelector('ul').style.backgroundColor = "#ffd7ba";
        }


        render() {
                return html `
            <component-nav .emailUser="${sessionStorage.getItem('emailUserLogin')}" .isSticky="${true}">
                <p id="daniel" slot="slot1">daniel</p>
                <h2 slot="slot2">Javier</h2>
            </component-nav>
            
            <section class="grid-cards">
                ${this.cardsGif.map((cardGif) => html `
                    <component-card image="${cardGif.images.fixed_height.url}" description="${cardGif.source}" title="${cardGif.title}  "></component-card>
                `)}
            </section>
            <section>
                <button @click="${this.handleMore}">NEXT</button>
                <button id="goTop">Vovler Arriba</button>
            </section>
        `;
    }
}


// boton de subir todo
// al subir cambiar  color de barra

window.customElements.define('page-home', PageHome);

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
        ];
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

window.customElements.define('web-app', WebApp);
