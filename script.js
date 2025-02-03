class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;
  
    constructor(title, image, desc, price) {
      this.title = title;
      this.imageUrl = image;
      this.description = desc;
      this.price = price;
    }
  }
  
  class ShoppingCart {
    items = [];

    // set cartItems(value){
    //     this.items = value;
    //     this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`;
    // }

    // get totalAmount() { 
    //     const sum = this.items.reduce(
    //         (prevValue, curItem) => prevValue + curItem.price,
    //         0
    //     );
    //     return sum;
    // }
  
    addProduct(product) {
        this.items.push(product);
        const totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
        this.totalOutput.innerHTML = `<h2>Total: \$${totalPrice.toFixed(2)}</h2>`;
    }

    render() {
      const cartEl = document.createElement('section');
      cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
      `;
      cartEl.className = 'cart';
      this.totalOutput = cartEl.querySelector('h2');
      return cartEl;
    
    }
  }
  
  class ProductItem {
    constructor(product) {
      this.product = product;
    }
  
    addToCart() {
      App.addProductToCart(this.product);
    }
  
    render() {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
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
      return prodEl;
    }
  }
  
  class ProductList {
    products = [
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
  
    constructor() {}
  
    render() {
      const prodList = document.createElement('ul');
      prodList.className = 'product-list';
      for (const prod of this.products) {
        const productItem = new ProductItem(prod);
        const prodEl = productItem.render();
        prodList.append(prodEl);
      }
      return prodList;
    }
  }
  
  class Shop {
    
    render() {
      const renderHook = document.getElementById('app');
  
      this.cart = new ShoppingCart();
      const cartEl = this.cart.render();
      const productList = new ProductList();
      const prodListEl = productList.render();
      
      //Cart Element Rendering in Shop
      renderHook.append(cartEl);
      //Product List Rendering in Shop
      renderHook.append(prodListEl);
    }
  }
  
  class App {
    static cart;
  
    static init() {
      const shop = new Shop();
    //The Shop Part is rendered here
      shop.render();
      this.cart = shop.cart;
    }
  
    static addProductToCart(product) {
      this.cart.addProduct(product);
    }
  }
  
//   
  App.init();