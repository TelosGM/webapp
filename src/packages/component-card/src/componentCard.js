import { LitElement, html, css } from "lit-element";

export class ComponentCard extends LitElement {
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