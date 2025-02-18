import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import New_Products_Cart from "../model/New_Products_Cart";

const New_Product = () => {


  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/products/last")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setNewProduct(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  
  return (
    <Row className="container" style={{ width: "100%", marginTop: "100px" }}>
      <Col md={5}>
        <div className="text-center">
          <p>PET SHOP</p>
          <h2>Sản Phẩm Mới Nhất</h2>
        </div>
      </Col>
      <Col md={7} className="d-flex">
        <div>
        </div>
        {newProduct.map((p) => (
            <div key={p._id}>
              <Link to={`/detail/${p._id}`}>
                <New_Products_Cart
                  name={p.name}
                  obj={p.pettype}
                  price={p.price}
                  img={p.image[0]}
                />
              </Link>
            </div>
          ))}
      </Col>
    </Row>
  );
};

export default New_Product;