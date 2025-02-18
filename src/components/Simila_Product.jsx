import React from "react";
import { Row, Col } from "react-bootstrap";

import Products_Card from "../model/Products_Card";

const Simila_Product = () => {
  return (
    <Row
      className="container text-center"
      style={{ width: "100%", marginTop: "100px" }}
    >
      <Col md={12}>
        <h3 style={{ textAlign: "center" }}>Sản phẩm tương tự</h3>
      </Col>
      <Col md={12} className="d-flex">
        <div>
          <Products_Card></Products_Card>
        </div>
        <div>
          <Products_Card />
        </div>
        <div>
          <Products_Card />
        </div>
        <div>
          <Products_Card />
        </div>
      </Col>
    </Row>
  );
};

export default Simila_Product;
