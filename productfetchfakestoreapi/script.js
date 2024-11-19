document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
});

function fetchProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://fakestoreapi.com/products', true);
    xhr.onload = function () {
        if (this.status === 200) {
            const products = JSON.parse(this.responseText);
            displayProducts(products);
        }
    };
    xhr.send();
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-lg-3 col-md-4 col-sm-6 col-12 mb-4';
        productCard.innerHTML = `
            <div class="card product-card" onclick="showProductDetails(${product.id})">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

function showProductDetails(productId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://fakestoreapi.com/products/${productId}`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const product = JSON.parse(this.responseText);
            document.getElementById('productTitle').innerText = product.title;
            document.getElementById('productId').innerText = product.id;
            document.getElementById('productDescription').innerText = product.description;
            document.getElementById('productPrice').innerText = `$${product.price}`;
            document.getElementById('productRating').innerText = product.rating.rate;
            document.getElementById('productCount').innerText = product.rating.count;
            $('#productModal').modal('show');
        }
    };
    xhr.send();
}
