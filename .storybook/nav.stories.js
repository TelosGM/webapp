import "../src/packages/component-nav/component-nav.js"

export default {
    title: 'Example/navbar',
    argTypes: {
      emailUser: { string:"mail@correo.com" },
      isSticky: {boolean:"true" },
    },
  };
  
  const navBar= ({emailUser, isSticky}) => {
    return `
    <component-nav .emailUser="${emailUser}" .isSticky="${isSticky}">
    <p id="daniel" slot="slot1">daniel</p>
    <h2 slot="slot2">Javier</h2>
    </component-nav>
    `;
  };