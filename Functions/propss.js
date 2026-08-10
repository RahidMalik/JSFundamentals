
// 1. The Discount Calculator
const calcul = (price, disc) => {
    let saving = (price * disc) / 100;
    return price - saving
}
console.log(calcul(1000, 90))
// 2. giving value to Perameters
function greet(First, Second) {
    console.log("Hello world")
    console.log(`Hello ${First} ${Second} `)
}
greet("Rahid And Malik", "I'm Working on fn")

// 2. The Formatter (Currency)
function formatCurrency(amount) {
    return "Rs" + " " + amount.toLocaleString();
}
console.log(formatCurrency(500000));

// 3. The Validator (Email/Form)
const validateInput = (Input) => {
    if (Input.length === 0) return "Field can't be empty";
    if (Input.length < 5) return " initial value is too short"
    return "valid"
}
console.log(validateInput("Rah"))
console.log(validateInput("Rahid Malik"))
console.log(validateInput(""))

// 4. The Welcome Messenger (Personalization)
function getGreeting(user) {
    return user ? `Wellcome back ${user}!` : "Please login to continue"
}
console.log(getGreeting('Rahid'));
console.log(getGreeting(''));

// 5. The Search Filter (Array Logic)
const filterProducts = (SearchTerm, productList) => {
    return productList.filter(item => item.toLowerCase().includes(SearchTerm.toLowerCase()));
};
if (SearchTerm.trim() === "") {
    return "Please enter a search term";
}
const myFruits = ["Apple", "Banana", "Mango", "Pineapple", "Grapes"];
const result = filterProducts("", myFruits);
const resu = filterProducts("apple", myFruits);
console.log(result)
console.log(resu)

// 6. The "Stock Checker" (Inventory Management)
// In an e-commerce app, you need to check if an item is available before the user clicks "Buy."

const chackStock = (quantityInHand, requestedQuantity) => {
    if (quantityInHand <= 0) return "out of Stock";
    if (requestedQuantity > quantityInHand) return "Insufficient Stock";
    return "Available";
};
console.log(chackStock(0))
console.log(chackStock(1, 2))
console.log(chackStock(2))

// 7. The "Dynamic URL Creator" (Routing)
/// In React, you often need to create a link to a specific product page using its ID.

const getProductLink = (category, product) => {
    return `https://mystore.com/${category}/p/${product}`;
}

console.log(getProductLink("Shoes", 12));

// 8. The "Discount Badge" Logic (Marketing)
// Calculates the percentage off to show a "-20%" badge on a product image.

const getDiscount = (price, discPrice) => {
    let saving = price - discPrice;
    let resultDis = Math.round((saving / price) * 100);
    return `${resultDis}% OFF`
}
console.log(getDiscount(1200, 900))

// 9. The "Email Masker" (Privacy/Security)
// Hides part of an email for security, like r****@gmail.com

const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    return user[0] + "***" + user[user.length - 1] + "@" + domain;
};
console.log(maskEmail("rahid@gmail.com"));

//Imagine you are reading a blog post. If the math says the reading time is 1.2 minutes, it feels weird to say "1 minute read" because you are actually spending more than a minute.
// By using Math.ceil(), we ensure the user knows it will take them at least that many minutes.
const calculateReadingTime = (text) => {
    const wordsPerMinute = 100;
    const wordCount = text.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute) + " min read";
};
console.log(calculateReadingTime("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
// 1. Default Parameters (The "Safety Net")
const WellcomeUser = (name = "Guest") => {
    return "Hello " + name
};
console.log(WellcomeUser("Rahid"))
console.log(WellcomeUser())