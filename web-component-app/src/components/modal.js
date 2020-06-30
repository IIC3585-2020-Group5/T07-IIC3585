import "../components/login";
import "../components/register";
const template = document.createElement('template');
template.innerHTML = `
<style>
  .wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: gray;
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
    z-index: 1;
  }
  .visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
  }
  .modal {
    font-family: Helvetica;
    font-size: 14px;
    padding: 10px 10px 5px 10px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 2px;
    min-width: 300px;
  }
  .title {
    font-size: 18px;
  }
  .button-container {
    text-align: right;
  }
  button {
    cursor: pointer;
    float: right;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    overflow: hidden;
    outline:none;
    font-size: 2em;
  }
  button:hover {
    color: red;
  }
</style>
<div class="" id="wrapper-class">
  <div class='modal'>
    <button class='cancel'>×</button>
    <div class='content'>
    </div>
  </div>
</div>`;

class Modal extends HTMLElement {
  get visible() {
    return this.hasAttribute("visible");
  }

  set visible(value) {
    if (value) {
      this.setAttribute("visible", "");
    } else {
      this.removeAttribute("visible");
    }
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$wrapperDiv = this._shadowRoot.querySelector("#wrapper-class");
    this.$contentDiv = this._shadowRoot.querySelector(".content");
  }

  connectedCallback() {
    this._render();
    this._attachEventHandlers();
  }
  static get observedAttributes() {
    return ["visible", "title"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this._render();
    }
    if (name === "visible") {
      if (newValue === null) {
        this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
        this.dispatchEvent(new CustomEvent("close"));
      } else {
        this.shadowRoot.querySelector(".wrapper").classList.add("visible");
        this.dispatchEvent(new CustomEvent("open"))
      }
    }
  }

  _render() {
    const wrapperClass = this.visible ? "wrapper visible" : "wrapper";
    //   const container = document.createElement("div");
    //   console.log(this.title);
    this.$wrapperDiv.className = wrapperClass;
    if (this.title == "Login") {
      this.$contentDiv.innerHTML = "<login-component></login-component>";
      this._loginEventHandler();
    } else {
      this.$contentDiv.innerHTML = "<register-component></register-component>";
      this._registerEventHandler();
    }
  }

  _loginEventHandler() {
    this._shadowRoot.querySelector("login-component").addEventListener("register", e => {
        this.title = "Register";
    })
    this._shadowRoot.querySelector("login-component").addEventListener("logedin", e => {
        this.dispatchEvent(new CustomEvent("usernameUpdate"));
        this.removeAttribute("visible");
    })
  }

  _registerEventHandler() {
    this._shadowRoot.querySelector("register-component").addEventListener("login", e => {
        this.title = "Login";
    })
    this._shadowRoot.querySelector("register-component").addEventListener("logedin", e => {
        this.dispatchEvent(new CustomEvent("usernameUpdate"));
        this.removeAttribute("visible");
    })
  }

  _attachEventHandlers() {
    const cancelButton = this.shadowRoot.querySelector(".cancel");
    cancelButton.addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent("cancel"))
      this.removeAttribute("visible");
    });
  }
}
window.customElements.define('x-modal', Modal);