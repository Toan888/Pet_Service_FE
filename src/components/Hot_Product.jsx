import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { SendFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Products_Card from "../model/Products_Card";

const Hot_Product = () => {
  const [topProduct, setTopProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/payment/top-products")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTopProduct(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Row className="container" style={{ width: "100%", marginTop: "100px" }}>
      <Col md={5}>
        <div className="text-center">
          <h3>SẢN PHẨM NỔI BẬT</h3>
        </div>
        <div className="text-center mt-5">
          <Link
            to="/listproduct"
            className="btn btn-secondary align-items-center rounded-pill mr-3"
          >
            <span style={{color:"white"}}>Trang chủ</span>
            <SendFill className="ml-2" />
          </Link>
        </div>
      </Col>
      <Col md={7}>
        <div className="d-flex">
          {topProduct.length === 0 ? (
            <p>Không có sản phẩm nào.</p>
          ) : (
            Array.isArray(topProduct) &&
            topProduct.map((p) => (
              <div key={p._id}>
                <Link to={`/detail/${p._id}`}>
                  <Products_Card
                    name={p.name}
                    obj={p.pettype}
                    price={p.price}
                    img={p.image[0]}
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Hot_Product;
