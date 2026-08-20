// JavaScript – 38 Practice Questions with Answers & Examples

// Beginner(Q1‑12)

//! 1. What will be the output of the following code ?
console.log(typeof null)

// Answer: "object"
// Explanation: In JavaScript null is a primitive value, but due to a historic bug typeof null returns "object".

//! 2. How do you declare a constant variable in JavaScript that cannot be reassigned ?
//     Answer : Use const.

//! 2. What is difference b/w var,let,const

// - var is function‑scoped and hoisted(initialized as undefined).
// - let is block‑scoped({}) and hoisted but not initialized(Temporal Dead Zone).

var num1 = 1; // that is redeclared reassign hoisted 
let num2 = 2; // Block scope, can be reassign but not redeclared.
const num3 = 3; // Block scope,can't be reassign or redeclared.

function test() {
    if (true) {
        var a = 1;
        let b = 2;
    }
    console.log(a); // 1 (accessible)
    console.log(b); // ReferenceError: b is not defined
}


//! 3. Explain hoisting in javascript.

// means vasiable and fundion are moved to top of their scope belore execution.
// vas is hoisted but initiadized cwith undehned
// let, const are hoisted but stay in tempoad zone
console.log(num); // undefined
var num = 2;
// console.log(TDM) //console.log(TDM) ReferenceError: Cannot access 'TDM' before initialization
let TDM = 2;
console.log(TDM) // 2  we can't declare before variable.

const Tdm2 = 4 * 5;
console.log(Tdm2) //20 also  we can't declare before const variable.

//!  4. What is the difference between == and === in JavaScript?  
// Answer:
// - == (loose equality) compares values after type conversion.  
// - === (strict equality) compares both value and type without conversion.

// Example:
// JavaScript

5 == "5"   // true  (string "5" converted to number)
5 === "5"  // false (different types)

//! 5. What will be the output ?
//     JavaScript

var x = 5;
console.log(x + "5");

// Answer: "55"
// Explanation: + with a string triggers string concatenation, so 5 is converted to "5" → "5" + "5".

//! 6. How do you create an empty array in JavaScript ?
//     Answer : [] or new Array().
//         JavaScript

const arr = [];          // preferred
// or
const arr2 = new Array();

//! 7. What does the isNaN() function do?  
// Answer : Returns true if the value is Not‑a‑Number after coercion to a number.
// JavaScript

isNaN("hello"); // true
isNaN(NaN);     // true
isNaN("12");    // false  ("12" → 12, which is a number)

//! 8. How do you convert a string to an integer in JavaScript ?
// Answer : Use parseInt()(radix recommended) or Number().
// JavaScript

parseInt("42", 10);   // 42
Number("42");         // 42

//! 9. How do you check if a variable is an array in JavaScript ?
//     Answer : Use Array.isArray().
//         JavaScript

Array.isArray([]);   // true
Array.isArray({});   // false

// Intermediate(Q13‑26)

//! 10. What is a closure in JavaScript ? Give a simple example.
// Answer: A closure is a function that retains access to its outer(enclosing) function’s scope even after the outer function has returned.

function makemulple() {
    let count = 0;
    return function () {
        count++
    }
}
const counter = makemulple()
console.log(counter()) // 1
console.log(counter()) // 2
//  The inner function “remembers” the count variable from its lexical scope.

// 1. Data Privacy (Private Variables)
// JS mein pehle private variables ka direct keyword nahi tha, toh Closure ki madad se data ko hidden rakha jata tha taake bahar se koi directly change na kar sake.

function createBankAccount(initialBalance) {
    let balance = initialBalance; // 🔒 Private Variable

    return {
        deposit(amount) {
            balance += amount;
            return `Deposited: Rs.${amount}. New Balance: Rs.${balance}`;
        },
        withdraw(amount) {
            if (amount > balance) return "Insufficient Funds!";
            balance -= amount;
            return `Withdrew: Rs.${amount}. Remaining Balance: Rs.${balance}`;
        },
        getBalance() {
            return `Current Balance: Rs.${balance}`;
        }
    };
}

const myAccount = createBankAccount(1000);

console.log(myAccount.deposit(500));  // Deposited: Rs.500. New Balance: Rs.1500
console.log(myAccount.withdraw(200)); // Withdrew: Rs.200. Remaining Balance: Rs.1300
console.log(myAccount.balance);       // ❌ undefined (Direct access possible nahi hai!)

// Closure Ka Role: balance variable outer function ka tha, lekin return hone wale teeno functions ko balance ki memory yaad rahi.

function createMultiplier(multiplier) {
    // Outer parameter (multiplier) memory mein lock ho jaye ga
    return function (number) {
        return number * multiplier;
    };
}

// Customized functions banaye:
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15

// ^ Closure Ka Role: double() ne multiplier = 2 yaad rakha aur triple() ne multiplier = 3 yaad rakha, halanke createMultiplier ka kaam kab ka khatam ho chuka tha.

// ! 11. What is the output of this.
// JavaScript

for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}

// Answer: 3 3 3(printed after ~100 ms).

// Explanation: var is function‑scoped, so all callbacks close over the same i, which has reached 3 by the time the timeout fires.

// Fix: Use let(block‑scoped) or an IIFE.

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, 100);
} //Todo:-  Answer:0 1 2 3 4 (printed after ~100 ms).



for (let count = 0; count < 3; count++) {
    setTimeout(() => {
        console.log(count)
    }, 100);
}; // // Answer: 0 1 2 (printed after ~100 ms).

//! 12. How does the this keyword work in JavaScript ? Explain with an example.
// Answer: this refers to the object that called the function (call‑site). Its value depends on how the function is invoked.

const obj = {
    // name = "Rahid",
    // age = 20,
    greet: () => {
        console.log(` Hello, ${this.name}  your age is ${this.age}`);
    },
};
obj.greet(); // "Hello, Rahid" your age is (this = obj)

const greet = obj.greet();
// greet();  "Hello, undefined" (this = global/window in non‑strict mode)
// In strict mode, this would be undefined.



//! 13. What is the difference between call(), apply(), and bind() ?
//^     Answer : All three let you set the this value for a function call.

//* - func.call(thisArg, arg1, arg2, …) – invokes immediately, arguments passed individually.
//* - func.apply(thisArg, [arg1, arg2, …]) – invokes immediately, arguments passed as an array.
//* - func.bind(thisArg, arg1, arg2, …) – returns a new function with this(and any pre‑se   t args) bound; does not invoke immediately.

//1. call()
function greet2(city, country) {
    console.log(`Mera naam ${this.name} hai, main ${city}, ${country} se hoon.`);
}

const user = { name: "Rahid" };

// Immediate call + comma separated arguments
greet2.call(user, "Karachi", "Pakistan");

// 2. apply()

// Immediate call + Array of arguments
greet2.apply(user, ["Karachi", "Pakistan"]);

// 3. bind()
// Execution: Function ko fauran run NAHI karta.

// Return Value: Yeh ek naya function return karta hai jiska this context permanently fix ho chuka hota hai.Aap is naye function ko baad mein kabhi bhi execute kar sakte hain.

//     JavaScript
// Immediate run nahi hoga, pehle naya function banega
const myBoundFunc = greet.bind(user, "Karachi", "Pakistan");

// Baad mein jab zaroorat ho run karein:
myBoundFunc();

//! 14. Explain event delegation in JavaScript.
// Answer: Instead of attaching an event listener to each individual element, you attach a single listener to a parent element.The listener uses event.target(or event.delegateTarget) to determine which child triggered the event.

// Example(delegating clicks on list items):
// JavaScript

document.getElementById('menu').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        console.log('Clicked item:', e.target.textContent);
    }
});
// Only one listener is needed, even if <li> items are added/removed dynamically.

//! 20. What is the difference between null and undefined?
// Answer:
// - undefined means a variable has been declared but not assigned a value(or a function returns nothing).
// - null is an assignment value representing “no value” or “empty”. It is an object type(historical bug).


let a; // undefined
console.log(a);

let b = null
console.log(b) // null

//! 21. How do you empty an array in JavaScript?
// Answer: Set its length to 0 (mutates the original) or reassign a new empty array (if no other references).

let array = [1, 2, 3];
array.length = 0; // []  – preferred when other references shouldn't retain old values
// or
array = [];  // new empty array (old array may be GC'd if no other refs)

//! 23. What is the difference between localStorage and sessionStorage?

// Both are used for web storage Apis (key-value, string).
// - localStorage: data persists until explicitly cleared; survives browser / tab closes.
// - SessionStorage:  data persists only for the duration of the page session (as long as the tab/window is open).
// Reloading the page keeps it; opening a new tab / window starts a fresh session.

localStorage.setItem('theme', 'dark');
sessionStorage.setItem('temToken', 'abc127');

// 24. How do you deep clone an object in JavaScript ?
//   Answer : There’s no built‑in deep copy, but common ways:
// - JSON.parse / stringify(works for JSON‑serializable data).
// - Structured cloning via structuredClone()(modern browsers / Node).
// - Recursive copy or libraries like Lodash’s _.cloneDeep.

const original = { a: 1, b: { c: 2 }, d: [3, 4] };
const clone = structuredClone(original);
clone.b.c = 99;
console.log(original); // 2(Unchanged).
console.log(clone) // 99

// JSON method(limited):
// JavaScript

const clone2 = JSON.parse(JSON.stringify(original));
console.log(clone2)

//! 26. Explain the concept of prototypal inheritance in JavaScript.
// Answer: Objects can inherit properties from other objects via their prototype ([[Prototype]]).
// When you look up a property, JavaScript first checks the object itself; if not found, it looks at Object.getPrototypeOf(obj),
// then its prototype, and so on up to Object.prototype.

// Example(using Object.create):  
const animal = {
    speak() {
        return `${this.name} make a noise`
    },
};

const dog = Object.create(animal);
dog.name = 'Rex';
console.log(dog.speak()); // "Rex makes a noise"


// animal has methods
let animal1 = {
    walk() {
        if (!this.isSleeping) {
            alert(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};

let rabbit = {
    name: "White Rabbit",
    __proto__: animal1
};

rabbit.sleep();
alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)

let rabbit1 = {
    rabbitJump = true
};

let animal2 = {
    animalEat = true
};
Object.setPrototypeOf(rabbit1, animal2)
console.log(rabbit.animalEats);
console.log(rabbit.rabbitJumps);


// Answer: JavaScript is single‑threaded.The event loop continuously checks the call stack; when it’s empty, it takes the first task from the task queue(macrotasks like setTimeout, I / O callbacks) and pushes it onto the call stack.Microtasks(promise reactions, queueMicrotask) have higher priority – they are drained after each macrotask before the next macrotask runs.

console.log('start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));

console.log('end');

//! What is the difference between setTimeout, setInterval, and requestAnimationFrame?  
// setTimeout
const time = setTimeout(() => {
    console.log("3 sec complete")
}, 300)
// setInterval
let countStart = 0;
const Looping = setInterval(() => {
    countStart++;
    console.log(` Sec: ${countStart}`);

    if (countStart >= 10) clearInterval(Looping)
}, 3000);
// 3. requestAnimationFrame(Smooth Visual Animations
let boxPosition = 0;

function animate() {
    boxPosition += 2;
    document.getElementById("box").style.left = boxPosition + "px";

    if (boxPosition < 300) {
        // Agle frame par dobara call karne ke liye recursive call
        requestAnimationFrame(animate);
    }
}

// Animation start
requestAnimationFrame(animate);

//! 29. What is currying in JavaScript? Give an example.
const applyDiscount = (discount) => (price) => price - (price * discount / 100);
//* Currying ek Coding Technique hai...

//* Jo HOF ke Structure par chalti hai...

//* Aur Closure ki Memory ko istemal karti hai!

// 💻 Code Comparison
// ❌ Without HOF(Simple Normal Function)

// Dono parameters ek hi function mein le liye
const applyDiscount = (discount, price) => {
    return price - (price * discount / 100);
};

// 🚀 Usage: Dono values ek sath pass hungi
console.log(applyDiscount(10, 1000)); // Output: 900

// ✅ With HOF & Currying(Jo aapne likha tha)
// Pehla function discount leta hai aur ek naya function return karta hai
const applyDiscount = (discount) => (price) => {
    return price - (price * discount / 100);
};

// 🚀 Usage: Execution do steps mein hoti hai
console.log(applyDiscount(10)(1000)); // Output: 900

//! What is memoization and how do you implement it in JavaScript ?  
// ⚛️ React `useMemo` (Component lifecycle se tied hai)
// Component re-render hone par heavy value re-calculate hone se bachata hai.
const filteredData = useMemo(() => heavyFilter(items), [items]);

// ⚡ Plain JS `memoize()` (Global / Universal Cache)
// Jab same inputs par poori app mein kahin bhi calculation repeat ho rahi ho (Component mount/unmount hone ke BAAD bhi cache rehta hai).
const fastCalculation = memoize(heavyCalculation);

//  What are promises in JavaScript? Explain the three states of a promise.  
// 1. Promise Banayein (Producer)
const fetchData = new Promise((resolve, reject) => {
    let isSuccess = true;

    // Simulate 2-second server delay (Pending state)
    setTimeout(() => {
        if (isSuccess) {
            resolve("Data Successfully Mil Gaya!"); // State -> Fulfilled
        } else {
            reject("Server Connection Failed!"); // State -> Rejected
        }
    }, 2000);
});

//! 2. Promise Consume Karein (Consumer)
// Pehle 2 sec tak promise 'Pending' state mein rahega
fetchData
    .then((response) => {
        console.log("✅ SUCCESS:", response); // Runs if Fulfilled
    })
    .catch((error) => {
        console.log("❌ ERROR:", error); // Runs if Rejected
    })
    .finally(() => {
        console.log("🔄 Operation Finish (Settled)"); // Runs regardless of state
    });

// ⚛️ Aap aise likhte hain:
const fetchData = async () => {
    try {
        const res = await fetch('/api/user'); // 👈 await Promise ka intezar kar raha hai
        const data = await res.json();
        setUser(data);
    } catch (error) {
        console.log("Error aagaya:", error); // 👈 Agar Promise REJECT hua toh catch chalega
    }
};

// ❌ Slow (One by one: Total time = 1s + 1s + 1s = 3 seconds)
const user = await fetchUser();
const posts = await fetchPosts();
const comments = await fetchComments();

// ✅ Fast (Parallel: Teeno ek sath chalenge, Total time = ~1 second)
const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
]);

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) resolve('Data loaded');
        else reject('Error occurred');
    }, 1000);
});

p.then(msg => console.log(msg))   // "Data loaded" after 1s
    .catch(err => console.error(err));

//! What is the difference between Promise.all(), Promise.race(), and Promise.allSettled() ?

// ❌ Agar ek bhi fail hua toh direct .catch() mein chala jayega
Promise.all([fetchUsers(), fetchPosts(), fetchComments()])
    .then(([users, posts, comments]) => console.log("Saara data mil gaya!"))
    .catch(err => console.log("Ek API fail ho gayi, sab canceled!", err));

// 2. Promise.allSettled() $\rightarrow$ "Fail Ho Ya Pass, Sab Ka Report Chahiye"
Promise.allSettled([sendEmail1(), sendEmail2(), sendEmail3()])
    .then(results => {
        results.forEach((res, index) => {
            if (res.status === 'fulfilled') console.log(`Email ${index} sent!`);
            if (res.status === 'rejected') console.log(`Email ${index} failed:`, res.reason);
        });
    });

// Best Use Case: Bulk tasks ya independent operations(jaise 100 emails bhejna ya multiple files upload karna), jahan 1 - 2 fail bhi ho jayein toh baki process rukna nahi chahiye.

// 3. Promise.race() $\rightarrow$ "Jo Sab Se Pehle Pahunche (Fastest)"

const apiCall = fetch('/api/data');
const timeout = new Promise((_, reject) => setTimeout(() => reject("Timeout!"), 3000));

// Jo pehle 3 sec mein complete hoga woh jeet jayega
Promise.race([apiCall, timeout])
    .then(res => console.log("API Fast thi:", res))
    .catch(err => console.log("API Slow thi ya crash hui:", err));
//   Best Use Case: API Request timeout feature lagane ke liye, ya multiple mirror servers se sab se fast response lene ke liye.

//!. Explain the concept of hoisting with respect to function declarations and function expressions.
// ✅ Function define hone se pehle call kar diya:
sayHello(); // Output: "Hello World!"

// Function Declaration
function sayHello() {
    console.log("Hello World!");
}

// ❌ Call karne par TypeError aayega:
sayHello(); // TypeError: sayHello is not a function

var sayHello = function () {
    console.log("Hello World!");
};
//! What is the difference between shallow copy and deep copy in JavaScript ? Give examples of each.
// Dono mein sab se bada farq Nested Objects(Objects ke andar Objects / Arrays) ko handle karne ka hota hai.

// 1. Shallow Copy(Sathi Copy)
// Definition: Shallow Copy sirf outer / top - level properties ki nayi memory banata hai.Agar object ke andar koi nested object ya array ho, toh yeh unka actual data copy nahi karta, balki unka Memory Reference(pointer) share karta hai.

//     Result: Outer level change karne se original object par farq nahi parta, lekin nested object change karne se Original Object bhi badal jata hai.

const originalUser = {
    name: "Ibad",
    address: {
        city: "Karachi",
        country: "Pakistan"
    }
};

// Spread Operator (...) se Shallow Copy banayi:
const shallowCopy = { ...originalUser };

// 1. Top-level property change karein:
shallowCopy.name = "Ali";

// 2. Nested property change karein:
shallowCopy.address.city = "Lahore";

console.log(originalUser.name);         // Output: "Ibad" (Top-level Safe rehta hai)
console.log(originalUser.address.city); // Output: "Lahore" ❌ (Original bhi change ho gaya!)

// 🛠️ Shallow Copy Banane Ke Tareeqay:
// Spread Operator: { ...obj } ya[ ...arr ]

// Object.assign: Object.assign({}, obj)

// Array Methods: arr.slice() ya Array.from(arr)

// 2. Deep Copy(Gahri Copy)
// Definition: Deep Copy original object ke har level(nested structures sahit) ko completely, recursively naye memory address par copy karta hai.

//     Result: Copy wale object mein koi bhi change karein(chahe outer ho ya nested), Original Object 100 % safe aur unchanged rehta hai.

const originalUser = {
    name: "Ibad",
    address: {
        city: "Karachi",
        country: "Pakistan"
    }
};

// Modern Native JS Method: structuredClone()
const deepCopy = structuredClone(originalUser);

// Nested property change karein:
deepCopy.address.city = "Lahore";

console.log(deepCopy.address.city);     // Output: "Lahore"
console.log(originalUser.address.city); // Output: "Karachi" ✅ (Original bilkul safe hai!)

// structuredClone() (Modern JS - Best Practice):

// Modern browsers aur Node.js mein built -in hai.Complex structures, dates, aur maps ko easily deep copy karta hai.

//     JavaScript
// const deepCopy = structuredClone(originalObj);
// JSON.parse(JSON.stringify())(Purana Workaround):

// Pehle zayada use hota tha, lekin iski kuch limitations hain(yeh Functions, undefined, ya Symbol ko drop kar deta hai).
const deepCopy = JSON.parse(JSON.stringify(originalObj));


//! ❌ Without Event Delegation(Purana / Kharab Tareeqa):
// Isme hum querySelectorAll karke loop chalate hain aur har item par alag listener lagate hain:

// ❌ Agara 1000 items hue, toh memory mein 1000 event listeners ban jayenge!
document.querySelectorAll('#todo-list li').forEach((item) => {
    item.addEventListener('click', (e) => {
        console.log("Clicked:", e.target.textContent);
    });
});

const todoList = document.getElementById('todo-list');

// ✅ Sirf 1 listener parent par lagaya
todoList.addEventListener('click', (e) => {
    // 🔍 Check karein ke click sirf 'LI' par hi hua hai na?
    if (e.target.tagName === 'LI') {
        console.log("Clicked:", e.target.textContent);
    }
});

// ! syncronus(blocking)

console.log("1. Order diya");

// Heavy calculation / delay (Wait karna parega)
alert("2. Khaana ban raha hai...");

console.log("3. Khaana kha liya");

// Output:
// 1. Order diya
// (Pop-up ko jab tak OK nahi karenge, line 3 nahi chalegi)
// 2. Khaana ban raha hai...
// 3. Khaana kha liya

// ! asyncronus(Non-Blocking)

console.log("1. Order diya");

// Background task (2 seconds ka timer)
setTimeout(() => {
    console.log("2. Khaana ready ho gaya!");
}, 2000);

console.log("3. Table par baith gaye");

// Output:
// 1. Order diya
// 3. Table par baith gaye
// 2. Khaana ready ho gaya! (2 sec baad background se aaya)

// JavaScript inherently Single-Threaded (ek waqt mein ek kaam karne wali) language hai. Synchronously heavy operations karne se browser/app hang ho jati hai.

// Isi waja se JS Event Loop aur Asynchronous Web APIs ka sahara leti hai taake heavy tasks background mein hote rahein aur app fast aur smooth chale!

//! 🧱 1. Key Components Ka Role
// Call Stack(LIFO - Last In, First Out):

// JS engine ka "working table".Jahan aapka synchronous code ek ek karke execute hota hai.

//     Single - threaded hone ki waja se JS ek waqt mein Call Stack par sirf ek hi line execute kar sakti hai.

// Web APIs / Background Threads:

// Jab JS ko koi asynchronous kaam milta hai(jaise 2 sec ka timer ya API call), JS use Web API ko hand - over kar deta hai taake Call Stack block na ho.

// Microtask Queue(VIP / High Priority Queue):

// Promises ka response(.then(), .catch (), .finally()), queueMicrotask(), aur MutationObserver yahan aate hain.

//     Rule: Is queue ki priority bohot high hoti hai.

// Macrotask Queue / Callback Queue(Normal Priority):

// setTimeout, setInterval, setImmediate, aur DOM Events(clicks, inputs) ke callbacks yahan aate hain.

// Event Loop:

// Yeh ek continuous loop / watchdog hai jo 24 / 7 sirf do cheezein check karta hai:

// Kya Call Stack bilkul khali hai ?

//     Agar Stack khali hai, toh pehle Microtask Queue ke saare tasks ko Stack mein bhejo.Jab woh zero ho jayein, tab Macrotask Queue se 1 task uthao.

// 1. VVIP (Normal Code)
console.log("1. Dulha: Main khana kha raha hoon!");

// 2. AAM JANTA (Macrotask) -> Isko 0 second ka time diya hai
setTimeout(() => {
    console.log("2. Aam Janta: Hamari bari sabse end mein aayi (Macrotask)");
}, 0);

// 3. VIP (Microtask)
Promise.resolve().then(() => {
    console.log("3. VIP Rishtedaar: Dulhay ke baad foran meri bari (Microtask)");
});

// 4. VVIP (Normal Code)
console.log("4. Dulhay ka Dost: Main bhi direct khaunga!");

//! 1. Debounce 🛑 (Intezar karo jab tak action ruk na jaye)
// Concept: "Jab tak user lagatar action kar raha hai, main apna function nahi chalaunga. Jab user rukega (pause lega), uske X seconds baad main apna kaam karunga."

let timer;
function debounceSearch() {
    clearTimeout(timer); // Purana timer cancel karo
    timer = setTimeout(() => {
        console.log("API Call: User ne typing rok di hai!");
    }, 500); // 500ms ka pause aane par hi API call hogi
}

//! 2. Throttling ⏱️ (Time par pabandi laga do)
// Concept: "User chahay 1 second mein 100 dafa button dabaye, main apna function har X seconds mein sirf EK BAAR hi chalaunga." Isme pause ka intezar nahi hota, isme rate limit(speed limit) lagai jati hai.

let isReady = true;
function throttleFire() {
    if (!isReady) return; // Agar ready nahi hai, toh wapis jao (Ignore click)

    console.log("🔫 Goli chal gayi!");
    isReady = false; // Gun ko lock kar do

    setTimeout(() => {
        isReady = true; // 1 second baad gun dobara ready hogi
    }, 1000);
}
// ! spread operator
// 1. Spread Operator 📤 (Unpacking)
// Kaam: Yeh kisi Array ya Object ke elements ko nikal kar alag alag(spread) kar deta hai.
// Pehchan: Yeh hamesha function ko call karte waqt, ya naye Arrays / Objects banate waqt(Right side par) use hota hai.
const boys = ["Ali", "Ahmed"];
const girls = ["Sana", "Sara"];

// Dono arrays ko khol kar ek naye array mein daal diya
const allStudents = [...boys, ...girls, "Zain"];
console.log(allStudents); // Output: ["Ali", "Ahmed", "Sana", "Sara", "Zain"]
// ! rest operator
// 2. Rest Operator 📥 (Packing)
// Kaam: Yeh bikhri hui arguments ya bache hue(rest) elements ko jama karke wapas ek Array mein pack kar deta hai.
// Pehchan: Yeh hamesha Function Parameters(define karte waqt) ya Destructuring(Left side par) use hota hai.Yeh hamesha aakhir(last) mein aata hai.

// Kahan Use Hota Hai ?

//     Functions mein Unlimited Arguments lene ke liye:
// Sochein aapko ek function banana hai jo 2, 4, ya 10 kitne bhi numbers ko plus kare:
// 'numbers' variable baki aane wali saari values ka ek Array ban jayega
function sum(firstValue, ...numbers) {
    console.log("Pehli value:", firstValue);
    console.log("Baqi sab (Rest):", numbers); // Yeh ek array ban gaya hai
}

sum(10, 20, 30, 40, 50);
// Output:
// Pehli value: 10
// Baqi sab (Rest): [20, 30, 40, 50]

const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

const [fav1, fav2, ...bakiFruits] = fruits;

console.log(fav1); // Output: "Apple"
console.log(fav2); // Output: "Banana"
console.log(bakiFruits); // Output: ["Mango", "Orange", "Grapes"] (Bache hue pack ho gaye)

// ! Pure Function
// ✅ Pure Function (Acha Bacha)
// Yeh function dono rules follow kar raha hai.Jab bhi aap isay 2 aur 3 denge, yeh hamesha 5 dega.Yeh bahar ki kisi cheez ko nahi chher raha.
function addNumbers(a, b) {
    return a + b;
}

console.log(addNumbers(2, 3)); // Output: 5 (Hamesha 5 hi aayega)

//! ❌ Impure Function (Kharab Bacha)
function addWithRandom(a) {
    // Math.random() ki waja se output har baar alag aayega
    return a + Math.random();
}

console.log(addWithRandom(5)); // Output: 5.123
console.log(addWithRandom(5)); // Output: 5.876 (Input same, lekin output badal gaya!)

let totalAmount = 100; // Global variable

function addToTotal(amount) {
    totalAmount = totalAmount + amount; // ❌ Bahar ke variable ko change kar diya (Side Effect)
    return totalAmount;
}