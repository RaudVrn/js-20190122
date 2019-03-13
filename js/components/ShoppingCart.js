export default class ShoppingCart {
  constructor({ element, onRemoveFromBasket }) {
    this._element = element;

    this._props = {
      onRemoveFromBasket
    };



    this._render();
    this._initEventListeners();
  }

  addToCart(item){
    const list = this._element.querySelector('.basket__list');
    const empty__item = this._element.querySelector('.basket__empty');

    if (empty__item){
      empty__item.remove();
    }

    list.insertAdjacentHTML('beforeend', `
      <li class="basket__item" data-id="${item.id}">
        <p class="basket__item-name">${item.name}</p>
        <button class="basket__remove-button">x</button>
      </li>
    `)
  }

  removeFromCart(item){
    item.remove()
  }

  _initEventListeners() {
    this._element.addEventListener('click', (event) => {
      const removeButton = event.target.closest('.basket__remove-button');
      if (!removeButton) {
        return;
      }
      let item = event.target.closest('.basket__item');
      this._props.onRemoveFromBasket(item);

    })
  }

  _render() {
    this._element.innerHTML = `
      <div>
        <p>Shopping Cart</p>
        <ul class="basket__list">
          <li class="basket__empty">Nothing</li>
          <!--<li>Phone 2</li>
          <li>Phone 3</li>-->
        </ul>
      </div>
    `;
  }
}
