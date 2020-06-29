const template = document.createElement('template');

template.innerHTML = `

<style>
.stars {
    cursor: pointer;
    display: flex;
  }

  
  </style>
    <span class="stars" data-stars="1" style="white-space:nowrap; display: flex;align-items: center;">
        <svg height="24" width="23" class="star rating" data-rating="1">
            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg height="24" width="23" class="star rating" data-rating="2">
            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg height="24" width="23" class="star rating" data-rating="3">
            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg height="24" width="23" class="star rating" data-rating="4">
            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg height="24" width="23" class="star rating" data-rating="5">
            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
    </span>
`;


class StarRating extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$stars = this.shadowRoot.querySelector("span");

    }

    
    static get observedAttributes() {
        return [
            'stars', 
        ];   
    }

    get stars() {
        return this.getAttribute('stars');
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render() {
        let counter = 0;
        if (this.stars !== null) {
            let nodes = this.$stars.childNodes;
            for(let i=0; i<nodes.length; i++) {
                if (counter < Math.round(this.stars)) {
                    if (nodes[i].nodeType == 1) {
                        nodes[i].style.fill = "#ffd055";
                        counter++;
                    }
                } else {
                    if (nodes[i].nodeType == 1) {
                        nodes[i].style.fill = "#d8d8d8";
                    }
                }
            }
        }
    }
}

window.customElements.define('star-rating', StarRating);

