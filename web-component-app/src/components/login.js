import {setCookie, getCookie, deleteCookie} from "../utils/cookiesManager.js";
const template = document.createElement('template');

template.innerHTML = `
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <form class="text-center border border-light p-5" action="" method="">

    <p class="h4 mb-4">Sign in</p>

    <!-- Username -->
    <div class="input-group">
        <input type="text" id="username" class="form-control mb-4" placeholder="Username" name="username">
        <div class="invalid-feedback">
            Invalid Username or Password
        </div>
    </div>
    <!-- Password -->
    <div class="input-group">
        <input type="password" id="password" class="form-control mb-4" placeholder="Password" name="password">
        <div class="invalid-feedback">
            Invalid Username or Password
        </div>
    </div>

    <!-- Sign in button -->
    <button id="submit-btn" class="btn btn-info btn-block my-4">Sign in</button>

    <!-- Register -->
    <p>Not a member?
        <a href="" id="register-btn">Register</a>
    </p>

    </form>
`;

class Login extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$username = this._shadowRoot.querySelector("#username");
        this.$password = this._shadowRoot.querySelector("#password");
        this.$submitBtn = this._shadowRoot.querySelector("#submit-btn");
        this.$registerBtn = this._shadowRoot.querySelector("#register-btn");
    }

    
    static get observedAttributes() {
        return [

        ];   
    }

    connectedCallback() {
        this.$submitBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("HEY");
            let url = `http://localhost:8000/user/get/`;
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
        this.$registerBtn.addEventListener('click', e => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("register"));
        })
    }

    attributeChangedCallback(name, oldVal, newVal) {

    }

    render() { }
}

window.customElements.define('login-component', Login);

