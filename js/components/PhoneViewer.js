
export default class PhoneViewer {
  constructor({ element, onPhoneDetailsHide, onAddToBasket}) {
    this._element = element;

    this._props = {
      phone: null,
      onPhoneDetailsHide: onPhoneDetailsHide,
      onAddToBasket: onAddToBasket,
    };
  }

  show(phone) {
    this._props.phone = phone;
    this._element.hidden = false;
    this._render();
    this._initEventListeners();
  }

  hide() {
    this._element.hidden = true;
  }

  _initEventListeners(){
    this._element.querySelector('.phone-details__back-button').addEventListener('click', () => {
      this._props.onPhoneDetailsHide();
    });

    this._element.querySelector('.phone-thumbs').addEventListener('click', (event) => {
      const largeImg = this._element.querySelector('.phone');
      const target = event.target.closest('.phone-details__additional-photo');

      if (!target){
        return
      }

      largeImg.src = target.children[0].src;
    });

    this._element.querySelector('.phone-details__add-to-cart-button').addEventListener('click', () => {
      this._props.onAddToBasket(this._props.phone);

    });

  }

  _render() {
    this._element.innerHTML = `
      <div class="phone-details">
        <img class="phone" src="${this._props.phone.images[0]}" alt="${this._props.phone.name}">
    
        <button class="phone-details__back-button" type="button">Back</button>
        <button class="phone-details__add-to-cart-button" type="button">Add to basket</button>
    
    
        <h1>${this._props.phone.name}</h1>
    
        <p>${this._props.phone.description}</p>
    
        <ul class="phone-thumbs">
        
          ${this._props.phone.images.map(img => `
            <li class="phone-details__additional-photo">
              <img src="${img}" alt="${this._props.phone.name}">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}
