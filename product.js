const cart = [];
let isLoggedIn = false; 

function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: parseFloat(productPrice) });
  updateCart();
}
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count'); 
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name} - ₱${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.innerText = `Total: ₱${total.toFixed(2)}`;
  cartCount.innerText = cart.length; 
  document.getElementById('buy-now-button').addEventListener('click', function() {
    if (!isLoggedIn) {
      alert('Please log in to proceed with your purchase.');
    } else {
      alert('Proceeding to checkout...');
    }
  });
  document.getElementById('cancel-button').addEventListener('click', function() {
    document.getElementById('cart').style.display = 'none';
    alert('Cart canceled');
  });
}
function toggleCart() {
  const cartElement = document.getElementById('cart');
  if (cartElement.style.display === 'none') {
    cartElement.style.display = 'block';
  } else {
    cartElement.style.display = 'none';
  }
}
function displayProducts(selectedCategory) {
  const allProducts = document.querySelectorAll('.product-card');
  allProducts.forEach(card => {
    if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.category;
    displayProducts(selectedCategory);
  });
});
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.price').dataset.price;
    addToCart(productName, productPrice);
  });
});
document.getElementById('cart-icon').addEventListener('click', toggleCart);
function logIn() {
  isLoggedIn = true; 
  alert('You are now logged in');
}
function openQuickViewModal(product) {
  const modal = document.getElementById("quick-view-modal");
  const productName = product.querySelector("h3").innerText;
  const productPrice = product.querySelector(".price").innerText;
  const productImageSrc = product.querySelector(".product-image").src;

  document.getElementById("modal-product-name").innerText = productName;
  document.getElementById("modal-product-price").innerText = productPrice;
  document.getElementById("modal-product-image").src = productImageSrc;
  modal.style.display = "block";
}
document.querySelector(".close").onclick = function() {
  document.getElementById("quick-view-modal").style.display = "none";
};
window.onclick = function(event) {
  const modal = document.getElementById("quick-view-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', function() {
    openQuickViewModal(this);
  });
});
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function() {
    let stars = this.parentNode.querySelectorAll('.star');
    let rating = this.getAttribute('data-value');

    stars.forEach(s => {
      if (s.getAttribute('data-value') <= rating) {
        s.classList.add('selected');
      } else {
        s.classList.remove('selected');
      }
    });
  });
});
// Handle Comment Submission
document.querySelectorAll('.submit-comment').forEach(button => {
  button.addEventListener('click', function() {
    let input = this.parentNode.querySelector('.comment-input');
    let commentList = this.parentNode.querySelector('.comment-list');
    let commentText = input.value;

    if (commentText) {
      let newComment = document.createElement('li');
      newComment.textContent = commentText;
      commentList.appendChild(newComment);
      input.value = '';  
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".panel");

  panels.forEach((panel) => {
      panel.addEventListener("click", () => {
          removeActiveClasses();
          panel.classList.add("active");
      });
  });

  const removeActiveClasses = () => {
      panels.forEach((panel) => {
          panel.classList.remove("active");
      });
  };
});

