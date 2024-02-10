import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Products from "./components/Products";
import Orders from "./components/orders";
import Myorders from "./components/Myorders";
import About from "./components/About";
import Userlist from "./components/userlist";
import Termsandconditions from "./components/termsandconditions";
import Shippingpolicy from "./components/shippingpolicy";
import Privacypolicy from "./components/privacypolicy";
import Refundpolicy from "./components/refund-cancel";
import Productview from "./components/Productview";

function App() {
  useEffect(() => {
    document.title = "Techno Computers";
  });

  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/home" && location.pathname !== "/signup" && (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/about" element={<About />} />
        <Route path="/userlist" element={<Userlist />} />
        <Route path="/termsandconditions" element={<Termsandconditions />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />
        <Route path="/refund-cancellation" element={<Refundpolicy />} />
        <Route path="/shippingpolicy" element={<Shippingpolicy />} />
        <Route path="/product/:name" element={<Productview />} />
      </Routes>
    </div>
  );
}

export default App;
