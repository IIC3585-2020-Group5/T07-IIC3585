import {setCookie, getCookie, deleteCookie} from "../utils/cookiesManager.js";
import "./login.js"
import "./modal.js"
const template = document.createElement('template');


template.innerHTML = `
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
            
<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
  <a class="navbar-brand" href="#" id="tester">Web Components</a>
  <div class="navbar-nav" id="user-nav">
  </div>

</nav>

<x-modal type="Important!">
<p>This is some really important stuff</p>
</x-modal>

`;

class NavBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$userNav = this._shadowRoot.querySelector("#user-nav");
        this.$username;
        this.$select = this._shadowRoot.querySelector("#tester");
        this.$modal = this._shadowRoot.querySelector("x-modal");
    }

    static get observedAttributes() {
        return [
            'username'
        ];   
    }

    get username() {
        return this.getAttribute('username');
    }

    set username(v) {
        this.setAttribute("username", v);
    }

    connectedCallback() {
        this.$modal.addEventListener('usernameUpdate', (e) => {
            this.username = getCookie("username");
        })
        this.render()
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render() { 
        let username = getCookie("username");
        if (!username) {
            this.$userNav.innerHTML = `    
            <a class="nav-item nav-link" href="#" id="login-btn">Login</a>
            <a class="nav-item nav-link" href="#" id="register-btn">Register</a>
            `;
            this._shadowRoot.querySelector("#login-btn").addEventListener("click", () => {
                this.$modal.visible = true;
                this.$modal.setAttribute("title", "Login");
                // modal.type = "Login";
            });

            this._shadowRoot.querySelector("#register-btn").addEventListener("click", () => {
                this.$modal.visible = true;
                this.$modal.setAttribute("title", "Register");
                // modal.type = "Login";
            });
        } else {
            this.$userNav.innerHTML = `    
            <a class="nav-item nav-link" href="#">Welcome ${username}</a>
            <a class="nav-item nav-link" href="#" id="logout-btn">Logout</a>
            `;
            this._shadowRoot.querySelector("#logout-btn").addEventListener("click", () => {
                deleteCookie("username");
                this.username = null;
                // modal.type = "Login";
            });
        }
    }
}

window.customElements.define('nav-bar', NavBar);

