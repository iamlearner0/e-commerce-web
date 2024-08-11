const cartIcon = document.querySelector(".cart");
const cartTab = document.querySelector(".cart-tab");
const body = document.querySelector("body");
let productsContainer = document.querySelector(".products--container");
let cartProducts = document.querySelector(".cart-products");
let totalCartQty = document.querySelector(".cart span");

let productList = [];
let cart = [];

cartIcon.addEventListener("click", () => {
  window.location.href = "./cart.html";
});

productsContainer.addEventListener("click", (e) => {
  let positionClicked = e.target;
  if (positionClicked.classList.contains("add-to-cart")) {
    console.log("Okay");
    let immediateParent = positionClicked.parentElement;
    let id_product = immediateParent.parentElement.dataset.id;
    addToCart(id_product);
  }
});

showProducts();

function showProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      console.log(productList);
      productsContainer.innerHTML = "";
      productList.forEach((product) => {
        console.log(product);
        let newProduct = document.createElement("div");
        newProduct.classList.add("card");
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
            <img src="${product.image}" class="card-img-top" alt="..." />
            <div class="card-info">
                <h5 class="card-title">${product.title}</h5>
                <p class="text-secondary price">Price: $${product.price}</p>
                <p class="card-text">${product.description}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
          `;

        productsContainer.appendChild(newProduct);
      });

      //   if (localStorage.getItem("cart")) {
      //     cart = JSON.parse(localStorage.getItem("cart"));
      //     addCartToHTML();
      //   }
    });
}

function addToCart(product_id) {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  console.log(positionThisProductInCart);
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else {
    if (positionThisProductInCart < 0) {
      cart.push({
        product_id: product_id,
        quantity: 1,
      });
    } else if (positionThisProductInCart >= 0) {
      cart[positionThisProductInCart].quantity =
        cart[positionThisProductInCart].quantity + 1;
    }
  }
  addCartToHTML();
  //   addCartToMemory();
}

const addCartToHTML = () => {
  cartProducts.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;

      let newItem = document.createElement("div");
      newItem.classList.add("produce");
      newItem.dataset.id = item.product_id;

      let positionProduct = productList.findIndex(
        (value) => value.id == item.product_id
      );
      let info = productList[positionProduct];
      console.log(info);
      newItem.innerHTML = `
            <div class="cart-image">
              <img src="${info.image}" alt="" />
            </div>
            <h2 class="product-name">${info.name}</h2>
            <h3 class="product-price">$${info.price * item.quantity}</h3>
            <div class="quantity">
              <span class="minus">-</span>
              <span>${item.quantity}</span>
              <span class="plus">+</span>
            </div>
     `;

      cartProducts.innerHTML = newItem;
      console.log(cartProducts);
    });
  }
  totalCartQty.innerText = totalQuantity;
};

// const addCartToMemory = () => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };
