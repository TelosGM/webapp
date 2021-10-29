import {  css } from 'lit-element';

export const styleNav = css `
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