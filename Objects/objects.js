const user = { id: 1, name: "Ali", role: "Admin", status: "Active" };

const keys = Object.keys(user);
// Result: ["id", "name", "role", "status"]

const value = Object.values(user);
// Result: [1, "Ali", "Admin", "Active"]

const entries = Object.entries(user);
// Result: [ ["id", 1], ["name", "Ali"], ["role", "Admin"], ["status", "Active"] ]

//4. Object Destructuring — "Short-cut Extraction"
const req = { body: { username: "rahid123", email: "r@test.com", age: 25 } };
// Ganda Tareeqa:
// const name = req.body.username;
// const email = req.body.email;
const { username, email, age } = req.body;
console.log(username);

// 5. Spread Operator (...) with Objects — "Copy and Update"

const oldUser = { id: 1, name: "Ali", status: "Inactive" };
const UpdatedUser = [{ ...oldUser, status: "Active" }];
// Result: { id: 1, name: "Ali", status: "Active" }

const fieldName = "email";
const newValue = "new-email@test.com";

const usr = {
    id: 1,
    name: "ali",
    [fieldName]: newValue,// Yahan "email" khud hi key ban jayegi
};
console.log(user.email); // new-email@test.com


//Object Shorthand
const name = "Zain";
const agee = 22;

// Purana tareeqa: { name: name, age: age }
const newUser = { name, agee };
console.log(newUser); // { name: "Zain", age: 22 }

