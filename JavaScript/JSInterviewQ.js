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

let arr = [1, 2, 3];
arr.length = 0; // []  – preferred when other references shouldn't retain old values
// or
arr = [];  // new empty array (old array may be GC'd if no other refs)

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

const clone = JSON.parse(JSON.stringify(original));

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
let animal = {
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
    __proto__: animal
};

rabbit.sleep();
alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)

let rabbit1 = {
    rabbitJump = true
};

let animal1 = {
    animalEat = true
};
Object.setPrototypeOf(rabbit1, animal1)
console.log(rabbit.animalEats);
console.log(rabbit.rabbitJumps);


// Answer: JavaScript is single‑threaded.The event loop continuously checks the call stack; when it’s empty, it takes the first task from the task queue(macrotasks like setTimeout, I / O callbacks) and pushes it onto the call stack.Microtasks(promise reactions, queueMicrotask) have higher priority – they are drained after each macrotask before the next macrotask runs.

console.log('start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));

console.log('end');
