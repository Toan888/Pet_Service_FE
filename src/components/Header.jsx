import React, { useEffect, useState } from "react";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import images from "../assets/images/Pet_logo.png";
import { Badge } from "primereact/badge";
import "primeicons/primeicons.css";

import {
  ArrowRepeat,
  BoxArrowInRight,
  Calendar,
  Cart2,
  PersonVcard,
  SendFill,
} from "react-bootstrap-icons";
import Cart from "../screens/Cart";
import axios from "axios";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const nav = useNavigate();
  const role = localStorage.getItem("role");
  const fullname = localStorage.getItem("fullname");
  const user = localStorage.getItem("userId");
  const [services, setServices] = useState([]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    nav("/");
  };

  useEffect(() => {
    // Fetch cart data and count total items
    axios
      .get(`http://localhost:9999/cart/${user}`)
      .then((res) => {
        const fetchedCart = res.data;
        const totalItems = fetchedCart.length;
        setCartCount(totalItems);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user, visible]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/service")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleBookingClick = () => {
    if (isLoggedIn) {
      nav("/online-booking");
    } else {
      nav("/login");
    }
  };

  return (
    <Container fluid className="mt-2">
      <Row className="align-items-center">
        <Col md={2} className="d-flex justify-content-center mt-2">
          <Link to={"/"}>
            <div>
              <img
                src={images}
                alt="Description of the image"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            </div>
          </Link>
        </Col>

        <Col
          md={7}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="d-flex">
            <ul className="list-unstyled d-flex justify-content-between m-0">
              <li className="mr-4 d-flex align-items-center">
                <Link to="/" style={{ color: "#2a3977", fontWeight: "bold" }}>
                  Trang chủ
                </Link>
              </li>
              <li className="mr-4 d-flex align-items-center">
                <Link
                  to="/listproduct"
                  style={{ color: "#2a3977", fontWeight: "bold" }}
                >
                  Sản phẩm
                </Link>
              </li>
              <li className="mr-4">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-services"
                    style={{ color: "#2a3977", fontWeight: "bold" }}
                  >
                    Dịch vụ
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {services.map((s) => (
                      <Dropdown.Item key={s._id} href="/#">
                        {s.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              <li style={{ marginTop: "7px", marginRight: "35px" }}>
                <Link
                  to="/blog"
                  style={{ color: "#2a3977", fontWeight: "bold" }}
                >
                  Bài viết
                </Link>
              </li>
              <li className="mr-4 d-flex align-items-center">
                <Link
                  to="/contact"
                  style={{ color: "#2a3977", fontWeight: "bold" }}
                >
                  Liên hệ
                </Link>
              </li>

              {isLoggedIn &&
                (parseInt(role) === 1 ||
                  parseInt(role) === 2 ||
                  parseInt(role) === 3) && (
                  <li className="mr-4 d-flex align-items-center">
                    <Link
                      to="/dashboard"
                      style={{ color: "#2a3977", fontWeight: "bold" }}
                    >
                      Quản Lí
                    </Link>
                  </li>
                )}
              <li className="mr-4 d-flex align-items-center">
                {isLoggedIn ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-settings"
                      style={{ color: "#2a3977", fontWeight: "bold" }}
                    >
                      {fullname}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/changepass">
                        <ArrowRepeat
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                        Thay đổi mật khẩu
                      </Dropdown.Item>
                      <Dropdown.Item href="/profile">
                        <PersonVcard
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                        Thông tin cá nhân
                      </Dropdown.Item>
                      <Dropdown.Item href="/order-status">
                        <Cart2
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                        Đơn hàng
                      </Dropdown.Item>
                      <Dropdown.Item href="/booking-status">
                        <Calendar
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                        Lịch chăm sóc
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        <BoxArrowInRight
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                        Đăng xuất
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link
                    to="/login"
                    style={{ color: "#2a3977", fontWeight: "bold" }}
                  >
                    Đăng nhập
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </Col>

        <Col md={2} className="d-flex justify-content-center">
          <div>
            <button
              onClick={handleBookingClick}
              className="btn btn-dark d-flex align-items-center rounded-pill mr-3"
            >
              <span>Đặt lịch Online</span>
              <SendFill className="ml-2" />
            </button>
          </div>
        </Col>

        <Col
          md={1}
          className="d-flex justify-content-center"
          onClick={() => setVisible(true)}
          style={{ cursor: "pointer" }}
        >
          <i
            className=" pi pi-cart-minus p-overlay-badge"
            style={{ fontSize: "2rem" }}
          >
            <Badge value={cartCount}></Badge>
          </i>
        </Col>
      </Row>
      {visible && <Cart visible={visible} setVisible={setVisible} />}
    </Container>
  );
};

export default Header;
