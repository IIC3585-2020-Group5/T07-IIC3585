import "../components/stars.js";
import { getItem } from "../utils/api";


const template = document.createElement('template');
template.innerHTML = `
            <style>

                .card-img-top {
                    width: 100%;
                    height: 15vw;
                    object-fit: cover;
                }
                
            </style>

            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
            <div class="card h-100" style="width: 18rem;">
                <img class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text"></p>
                    <span style="white-space:nowrap; display: flex; align-items: center;">
                    <span id="star-span" style="white-space:nowrap;"></span><span id="rating-amount" style="white-space:nowrap;display: inline-block;" >rating</span>
                    </span>
                    
                    <p>
                        <s class="original-price">Precio Original</s>
                        <strong class="real-price">Real Price</strong>
                        <span id="discount-percentage">69%</span>
                    </p>
                    <form class="form-inline">

                        <div class="form-group">
                        <select class="custom-select mr-sm-2" id="ratingSelect">
                            <option selected>Your Rating...</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                        </div>
                        <button type="button" class="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>   
        `;

class ItemItem extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$img = this._shadowRoot.querySelector("img");
        this.$title = this._shadowRoot.querySelector("h5");
        this.$description = this._shadowRoot.querySelector(".card-text");
        this.$stars = this._shadowRoot.querySelector("#star-span");
        this.$ratingAmount = this._shadowRoot.querySelector("#rating-amount");
        this.$originalPrice = this._shadowRoot.querySelector(".original-price");
        this.$realPrice = this._shadowRoot.querySelector(".real-price");
        this.$discountPercentage = this._shadowRoot.querySelector("#discount-percentage");
        this.$button = this._shadowRoot.querySelector("button");
        this.$postForm = this._shadowRoot.querySelector("form");
        this.$select = this._shadowRoot.querySelector("#ratingSelect");
        this.listened = false;
    }


    static get observedAttributes() {
        return [
            'name', 
            'description', 
            'originalPrice', 
            'stars', 
            'ratingAmount', 
            'originalPrice', 
            'realPrice', 
            'discountPercentage', 
            'img',
            'postForm',
        ];   
    }
    
    get name() {
        return this.getAttribute('name');
    }
    get description() {
        return this.getAttribute('description');
    }
    get originalPrice() {
        return this.getAttribute('originalPrice');
    }
    get stars() {
        return this.getAttribute('stars');
    }
    get ratingAmount() {
        return this.getAttribute('ratingAmount');
    }
    set stars(v) {
        this.setAttribute("stars", v);
    }
    set ratingAmount(v) {
        this.setAttribute("ratingAmount", v);
    }
    get realPrice() {
        return this.getAttribute('realPrice');
    }
    get discountPercentage() {
        return this.getAttribute('discountPercentage');
    }
    get img() {
        return this.getAttribute('img');
    }
    get postForm() {
        return this.getAttribute('postform');
    }

    refreshRating(amount, rating) {
        this.ratingAmount = amount;
        this.stars = rating;
        this.$postForm.innerHTML = "<p>Already Rated!</p>"
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        // this.render();
    }

    async sendRating() {
        let url = `http://localhost:8000/rating/${this.postForm}/`;
        // let _this = this;
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "rating": this.$select.options[this.$select.selectedIndex].value})
        });
        let responseJson = await rawResponse.json();
        this.refreshRating(responseJson[0].total_rating_amount, responseJson[0].rating);   
    }

    connectedCallback() {
        const star = document.createElement('star-rating');  
        this.$stars.appendChild(star);
        this.$stars.firstElementChild.setAttribute("stars", this.stars / this.ratingAmount);  
        this.$button.addEventListener('click', this.sendRating.bind(this))
        this.$originalPrice.innerHTML = this.originalPrice;
        this.$realPrice.innerHTML = this.realPrice;
        this.$title.innerHTML = this.name;
        this.$description.innerHTML = this.description;
        this.$discountPercentage.innerHTML = `${this.discountPercentage}%`;
        this.$img.src = this.img;
        this.render()
    }

    render() {
        this.$ratingAmount.innerHTML = this.ratingAmount;
        this.$stars.firstElementChild.setAttribute("stars", this.stars / this.ratingAmount);  
    }
}

window.customElements.define('item-item', ItemItem);