import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/forgot.css";
import axios from "axios";
import { Breadcrumb, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const Forgot_Password = () => {
  const [gmail, setGmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9999/users/forgot-password", { gmail })
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success("Success");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container fluid>
      <Row className="mt-2 ml-2">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item active>Quên mật khẩu</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Container className="form-container">
        <div className="logo-container">Quên mật khẩu</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Nhập email nhận link cấp mật khẩu"
              onChange={(e) => setGmail(e.target.value)}
              required
            />
          </div>
          <button className="form-submit-btn" type="submit">
            Gửi
          </button>
        </form>
        <p className="signup-link">
          Tôi không có tài khoản
          <a href="/register" className="signup-link link">
            {" "}
            Đăng kí ngay...
          </a>
        </p>
      </Container>
    </Container>
  );
};

export default Forgot_Password;
