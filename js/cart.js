document.getElementById('checkoutForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Assuming you have a cart object
  const cart = {
      items: JSON.parse(localStorage.getItem('allItem')) || [] // Replace with your actual cart items
  };

  // Check if all required fields are filled
  const fullName = document.getElementById('fname').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('adr').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zip = document.getElementById('zip').value;
  const cardNumber = document.getElementById('ccnum').value;
  const expDate = document.getElementById('exp').value;
  const cvv = document.getElementById('cvv').value;

  if (!fullName || !email || !address || !city || !state || !zip || !cardNumber || !expDate || !cvv) {
      alert('Please fill out all required fields.');
      return;
  }

  // Check if the cart is empty
  if (cart.items.length === 0) {
      alert('Your cart is empty. Please add items to your cart before placing an order.');
      return;
  }

  // Generate random order number and current date/time
  const orderNumber = Math.floor(Math.random() * 1000000);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  // Create the message to display in the popup
  const message = `
      <h3>Order Confirmation</h3>
      <p>Thank you, <strong>${fullName}</strong> for your order!</p>
      <p><strong>Order Number:</strong> #${orderNumber}</p>
      <p><strong>Order Date:</strong> ${formattedDate}</p>
      <p><strong>Shipping Address:</strong> ${address}, ${city}, ${state} ${zip}</p>
  `;

  showPopup(message);

  // Clear the cart and local storage
  localStorage.clear();
  displayCartItems();
  cartLength();
});

function showPopup(message) {
  document.getElementById("popup-message").innerHTML = message;
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

window.onclick = function(event) {
  const popup = document.getElementById("popup");
  if (event.target == popup) {
      popup.style.display = "none";
  }
}

function cartLength() {
  const count = JSON.parse(localStorage.getItem("allItem")) || [];
  const cart = document.getElementById("cartCount");
  cart.innerHTML = count.length;
}

function add(id) {
  event.preventDefault();
  
  const existingItems = JSON.parse(localStorage.getItem("allItem")) || [];
  const itemImg = document.getElementById(`shop-item-cart-${id}`).src;
  const itemName = document.getElementById(`shop-title-${id}`).innerText;
  const itemPrice = parseFloat(document.getElementById(`shop-price-${id}`).innerText.replace(' JD', ''));
  const itemQnt = parseInt(document.getElementById(`shop-quantity-${id}`).value);

  let found = false;

  existingItems.forEach(item => {
      if (item.name === itemName) {
          item.quantity += itemQnt;
          found = true;
      }
  });

  if (!found) {
      existingItems.push({ image: itemImg, name: itemName, price: itemPrice, quantity: itemQnt });
  }

  localStorage.setItem("allItem", JSON.stringify(existingItems));
  displayCartItems();
  cartLength();
}

function displayCartItems() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartItems = JSON.parse(localStorage.getItem('allItem')) || [];

  if (cartItems.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      return;
  }

  let totalPrice = 0;
  let html = '<ul class="list-group">';
  cartItems.forEach((item, index) => {
      const itemTotalPrice = item.price * item.quantity;
      totalPrice += itemTotalPrice;
      html += `
          <li class="list-group-item">
              <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"/>
              <strong>${item.name}</strong> - ${item.price} JD x ${item.quantity} = ${itemTotalPrice.toFixed(2)} JD
              <button class="btn btn-increase" onclick="increaseQuantity(${index})">+</button>
              <button class="btn btn-decrease" onclick="decreaseQuantity(${index})">-</button>
              <button class="btn btn-delete" onclick="deleteItem(${index})">Delete</button>
          </li>
      `;
  });
  html += '</ul>';

  cartItemsDiv.innerHTML = html;
  document.getElementById('totalPrice').innerText = totalPrice.toFixed(2) + " JD";
}

function increaseQuantity(index) {
  const cartItems = JSON.parse(localStorage.getItem('allItem')) || [];
  cartItems[index].quantity += 1;
  localStorage.setItem('allItem', JSON.stringify(cartItems));
  displayCartItems();
  cartLength();
}

function decreaseQuantity(index) {
  const cartItems = JSON.parse(localStorage.getItem('allItem')) || [];
  if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
      localStorage.setItem('allItem', JSON.stringify(cartItems));
  } else {
      deleteItem(index);
  }
  displayCartItems();
  cartLength();
}

function deleteItem(index) {
  const cartItems = JSON.parse(localStorage.getItem('allItem')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('allItem', JSON.stringify(cartItems));
  displayCartItems();
  cartLength();
}

window.onload = function() {
  displayCartItems();
  cartLength();
};
