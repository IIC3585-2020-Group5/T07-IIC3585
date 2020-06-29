import { getItems } from "../utils/api";
import "../components/item.js";


const template = document.createElement('template');

template.innerHTML = `
  <style>
    .list-container {
        width: 300px;
        height: 300px;
    }

    h2 {
      background-color: pink;
    }

    ul {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
    }
  </style>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <div class="container">
    <h2> Item List </h2>
    <ul class="items"></ul>
  </div>
`;

class ItemList extends HTMLElement {
    
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$title = this._shadowRoot.querySelector("h2");
        this.$list = this._shadowRoot.querySelector("ul");
    }

    static get observedAttributes() { return ["loading", "items"]; }
    get loading() {
        return JSON.parse(this.getAttribute("loading"));
    }
    set loading(v) {
        this.setAttribute("loading", JSON.stringify(v));
    }
    get items() {
        return JSON.parse(this.getAttribute("items"));
    }
    set items(v) {
        this.setAttribute("items", JSON.stringify(v));
    }


    async fetchItems() {
        this.loading = true;
        const response = await getItems();
        const json = await response.json();
        console.log(json);
        this.items = json;
        this.loading = false;
    }

    async connectedCallback() {
        await this.fetchItems();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "loading") {
            this.render();
        }
        
    }

    render() {
        console.log("RENDER LIST");
        if (this.loading) {
            this.$title.innerHTML = "Loading...";
        } else {
            this.$title.innerHTML = "Item List";
            let item;
            this.items.forEach(element => {
                item = document.createElement('item-item');
                item.setAttribute("name", element.name);
                item.setAttribute("postForm", element.id); 
                item.setAttribute("description", element.description);
                item.setAttribute("realPrice", element.discount_price);
                item.setAttribute("originalPrice", element.price);
                item.setAttribute("discountPercentage", element.discount_percentage);
                item.setAttribute("stars", element.rating);
                item.setAttribute("ratingAmount", element.total_rating_amount);
                item.setAttribute("img", element.image_url);                
                console.log(element.id);
                this.$list.appendChild(item);
            });
        }
    }

}

window.customElements.define('item-list', ItemList);