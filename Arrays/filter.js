const fruits = [
    { name: "Mango", price: 200, stock: 5 },
    { name: "Apple", price: 150, stock: 0 },
    { name: "Banana", price: 50, stock: 10 },
    { name: "Peach", price: 300, stock: 0 }
];
const ffrutwithqty = [
    { name: "Orange", price: 120, quantity: 2 },
    { name: "Apple", price: 150, quantity: 1 },
    { name: "Orange Juice", price: 200, quantity: 1 },
    { name: "Banana", price: 50, quantity: 5 },
];
const products = [
    { name: "Laptop", price: 1000, inStock: true, discount: 0.1 },  // 10% off
    { name: "Mouse", price: 50, inStock: false, discount: 0 },      // Out of stock
    { name: "Keyboard", price: 80, inStock: true, discount: 0.2 },  // 20% off
    { name: "Monitor", price: 300, inStock: true, discount: 0 }     // No discount
];
const orders = [
    { id: 1, city: "Karachi" },
    { id: 2, city: "Lahore" },
    { id: 3, city: "Karachi" },
    { id: 4, city: "Islamabad" },
    { id: 5, city: "Lahore" }
];
const users = [
    { name: "Ali", age: 25, role: "Admin" },
    { name: "Hamza", age: 18, role: "User" },
    { name: "Sara", age: 30, role: "User" },
    { name: "Zain", age: 22, role: "Admin" }
];

const tootalbill = ffrutwithqty.filter((items) => items.stock > 0)
    .reduce((acc, item) => acc + item.price, 0)
console.log(tootalbill)


const iwantNamewithFilter = fruits.filter((names) => names.name.includes('Orange'))
    .reduce((accumulator, filterName) => accumulator + filterName.price + filterName.quantity)
console.log(iwantNamewithFilter)

const inStockFIlter = products
    .filter((items) => items.inStock === true && items.discount > 0)
    .reduce((acc, product) => {
        let savedAmmout = product.price * product.discount
        return acc + savedAmmout
    })
console.log(inStockFIlter)


const CityCheckFilter = orders.reduce((acc, order) => {
    const city = order.city;
    acc[city] = (acc[city] || 0) + 1
    return acc;
}, {})
console.log(CityCheckFilter)

const searchTerm = "a";
const CheckAdmin = users.filter((u) => u.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    && u.age > 20
    && u.role === 'Admin'
);
console.log(filteredAdmins);

