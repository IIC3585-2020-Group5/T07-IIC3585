import './components/say-something.js';
import './components/item-list.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
  </style>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

  <div class="container">
    <h1>Web Components</h1>
    <item-list></item-list>
  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    // this.$input = this._shadowRoot.querySelector('input');
    // this.$input.addEventListener('input', this._handleChange.bind(this));

    // this.$allSaySomething = this._shadowRoot.querySelectorAll('say-something');
  }

  _handleChange() {
    this.$allSaySomething.forEach(element => {
      element.setAttribute('text', this.$input.value)
    });
  }
}

window.customElements.define('my-app', App);
