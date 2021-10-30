import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import '../component-nav';


describe('my-test', () => {
    let el;
    beforeEach(async() => {
        el = await fixture(html `<component-nav></component-nav>`);
    });

    it('default properties', () => {
        expect(el.isSticky).to.be.false;
    });

    it('render property emailUser', async() => {
        el.emailUser = 'prueba@hotmail.com';
        await el.updateComplete;
        const nodeEmail = el.shadowRoot.querySelector('.container-nav > li:first-child');
        expect(nodeEmail.innerText).to.be.equal(el.emailUser);
    });

    it('render property emailUser', async() => {
        el.isSticky = true
        await el.updateComplete;
        expect(el.hasAttributes('stycky')).to.be.true;
    });

    it('dispatch event logout', async() => {
        window.addEventListener('on-logout', (event) => {
            expect(event.type).to.be.equal('on-logout');
        });
        const buttonClickLogout = el.shadowRoot.querySelector('button');
        buttonClickLogout.click();
    });

});