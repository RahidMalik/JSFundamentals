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

// 14. splice()

// Description: Array ko add, remove, ya replace karne ka sabse powerful method.Original array mutate hota hai aur removed elements ka array return karta hai(agar koi nahi remove hua toh empty array).
// Signature: array.splice(start, deleteCount, item1, item2, ...)
// start: index jahan se shuru karna hai
// deleteCount: kitne elements hataane hain(0 agar bas add karna ho)
// item1, item2...: add karne wale elements(optional)

// Example(remove):
const number = [1, 2, 3, 4, 5];
const remove = number.slice(2, 2);
console.log(remove) // index 2, se 2 element removed.
console.log(number) // 1,2,5
// Example(add only):
const num = ['a', 'c'];
num.slice(2, 0, 'b');
console.log(num) // ['a','b','c']
// Example(replace):
const AddNum = [1, 2, 3];
AddNum.slice(1, 1, 10)
console.log(AddNum) // 1,10,3

// 15. toString()
// Description: Array ko comma‑separated string mein convert karta hai(har element apna toString() call karta hai).Original array change nahi karta.
//     Example:
const arr = [1, 'hello', true, null];
console.log(arr.toString()); // "1,hello,true,"
console.log([1, 2, 3].toString()); // "1,2,3"

// Note: join() ke saath compare karo — toString() hamesha comma use karta hai, jabki join() me separator choose kar sakte ho.

// 16. indexOf()

// Description: Array ko left - se - right dhundhta hai — pehla index jahan given value milta hai return karta hai.Agar na mile toh - 1. Strict equality(===) use karta hai.Original array change nahi karta.
// Example:

const words = ['cat', 'dog', 'bird', 'dog'];
console.log(words.indexOf('dog')); // 1 (pehla occurrence)
console.log(words.indexOf('fish')); // -1
console.log(words.indexOf('dog', 2)); // 3 (search start index 2 se)

// 17. lastIndexOf()
// Description: Array ko right - se - left dhundhta hai — last index jahan given value milta hai return karta hai.Agar na mile toh - 1. Original array change nahi karta.
//     Example:
const arr = [1, 2, 3, 2, 1];
console.log(arr.lastIndexOf(2)); // 3
console.log(arr.lastIndexOf(5)); // -1
console.log(arr.lastIndexOf(2, 2)); // 1 (search end index 2 tak)

// 18. join()
// Description: Array ke saare elements ko ek string mein jodta hai — separator as argument (default comma). Original array change nahi karta.
//     Example:
const parts = ['Hello', 'world', 'from', 'JS'];
console.log(parts.join(' ')); // "Hello world from JS"
console.log(parts.join('-')); // "Hello-world-from-JS"
console.log(parts.join(''));  // "HelloworldfromJS"
console.log(parts.join());    // "Hello,world,from,JS" (default comma)

// Note: Agar array me undefined ya null ho toh empty string join hota hai:
// console.log([1, null, 3].join('#')); // "1##3"

// 19. reverse()
// Description: Array ko in‑place reverse karta hai(original array mutate hota hai) aur reversed array ka reference return karta hai.
//     Example:
const arr = [1, 2, 3, 4];
console.log(arr.reverse()); // [4,3,2,1]
console.log(arr);           // [4,3,2,1] (mutated)
(6 / 8)
// Note: Agar tumhe original ko preserve rakhna ho, toh pehle slice() kar lo:
const original = [1, 2, 3];
const reversed = original.slice().reverse(); // copy pe reverse
console.log(original); // [1,2,3] unchanged
console.log(reversed); // [3,2,1]

// 🧠 Quick Revision Table
// concat()
// • Mutates?: ❌
// • Return Value: New array (joined)
// • Typical Use: Combine arrays

// every()
// • Mutates?: ❌
// • Return Value: true/false
// • Typical Use: Check all pass condition

// filter()
// • Mutates?: ❌
// • Return Value: New array (passing items)
// • Typical Use: Select subset

// find()
// • Mutates?: ❌
// • Return Value: First matching item or undefined
// • Typical Use: Find single item

// forEach()
// • Mutates?: ❌
// • Return Value: undefined (void)
// • Typical Use: Side‑effects (log, DOM)

// map()
// • Mutates?: ❌
// • Return Value: New array (transformed)
// • Typical Use: Transform each item

// pop()
// • Mutates?: ✅
// • Return Value: Removed last element
// • Typical Use: Stack‑like LIFO

// push()
// • Mutates?: ✅
// • Return Value: New length
// • Typical Use: Add to end

// reduce()
// • Mutates?: ❌
// • Return Value: Single accumulated value
// • Typical Use: Sum, product, flatten, etc.

// shift()
// • Mutates?: ✅
// • Return Value: Removed first element
// • Typical Use: Queue‑like FIFO

// unshift()
// • Mutates?: ✅
// • Return Value: New length
// • Typical Use: Add to front

// slice()
// • Mutates?: ❌
// • Return Value: New array (section)
// • Typical Use: Copy or sub‑array

// sort()
// • Mutates?: ✅
// • Return Value: Sorted array (same ref)
// • Typical Use: Order items

// splice()
// • Mutates?: ✅
// • Return Value: Removed items (array)
// • Typical Use: Add/remove/replace

// toString()
// • Mutates?: ❌
// • Return Value: Comma‑separated string
// • Typical Use: Quick string view

// indexOf()
// • Mutates?: ❌
// • Return Value: First index or -1
// • Typical Use: Find position

// lastIndexOf()
// • Mutates?: ❌
// • Return Value: Last index or -1 (7/8)
// • Typical Use: Find position from end

// join()
// • Mutates?: ❌
// • Return Value: String with separator
// • Typical Use: Build CSV/space‑delimited

// reverse()
// • Mutates?: ✅
// • Return Value: Reversed array (same ref)
// • Typical Use: Flip order
