import { LitElement, css, html } from "lit-element";
import Login from '../../../core/login';
import '../../../packages/component-form/component-form';
import { RouterProvider } from '../../../core/router';
import {  store } from '../../../../redux/store';
import { actionsWebApp } from '../../../../redux/actions';
import { connect } from 'pwa-helpers'

export class PageLogin extends connect(store)(RouterProvider(LitElement)) {
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('on-submit-form', this.handleLogin);
        
    }

    async handleLogin(event) {
        const { user } = await Login.registerUser({ email: event.detail[0], password: event.detail[1] });
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