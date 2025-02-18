import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_Page from "./layout/Home_Page";
import Online_Booking from "./screens/Online_Booking";
import ContactForm from "./screens/Contact";
import Blog from "./screens/Blog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Change_Password from "./screens/Change_Password";
import { useEffect, useState } from "react";
import LoginForm from "./screens/LoginForm";
import RegisterForm from "./screens/RegisterForm";
import Forgot_Password from "./screens/Forgot_Password";
import Product_Detail from "./screens/Product_Detail";
import Home from "./layout/Home";
import ResetPass from "./screens/ResetPass";
import { ToastContainer } from "react-toastify";
import DashBoard from "./DashBoard/Admin/DashBoard";
import EditBlog from "./screens/EditBlog";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Checkout from "./screens/Checkout";
import Bill from "./screens/Bill";
import ViewOrderUser from "./DashBoard/OrderMana/OrderForUser/ViewOrderUser";
import Grooming from "./screens/Grooming";
import ViewBookingUser from "./DashBoard/BookingMana/OrderForUser/ViewBookingUser";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/listproduct" element={<Home />} />
          <Route path="/grooming" element={<Grooming />} />
          <Route path="/online-booking" element={<Online_Booking />} />
          <Route
            path="/login"
            element={
              <LoginForm
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/contact"
            element={
              <>
                <ContactForm />
              </>
            }
          />
          <Route path="/detail/:id" element={<Product_Detail />} />
          <Route
            path="/blog"
            element={
              <>
                <Blog />
                <Footer />
              </>
            }
          />
          <Route
            path="/changepass"
            element={
              <>
                <Change_Password />
                <Footer />
              </>
            }
          />
          <Route path="/Bill/:id" element={<Bill />} />
          <Route
            path="/forgot"
            element={
              <>
                <Forgot_Password />
                <Footer />
              </>
            }
          />
          <Route
            path="/reset-password/:id/:token"
            element={
              <>
                <ResetPass />
                <Footer />
              </>
            }
          />
          <Route
            path="/editblog"
            element={
              <>
                <EditBlog />
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <DashBoard />
                <Footer />
              </>
            }
          />
          <Route
            path="/editblog/:id"
            element={
              <>
                <Header />
                <EditBlog />
                <Footer />
              </>
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-status" element={<ViewOrderUser />} />
          <Route path="/booking-status" element={<ViewBookingUser />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
