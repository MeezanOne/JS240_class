// This class defines a blueprint for a product.
// It has a constructor, which initializes the title, imageUrl, description, and price properties when a new Product object is created.
class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

// This class defines an object that holds an HTML attribute name and value.
// Used later to create and manage dynamic HTML elements.
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}



// Parent class for UI components.
// Constructor:
// Takes a renderHookId (the element where it should be rendered).
// Calls render() automatically unless shouldRender is false.
// Methods:
// render(): Placeholder method (overridden by child classes).
// createRootElement(tag, cssClasses, attributes): Creates an HTML element dynamically.
class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

// Extends Component, meaning it inherits UI-related logic.
// Uses getter & setter:
// cartItems: Updates the items array and the UI.
// totalAmount: Uses reduce() to sum up the total price.
class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  // Constructor:
  // Calls super() to initialize the parent Component class.
  // Defines orderProducts() as an arrow function (to preserve this).
  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log('Ordering...');
      console.log(this.items);
    };
    this.render();
  }

  // addProduct(product):
  // Adds a product to the cart.
  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

// Creates a section.cart element.
// Displays a button that triggers orderProducts() when clicked.
  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    // orderButton.addEventListener('click', () => this.orderProducts());
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
  }
}

// Extends Component.
// Stores a product object and renders it.
class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  // Renders a list item (li) with product details.
  // Binds addToCart to the button's click event.
  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [];
// Constructor calls fetchProducts().
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  // Creates dummy product data.
  fetchProducts() {
    this.products = [
      new Product(
        'A Pillow',
        'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/x/t/q/medium-anime-poster-frame-yuji-itadori-jujutsu-kaisen-black-original-imagmgdx4gyhvxfs.jpeg?q=90&crop=false',
        'A soft pillow!',
        19.99
      ),
      new Product(
        'A Carpet',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
        'A carpet which you might like - or not.',
        89.99
      )
    ];
    this.renderProducts();
  }


// Loops through products and creates ProductItem instances.
  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  // Renders a <ul> for the product list.
  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list')
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

// Creates both a shopping cart and product list.
class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

// Static cart property stores the ShoppingCart instance.
// App.init() initializes the app.
class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();


let dummy = new Product(
  'A Pillow',
  'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/x/t/q/medium-anime-poster-frame-yuji-itadori-jujutsu-kaisen-black-original-imagmgdx4gyhvxfs.jpeg?q=90&crop=false',
  'A soft pillow!',
  19.99
)

console.log(dummy)


// Classes & Object-Oriented Programming (class, extends, constructor)
// Encapsulation (get, set)
// Inheritance & Polymorphism (Component, ShoppingCart, ProductItem, ProductList)
// Event Handling (addEventListener)
// DOM Manipulation (document.createElement, .append)
// Functional Programming (reduce, map)
// Spread Operator (...this.items)
// Arrow Functions (this.orderProducts = () => {})

  // Parent class
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   speak() {
//     console.log(`${this.name} makes a sound.`);
//   }
// }

// const animal = new Animal('Dogs');
// animal.speak();

// // Child class
// class Dog extends Animal {
//   constructor(name, breed) {
//     // Calling the parent class constructor with super()
//     super(name);  // This sets the `name` property of the Animal class
//     this.breed = breed;  // This is specific to the Dog class
//   }

//   speak() {
//     console.log(`${this.name} barks.`);
//   }
// }

// // Creating an instance of the Dog class
// const myDog = new Dog('Buddy', 'Golden Retriever');
// myDog.speak();  // Output: Buddy barks.
// console.log(myDog.name);  // Output: Buddy
// console.log(myDog.breed); // Output: Golden Retriever
