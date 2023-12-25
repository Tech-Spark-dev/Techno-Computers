import { Route, Routes } from "react-router-dom";
import {Header} from "./components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Products from "./pages/Products";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/Policies/Privacy";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Orders from "./components/Orders";
import Myorders from "./pages/Myorders";
import UserList from "./components/UserList";
import Shippingpolicy from "./pages/Policies/Shipping";
import Refundpolicy from "./pages/Policies/Refund";

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
        <Route path="/userlist" element={<UserList />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/refund-cancellation" element={<Refundpolicy />} />
        <Route path="/shippingpolicy" element={<Shippingpolicy />} />
      </Routes>
    </div>
  );
}

export default App;
