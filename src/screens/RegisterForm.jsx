import React, { useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/login.css";
import logo from "../assets/images/Pet_logo.png";

const RegisterForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const formRef = useRef(null);
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const username = form.elements["input-name"].value;
    const password = form.elements["password_field"].value;
    const fullname = form.elements["input-fullname"].value;

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = { fullname, username, password };
    try {
      const res = await axios.post(
        "http://localhost:9999/users/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      toast.success("Registration successful!");
      nav("/login");
    } catch (error) {
      if (error.response.status === 409) {
        setError("Username already exists");
        toast.error("Username already exists"); // Hiển thị thông báo trên toast
      } else {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs={12} md={6}>
          <div>
            <form
              className="form_container"
              ref={formRef}
              onSubmit={handleRegister}
            >
              <div
                className="logo_container d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <img
                  src={logo}
                  height={80}
                  alt="logo"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="title_container">
                <p className="title">Tạo tài khoản đăng nhập</p>
                <span className="subtitle">
                  Bắt đầu với ứng dụng của chúng tôi, chỉ cần điền vào biểu mẫu
                  bên dưới để Đăng ký.
                </span>
              </div>
              <br />
              <div className="input_container">
                <label className="input_label" htmlFor="email_field">
                  Họ và Tên
                </label>
                <input
                  placeholder="Nhập họ tên của bạn"
                  title="Input title"
                  name="input-fullname"
                  type="text"
                  className="input_field"
                  id="email_field"
                />
              </div>
              <div className="input_container">
                <label className="input_label" htmlFor="email_field">
                  Tên đăng nhập
                </label>
                <input
                  placeholder="Nhập tên đăng nhập của bạn"
                  title="Input title"
                  name="input-name"
                  type="text"
                  className="input_field"
                  id="email_field"
                />
              </div>
              <div className="input_container">
                <label className="input_label" htmlFor="password_field">
                  Mật khẩu
                </label>
                <input
                  placeholder="Nhập mật khẩu"
                  title="Input title"
                  name="password_field"
                  type="password"
                  className="input_field"
                  id="password_field"
                />
              </div>
              <div className="input_container">
                <label className="input_label" htmlFor="confirm_password_field">
                  Nhập lại mật khẩu
                </label>
                <input
                  placeholder="Mật khẩu phải giống nhau"
                  title="Input title"
                  name="confirm_password_field"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="input_field"
                  id="confirm_password_field"
                />
              </div>
              {error && <div className="error_message">{error}</div>}
              <Button variant="dark" className="sign-in_btn mb-2" type="submit">
                Register
              </Button>
              <div>
                <Link to={"/login"} className="text-danger text-opacity-75">
                  Already have an account !
                </Link>
              </div>
            </form>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default RegisterForm;
