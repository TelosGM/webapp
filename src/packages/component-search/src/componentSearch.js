import { LitElement, html, css } from "lit-element";

export class ComponentSearch extends LitElement {

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