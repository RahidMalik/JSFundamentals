import { useEffect, useState } from "react";
import Header from "./header";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import axios from "axios";

// 1. Billing Page Component (Aapka purana logic)
const BillingPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/calculate-bill')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.log("Backend error", err))
  }, []);

  if (!data) return <p className="text-center mt-10">Loading Logic Data...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Billing Logic Practice</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-green-400">
          <p className="text-gray-500">Subtotal</p>
          <h2 className="text-2xl font-bold">${data.subTotal}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-red-400">
          <p className="text-gray-500">Discount</p>
          <h2 className="text-2xl font-bold text-red-500">-${data.discount}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-blue-500">
          <p className="text-blue-600 font-bold">Total</p>
          <h2 className="text-3xl font-black">${data.finalTotal.toFixed(2)}</h2>
        </div>
      </div>
      {/* Items Table */}
    </div>
  );
};

// 2. Product Detail Component
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/product/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error("Error fetching product", err));
    }
  }, [id]);

  if (!product) return <p className="p-10">Product loading or not found...</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
      <h1>{product.name}</h1>
      <p>{product.desc}</p>
      <h3>Price: RS {product.price}</h3>
    </div>
  );
};

// 3. Main App Function
function App() {
  return (
    <Router>
      <Header />
      <Dashboard />
      <Routes>
        {/* Home page par Billing dikhao */}
        <Route path="/" element={<BillingPage />} />

        {/* Product page par details dikhao */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;