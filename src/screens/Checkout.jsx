import React, { useEffect, useState } from "react";
import "../style/payment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import { CashStack } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import axios from "axios";
const Checkout = () => {
  const location = useLocation();
  const { listCart } = location.state || { listCart: [] };
  const [profile, setProfile] = useState({});
  const username = localStorage.getItem("username");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9999/users/${username}`)
      .then((resp) => resp.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [username]);

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("en-US", {
        currency: "VND",
      });
    }
  }
  const calculateTotal = () => {
    let total = 0;
    listCart.forEach((p) => {
      total += p.productId.price * p.quantity;
    });
    return total;
  };

  const calculateTotalItems = () => {
    let totalItems = 0;
    listCart.forEach((p) => {
      totalItems += p.quantity;
    });
    return totalItems;
  };

  const handlePlaceOrder = () => {
    // const orderData = {
    //   userId: profile._id,
    //   items: listCart.map((item) => ({
    //     productId: item.productId._id,
    //     quantity: item.quantity,
    //   })),
    //   totalAmount: calculateTotal(),
    //   paymentMethod: paymentMethod,
    // };

    const orderData = {
      paymentMethod: paymentMethod,
      listCart: listCart,
      profile: profile,
    };

    axios
      .post("http://localhost:9999/payment", orderData)
      .then((response) => {
        toast.success("Order placed successfully!");
        nav("/order-status");
      })
      .catch((error) => {
        toast.error("Failed to place order, please try again.");
        console.error({ error: error.message });
      });
  };
  const handlePlaceOrderVnPay = () => {
    const orderData = {
      paymentMethod: "VnPay",
      listCart: listCart,
      profile: profile,
      bankCode: "",
    };

    axios
      .post("http://localhost:9999/payment/pay", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data.url);
        if (data.message) {
          toast.success(data.message);
          nav("/");
        } else if (data.url) {
          window.location.href = data.url; // Redirect to the VNPAY payment URL
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error placing order");
      });
  };
  return (
    <div>
      <Row className="mt-2 ml-2">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item active>Thanh toán</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <div className="payment-body">
        <div className="container">
          <div className="row upper">
            <span id="payment">
              <span id="three">Thanh toán</span>
            </span>
          </div>
          <div className="row">
            <Col md={6} sm={6} xs={12}>
              <div className="payment-right border">
                <div className="section-title">
                  <h3 className="title pb-4 text-center">Chi tiết hóa đơn</h3>
                </div>
                <div className="form-group">
                  <label>Họ và Tên</label>
                  <input
                    className="input"
                    type="text"
                    name="full-name"
                    placeholder="Full Name"
                    value={profile.fullname || ""}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={profile.gmail || ""}
                    placeholder="Email"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input
                    className="input"
                    type="text"
                    name="address"
                    value={profile.address || ""}
                    placeholder="Address"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại </label>
                  <input
                    className="input"
                    type="tel"
                    name="tel"
                    value={profile.phone || ""}
                    placeholder="Telephone"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Phương thức thanh toán </label>
                  <select
                    className="input payment_method w-100"
                    style={{ height: "35px" }}
                    name="payment_method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="0">Lựa chọn phương thức thanh toán</option>
                    <option value="COD">Ship Cod</option>
                    <option value="VnPay">Pay with VnPay</option>
                  </select>
                </div>
              </div>
            </Col>
            <Col md={6} sm={6} xs={12}>
              <div className="payment-right border">
                <div className="payment-header">Đơn đặt </div>
                <p>{calculateTotalItems()} items</p>
                {listCart.map((p, index) => (
                  <Row className="payment-row item" key={index}>
                    <Col md={4} className="align-self-center">
                      <img
                        className="img-fluid"
                        src={p.productId.image[0]}
                        alt="Product 1"
                      />
                    </Col>
                    <Col md={8}>
                      <div className="payment-row">
                        <b>{p.productId.name}</b>
                      </div>
                      <div className="payment-row mt-2">
                        <h5>
                          <CashStack
                            style={{ color: "yellow", fontSize: "30px" }}
                          />
                          {formatCurrency(p.productId.price) + " ₫"}
                        </h5>
                      </div>
                      <div className="payment-row text-muted">
                        <h6> Số lượng: {p.quantity}</h6>
                      </div>
                    </Col>
                  </Row>
                ))}
                <hr />

                <div className="payment-row lower">
                  <div className="payment-col text-left">
                    <b>Tổng thanh toán</b>
                  </div>
                  <div className="payment-col text-right">
                    <b>{formatCurrency(calculateTotal()) + " ₫"} </b>
                  </div>
                </div>
                {paymentMethod === "COD" && (
                  <button className="payment-btn" onClick={handlePlaceOrder}>
                    Đặt hàng
                  </button>
                )}
                {paymentMethod === "VnPay" && (
                  <button
                    className="payment-btn"
                    onClick={handlePlaceOrderVnPay}
                  >
                    Đặt hàng
                  </button>
                )}
              </div>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
