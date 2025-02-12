const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
let cors = require('cors');

app.use(express.static('static'));
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;
  const existingItem = cart.find((item) => item.productId == productId);

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    cart.push({
      productId: parseInt(productId),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    });
  }

  res.json({ cartItems: cart });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;
  const item = cart.find((item) => item.productId == productId);

  if (item) {
    item.quantity = parseInt(quantity);
    res.json({ cartItems: cart });
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

// Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;
  cart = cart.filter((item) => item.productId != productId);
  res.json({ cartItems: cart });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  res.json({ totalQuantity });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
