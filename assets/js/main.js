const shopViewContent = document.querySelector(".products-view-content");
let cartIcon = document.querySelector("#cart-icon");
let openCart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let output = "";
let products;
const url = "https://fakestoreapi.com/products";

let data = fetch(url)
  .then((res) => res.json())
  .then((data) => {
    products = data;
    showContent(products);
  })
  .catch((error) => {
    console.error("Error message: The api can not be loaded.", error);
  });

function showContent(products) {
  for (let i = 0; i < products.length; i++) {
    output += `
              <div class="product-box">
              <img class="product" src="${products[i].image}" alt="product image">
              <h2 class="product-title">${products[i].title}</h2>
                  <div class="top-box">
                    <span class="price">$ ${products[i].price}</span>
                    <div class='bx bx-shopping-bag add-cart' "data-id="${products[i].id}" onclick="saveToCart(${products[i].id})"></div>
                  </div>
                  <div class="bottom-box">
                    <p class="readmore">More information</p></div>
                    <div class="description-box" onclick="showDescription()">${products[i].description}</div>
                    <div class="category-box">Category: ${products[i].category}</div>
                </div>
          `;
  }
  shopViewContent.innerHTML = output;
}

function uniqueId() {
  const id = Math.random().toString(36).substring(2, 9);
  return id;
}

function saveToCart(idClickedProducts) {
  let saveProduct;

  for (let i = 0; i < products.length; i++) {
    if (idClickedProducts === products[i].id) {
      saveProduct = {
        id: products[i].id,
        title: products[i].title,
        price: products[i].price,
        description: products[i].description,
        image: products[i].image,
      }
      localStorage.setItem(saveProduct.id, JSON.stringify(saveProduct));
      showCart();
      return;
    }
  }
  console.error("In saveToCart: Product are not saved to LocalStorage.")
}


function showCart() {
  openCart.classList.add("active");
  let inputCart = document.querySelector(".input-in-cart").innerHTML = "";
  let cartPrice;
  let cartTitle;
  let cartImage;
  let aLine;

  if (localStorage.length !== 0) {
    Object.keys(localStorage).forEach(function (key) {
      let product = JSON.parse(localStorage.getItem(key));

      inputCart = document.querySelector(".input-in-cart");
      cartImage = document.createElement("img");
      cartTitle = document.createElement("p");
      cartPrice = document.createElement("p");
      aLine = document.createElement("hr");
      inputCart.appendChild(cartImage);
      inputCart.appendChild(cartTitle);
      inputCart.appendChild(cartPrice);
      inputCart.appendChild(aLine);
      
      cartImage.classList.add("cart-img");
      cartImage.setAttribute("src", product.image);
      cartTitle.classList.add("cart-title");
      cartPrice.classList.add("cart-price");
      aLine.classList.add("cart-line", "clearfix");

      cartTitle.innerHTML = product.title;
      cartPrice.innerHTML = "$ " + product.price;
      cartPriceSum();
    })
  }
  else {
    console.log("Cart is empty");
  }
};

function cartPriceSum() {
  let cartPrice = document.getElementsByClassName('cart-price');
  let sum = 0;
  for (let i = 0; i < cartPrice.length; ++i) {
    let item = cartPrice[i];
    let price = item.innerText;
    sum += parseFloat(price.slice(1));
  }
  inputCart = document.querySelector(".inputCart");
  document.getElementById('priceTotal').innerHTML = "Total: $" + (sum).toFixed(2);
}

function clearCart() {
  removeCart = window.confirm("Are you sure you want to clear the cart?");
  if (removeCart) {
    document.querySelector(".input-in-cart").innerHTML = "";
    document.getElementById('priceTotal').innerHTML = "Total: " + "0" + "$";
    localStorage.clear();
  }
};

function buyCart() {
  shopMore = window.confirm("Checkout?");
  if (shopMore) {
    alert("Thank you for shopping!");
    window.location.reload();
  }
};

let trackingIfCartIsOpen = 0;
cartIcon.onclick = () => {
  if (trackingIfCartIsOpen === 0){
    showCart()
    trackingIfCartIsOpen = 1;
  }
  else if (trackingIfCartIsOpen === 1){
    openCart.classList.remove("active");
    trackingIfCartIsOpen = 0;
  }
};

closeCart.onclick = () => {
  openCart.classList.remove("active");
};

document.getElementById("removeBtn").addEventListener("click", clearCart);
document.getElementById("buyBtn").addEventListener("click", buyCart);