const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

const cartItems = [
    { id: 1, name: "Mechanical Keyboard", price: 150, quantity: 1 },
    { id: 2, name: "Gaming Mouse", price: 50, quantity: 2 },
    { id: 3, name: "Monitor", price: 300, quantity: 1 }
];

const products = [
    { id: "1", name: "Laptop", price: 50000, desc: "High performance laptop" },
    { id: "2", name: "Mobile", price: 30000, desc: "Latest smartphone" },
    { id: "3", name: "Watch", price: 5000, desc: "Smart fitness watch" }
];

// logic api 
app.get('/api/calculate-bill', (req, res) => {
    let subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    // Logic: 10% Discount if subtotal > 400
    let discount = subTotal > 400 ? subTotal * 0.10 : 0;
    let TotalAfterDis = subTotal - discount;
    let tax = TotalAfterDis * 0.05;
    let finalTotal = TotalAfterDis + tax;

    res.json({
        items: cartItems,
        subTotal,
        discount,
        tax,
        finalTotal,
    })
})

// Route: Params (id) 
app.get('/api/product/:id', (req, res) => {
    const { id } = req.params;

    const product = products.find(u => u.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product nahi mila" });
    }
});
app.listen(5000, () => console.log("Server running on port 5000"));