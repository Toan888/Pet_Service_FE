import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import images from "../assets/images/1.png";

const Banner = () => {
  return (
    <div className="d-flex justify-content-around container p-0">
      <Col md={6} className="d-flex align-items-center p-0">
        <div>
          <div className="d-flex flex-column text-styled">
            <h5 className="text-primary">PET SERVICE</h5>
            <h1 className="main-title">DỊCH VỤ THÚ CƯNG</h1>
            <h1 className="main-title">TẠI NHÀ</h1>
            <h2 className="sub-title">
              <b>UY TÍN HÀNG ĐẦU</b> TẠI HỒ CHÍ MINH
            </h2>
          </div>
          <div className="d-flex align-items-center mt-4">
            <Link
              to="/online-booking"
              className="btn btn-primary rounded-pill mr-3"
            >
              <span className="font-weight-bolder text-white">XEM THÊM</span>
            </Link>
            <Link
              to="/online-booking"
              className="btn btn-outline-primary rounded-pill"
            >
              <span className="font-weight-bolder">Đặt Lịch ONLINE</span>
            </Link>
          </div>
        </div>
      </Col>

      <Col md={6}>
        <div className="d-flex justify-content-center">
          <img src={images} style={{ maxWidth: "450px", height: "auto" }}></img>
        </div>
      </Col>
    </div>
  );
};

export default Banner;
