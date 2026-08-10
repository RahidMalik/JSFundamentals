const cart = [
    { name: "Milk", category: "Dairy" },
    { name: "Battery", category: "Hazardous" },
    { name: "Bread", category: "Bakery" }
];


const hasHazardousItem = cart.some(u => u.category === "Hazardous");
if (hasHazardousItem) {
    console.log("Alert: Special handling required for shipping!");
}
// Output: true

const expensiveProduct = users.sort({ price: -1 })
res.json({
    expensiveProduct
})

const cartItems = [
    { name: "Phone", inStock: true },
    { name: "Cover", inStock: true },
    { name: "Cable", inStock: true }
];

const InStock = cartItems.every(item => item.inStock === true);

if (InStock) {
    console.log("yes every product has stock ")
} else {
    console.log("there is not all product which are in stock you have to checkout")
};
// // Output: true (agar ek bhi false hota toh ye false ho jata)
// MethodSawal(Question)Jawab(Answer)someKya koi aik bhi shart(condition) par poora utarta hai ? true / falseeveryKya sab ke sab shart par poore utarte hain ? true / falsesortInhein kisi tartib(order) mein lagao.Naya List(Array)existsDatabase mein ye record maujood hai ? true / false



const users = [
    { id: 1, name: "Ali", age: 25, role: "Admin", status: "Active", marks: [80, 90, 70] },
    { id: 2, name: "Hamza", age: 18, role: "User", status: "Inactive", marks: [40, 50, 60] },
    { id: 3, name: "Sarah", age: 30, role: "Editor", status: "Active", marks: [95, 88, 92] },
    { id: 4, name: "Zain", age: 22, role: "User", status: "Active", marks: [70, 65, 80] },
    { id: 5, name: "Dua", age: 17, role: "User", status: "Active", marks: [85, 90, 80] }
];

// filter
const Filtering = users.filter(u => u.age >= 20);
// Result: Ali, Sarah, Zain (Dua aur Hamza nikal gaye)

const onlyName = users.filter(u => u.age > 20).map(u => u.name)
console.log(onlyName)
// output: [all name that are in users]
const justGetName = users.map(u => u.name)
console.log(justGetName);
// all names:[]

const findSomeOne = find(u => u.id === 3)
console.log(findSomeOne);
// Result: { id: 3, name: "Sarah", ... }

const TotalAge = users.reduce((acc, user) => acc + user.age);
console.log(TotalAge)
// output: 112

const hasEditer = users.some(u => u.role === "Editor")
console.log(hasEditer)
//output: true cuz Sarah is a editor;

const allActive = users.every(u => u.status === "inactive")
// output: true

const zainIndex = users.findIndex(u => u.name === "Zain");
// Result: 3 (Array 0 se shuru hota hai: 0-Ali, 1-Hamza, 2-Sarah, 3-Zain)

const whoIsActive = users.filter(u => u.status === "Active").map((usr) => usr.name);
// result: who active let show them here

const sortByAge = [...users].sort((a, b) => a.age - b.age)
//// Result: Dua (17), Hamza (18), Zain (22), Ali (25), Sarah (30)
// Note: [...users] isliye kiya taake original array kharab na ho.

const userMarksTotal = users.filter(u => u.role === "User").reduce((acc, u) => {
    // Har user ke marks ke array ko bhi sum karna hai
    const sumOfMarks = u.marks.reduce((sum, m) => sum + m, 0)
    return acc + sumOfMarks
})
console.log(userMarksTotal);
// Result: (40+50+60) + (70+65+80) + (85+90+80) = 620

// Array Destructuring — "Tarteeb Se Nikalo"
const colors = ["Red", "Green", "Blue"];

const [pehla, doosra, teesra] = colors;

console.log(pehla); // Red
console.log(doosra); // Green
console.log(teesra); // Blue

const marks = [90, 80, 70, 60, 50];
const [topper, ...otherstudent] = marks;
console.log(topper);      // 90
console.log(baakiBache);  // [80, 70, 60, 50]

const coordinates = [33.6844, 73.0479];

// Foren destructure karein taake samajh aaye kya hai
const [lat, lng] = coordinates;
console.log(`User is at Latitude: ${lat}`);