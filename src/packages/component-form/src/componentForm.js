import { LitElement, html, css } from "lit-element";

export class ComponentForm extends LitElement {
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
        }))
    }
}