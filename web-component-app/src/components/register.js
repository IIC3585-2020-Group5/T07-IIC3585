import {setCookie, getCookie, deleteCookie} from "../utils/cookiesManager.js";
const template = document.createElement('template');

template.innerHTML = `
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <form class="text-center border border-light p-5" action="#!">

    <p class="h4 mb-4">Sign up</p>


    <!-- E-mail -->
    <input type="text" id="username" class="form-control mb-4" placeholder="Username" autocomplete="off">

    <!-- Password -->
    <input type="password" id="password" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock">
    <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
        At least 8 characters and 1 digit
    </small>

    <!-- Sign up button -->
    <button class="btn btn-info my-4 btn-block" id="submit-btn">Sign up</button>

    <!-- Login -->
    <p>Already a member?
        <a href="" id="login-btn">Login</a>
    </p>
    </form>     
`;

class Register extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$loginBtn = this._shadowRoot.querySelector("#login-btn");
        this.$username = this._shadowRoot.querySelector("#username");
        this.$password = this._shadowRoot.querySelector("#password");
        this.$submitBtn = this._shadowRoot.querySelector("#submit-btn");

    }

    
    static get observedAttributes() {
        return [

        ];   
    }

    connectedCallback() {
        this.$submitBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("HEY");
            let url = `http://localhost:8000/user/new/`;
            // let _this = this;
            try {
                const rawResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "username": this.$username.value, "password": this.$password.value})
                });
                let responseJson = await rawResponse.json();
                console.log(responseJson);
                setCookie("username", this.$username.value);
                this.dispatchEvent(new CustomEvent("logedin"));

            } catch (err) {
                this.$username.classList.add('is-invalid');
                this.$password.classList.add('is-invalid');
            }
           
            console.log("CHECK");
            
        })
        this.$loginBtn.addEventListener('click', e => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("login"));
        })
    }

    attributeChangedCallback(name, oldVal, newVal) {

    }

    render() { }
}

window.customElements.define('register-component', Register);