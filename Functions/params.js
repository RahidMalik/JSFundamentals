// :id yahan ek placeholder (param) hai
app.get('/api/user/:id', (req, res) => {

    // 1. Params nikalne ka tareeqa (req.params)
    // const userId = req.params.id;

    // 2. Destructuring wala pro tareeqa (jo humne abhi seekha!)
    const { id } = req.params;

    // Ab is ID ko use karke database se banda dhoondo
    const user = users.find(u => u.id === parseInt(id));

    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User nahi mila!");
    }
});


// 3. Multiple Params(Nested Params)
// Aap ek sath do ya teen params bhi le sakte hain.Maslan, aap kisi specific saal(year) ke specific mahine(month) ke posts dekhna chahte hain.
//URL: localhost: 5000 / posts / 2026 / april

app.get('/posts/:year/:month', (req, res) => {
    const { year, month } = req.params;

    res.send(`Aap saal ${year} aur mahine ${month} ki posts dekh rahe hain.`);
});



// from frontend
const product = 501;

const getProduct = async (productId) => {
    const res = await fetch(`http://localhost:5000/api/product/${productId}`)
    const data = res.json();
    console.log(data)
}

// backend
app.delete('/delete-product/:productId', (req, res) => {
    const { productId } = req.params;

    // Database delete logic here...
    res.send(`Product ${productId} delete ho gaya.`);
});

import { Link } from 'react-router-dom';

function UserList({ users }) {
    return (
        <div>
            {users.map(user => (
                <Link key={user.id} to={`/profile/${user.id}`}>
                    {user.name} ki profile dekhein
                </Link>
            ))}
        </div>
    );
}
console.log(UserList("Rahid", 3))