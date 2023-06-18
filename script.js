const api = 'https://fakestoreapi.com/products';

// ------ جلب المنتجات الطريقة اولى----------------

async function getData() {
  const response = await fetch(api);
  const data = await response.json();
  // console.log(data)

  const cardsContainer = document.getElementById('cards-container');

  const cardsHTML = data.map(item => `
      <div class="card" style="width: 18rem;">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}</p>
          <p class="price">Price: $${item.price}</p>
          <a href="/details.html?id=${item.id}" class="btn btn-primary">show details</a>
        </div>
      </div>
    `).join('');
  cardsContainer.innerHTML = cardsHTML;
}

getData();






function redirectToProductDetails(productId) {
  window.location.href = `details.html?id=${productId}`;
}

async function fetchProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();
    const productDetails = document.getElementById("product-details");
    // console.log(productDetails);

    productDetails.innerHTML = `
    <div class="card " style="width: 15rem; height: auto;">
       <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
   </div>
       <div class="col-8">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="text-details">${product.description}</p>
          <h4 class="price"><p>Price: $${product.price}</p></h4>
          <a href="/details.html?id=${product.id}" class="btn btn-primary">add to cart</a>
       </div>
   </div>
    `;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  if (productId) {
    fetchProductDetails();
  }
});
