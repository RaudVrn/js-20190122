import PhonesCatalog from './components/PhonesCatalog.js';
import PhoneViewer from './components/PhoneViewer.js';
import ShoppingCart from './components/ShoppingCart.js';
import Filter from './components/Filter.js';
import PhonesService from './PhonesService.js';


export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._state = {
      phones: PhonesService.getAll(),
      selectedPhone: null,
      basket: []
    };

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initCart();
    this._initFilter();
  }

  _initCatalog() {
    this._catalog = new PhonesCatalog({
      element: this._element.querySelector('[data-component="PhonesCatalog"]'),
      phones: this._state.phones,

      onPhoneSelected: (phoneId) => {
        const selectedPhone = PhonesService.getById(phoneId);

        this._catalog.hide();
        this._viewer.show(selectedPhone);
      },

      onAddToBasket: (item) => {
        this._state.basket.push(item.id);
        this._cart.addToCart(item);
        console.log(this._state.basket);
      },
    });
  }

  _initViewer() {

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="PhoneViewer"]'),

      onPhoneDetailsHide: () => {

        this._state.selectedPhone = null;

        this._catalog.show();
        this._viewer.hide();
      },

      onAddToBasket: (item) => {
        this._state.basket.push(item.id);
        this._cart.addToCart(item);


      }

    });

  }

  _initCart() {
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="ShoppingCart"]'),

      onRemoveFromBasket: (item) => {
        // console.log(item.dataset.id);
        // console.log(this._state.basket.indexOf(item.dataset.id));
        // console.log(this._state.basket);
        this._state.basket.splice(this._state.basket.indexOf(item.dataset.id), 1);
        this._cart.removeFromCart(item)
      }
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: this._element.querySelector('[data-component="Filter"]'),
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <div data-component="Filter"></div>
          </section>
  
          <section>
            <div data-component="ShoppingCart"></div>
          </section>
        </div>
  
        <!--Main content-->
        <div class="col-md-10">
          <div data-component="PhonesCatalog"></div>
          <div data-component="PhoneViewer" hidden></div>
        </div>
      </div>
    `;
  }
}
