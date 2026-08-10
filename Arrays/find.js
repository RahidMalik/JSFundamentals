const userCheck = [
    { id: 1, name: "Ali", email: "ali@test.com" },
    { id: 2, name: "Hamza", email: "hamza@test.com" }
];

app.get("/api/auth/login", (req, res) => {
    const Email = req.body.email;
    const findEmail = userCheck.find(u => u.email === Email);

    if (findEmail) {
        res.json({
            message: "i got user",
            data: findEmail,
        })
    } else {
        res.status(404).json({ message: "User nahi mila" });
    }
})


const user = [
    { name: "Ali", age: 25, role: "Admin" },
    { name: "Hamza", age: 18, role: "User" },
    { name: "Sara", age: 30, role: "User" },
    { name: "Zain", age: 22, role: "Admin" }
];
// FIndIndex
const index = users.findIndex(u => u.id === 3);
console.log(index) // output : 2

const findById = users.findById(req.params.id);
console.log(findById)

const findByOne = users.findOne({ email: "test@gmail.com" })
if (!findByOne)
    return "user not found";

const findIdandUpdate = await users.findIdandUpdate(
    req.params.id, { role: "Admin" },
    {
        new: true
    }
);

const findtheuser = user.find(u => u.role === "Admin")

if (findtheuser) {

    if (findtheuser.age >= 20) {
        res.json({
            message: "He is older than 20, yes he is a valid Admin",
            data: findtheuser,
        })
    } else {
        res.json("admin is there but he is under age admin must be 20+")
    }
} else {
    res.status(404).json({ message: "there is no admin for your website" })
}


app.get("/api/product:id", async (req, res) => {
    const findPAndDelete = await users.findByIdAndDelete(req.params.id);
    if (!findPAndDelete) return "user not found"
});

const UserExist = await users.exists({ email: "test@gmail.com" });
if (UserExist) {
    res.json("User is already exist");
};
// Admin Dashboard for showing how many orders are pending.
const pendingOrdersCount = await Order.countDocuments({ status: "Pending" });

res.json({
    title: "Orders to Process",
    count: pendingOrdersCount // Output: e.g., 25
});
console.log(order(10))

