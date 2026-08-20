//! 1. 🗺️ Visual Map: TypeScript Core Concepts
// 1. TypeScript kya hai aur JS ke muqable mein kyun use karein?
// TypeScript asal mein JavaScript ka baap (Superset) hai. Jo code JavaScript mein chalta hai, woh TypeScript mein bhi chalta hai, lekin TS iske oopar ek "Type System" ki layer laga deta hai.

// JavaScript ek dynamically typed language hai, yani aap ek variable mein pehle number aur baad mein string save kar sakte hain, aur JS chup chaap maan legi—jab tak browser mein error na phat jaye. TypeScript statically typed hai, jo code likhte waqt hi editor mein laal line (error) de deta hai.
"TypeScript is a statically typed superset of JavaScript. Hum isay JS par prefer isliye karte hain kyunki yeh Compile-Time Error Checking provide karta hai. Is se production mein aane wale runtime errors (jaise undefined is not a function) pehle hi code editor mein catch ho jate hain, auto-completion behtar milti hai, aur large teams mein code maintain karna asan ho jata hai.";

//! 2. any, unknown, never aur void mein farq?
// Yeh chaaron TypeScript ke sab se zyada pooche jane wale "Special Types" hain.

//& any: "Jo marzi aaye aane do." Type checking completely band kar deta hai. Isay use karne ka matlab hai aap wapas raw JavaScript likh rahe hain.

//& unknown: "Kuch bhi aaskta hai, lekin pehle check karo." Yeh any ka safe version hai. Is type ke data par tab tak koi action nahi perform kar sakte jab tak TS ko bata na do ke asal mein yeh konsi type hai.

//& void: "Main kuch nahi laa raha." Jab koi function apna kaam karta hai lekin kuch return nahi karta (just like console.log ya state update).

//& never: "Main kabhi mukammal nahi hounga." Yeh tab lagta hai jab koi function ya toh infinite loop mein phans jaye, ya hamesha Error throw kar de. Aisi function kabhi normal return tak pohanchti hi nahi.

// ❌ any (Dangerous)
let myAny: any = 5;
myAny.toUpperCase(); // Code editor chup rahega, par browser mein phat jayega.

// ✅ unknown (Safe)
let myUnknown: unknown = "Hello";
// myUnknown.toUpperCase(); // ❌ TS error dega: "Object is of type 'unknown'"
if (typeof myUnknown === "string") {
  myUnknown.toUpperCase(); // ✅ Ab allowed hai.
}

// 🟢 void (Returns nothing)
function logMessage(): void {
  console.log("Just printing, returning nothing.");
}

// 🔴 never (Never finishes)
function throwError(msg: string): never {
  throw new Error(msg); // Function yahan break ho jayegi
}

//! 3. Type Aliases aur Interfaces kya hain?
// Dono ka maqsad Object ki shakal (shape) define karna hai, lekin dono ke use cases mein thora farq hai.

// Interface: Sirf aur sirf Objects aur Classes ki shakal ban banane ke liye use hota hai. Iski sab se badi khasiyat Declaration Merging hai (yani agar aap do same naam ke interface banayein, toh wo aapas mein automatically combine ho jate hain).

// Type Alias: Yeh sirf ek "Nickname" hai. Is se aap Objects bhi define kar sakte hain, lekin iski asli power primitive types (string, number) aur Union/Intersection (string | number) banane mein hai.

// 1. Interface (Objects ke liye best hai)
interface User {
  name: string;
  age: number;
}
// Hum interface ko "extend" kar sakte hain:
interface Admin extends User {
  role: string;
}

// 2. Type (Unions aur custom aliases ke liye best hai)
type ID = string | number; // 💡 Interface yeh nahi kar sakta!
type Status = "pending" | "success" | "failed";

("Dono object shapes define karne ke liye use hote hain. Lekin Interfaces extensible hote hain (via extends keyword aur declaration merging), isliye Object-Oriented patterns aur APIs ka schema banate waqt inhe prefer kiya jata hai. Types zyada flexible hote hain kyunki wo Union (|) aur Intersection (&) types ko support karte hain. Meri approach yeh hoti hai ke objects ke liye Interface aur union/primitive types ke liye Type Alias use karun.");

//! 4. Generics kya hain?
// Generics ko aap ek "Khali Dabba" (Template) samajh lein jiska type us waqt decide hota hai jab hum us dabba ko use karte hain.

// Agar aap ek function banate hain jo jo bhi usay dia jaye, wahi wapas kar de, toh aap usay any type nahi dena chahenge, kyunki us se type checking khatam ho jayegi. Generics T (placeholder) use karke uski type ko dynamic banate hain.

// TypeScript

// Bina Generics: Type loss ho rahi hai, any wapis aaraha hai
function echoAny(arg: any): any {
  return arg;
}

// Generics Ke Sath: Jo type jaye gi, TS wohi type lock kar dega
function echo<T>(arg: T): T {
  return arg;
}

// Result:
const str = echo<string>("Hello"); // TS janta hai 'str' string hai
const num = echo<number>(100); // TS janta hai 'num' number hai
