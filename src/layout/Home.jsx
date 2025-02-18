import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Container, Form, Row } from "react-bootstrap";
import images from "../assets/images/pet-cover.png";
import Header from "../components/Header";
import Products_Card from "../model/Products_Card";
import { Link } from "react-router-dom";
import { Paginator } from "primereact/paginator"; // Import Paginator
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "../style/font.css"
import axios from "axios";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(null);

  const fetchData = async () => {
    try {
      let response;
      if (search) {
        response = await axios.get(
          `http://localhost:9999/products/search/${search}`
        );
      } else {
        response = await axios.get("http://localhost:9999/products");
      }
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    fetch("http://localhost:9999/category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);
  const onPageChange = (event) => {
    setFirst(event.first);
    setCurrentPage(event.page + 1);
    setRows(event.rows);
  };
  const productsOnPage = products.slice(first, first + rows); // Danh sách sản phẩm trên trang hiện tại

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Row className="mt-4 ml-2">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item active>Danh sách sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row className="container-fluid">
        <Col md={3} className="d-flex align-items-end  m-auto flex-column h-100">
        <h1 style={{color:"#273172", fontWeight:"800", fontSize:"60px", textShadow:"0px 0px 6px rgba(0, 0, 0, 0.15)",fontFamily:"'Fira Sans', sans-serif",lineHeight:"60px",textAlign:"right"}}>PET SERVICE</h1>
        <h2 style={{color:"#4C4C4C",fontSize:"22.75px",fontWeight:"800",  textShadow:"0px 0px 6px rgba(0, 0, 0, 0.15)",fontFamily:"'Fira Sans', sans-serif"}}>SẢN PHẨM</h2>
        </Col>
        <Col md={9}>
          <img src={images} style={{ maxWidth: "75rem", height: "auto" }} />
        </Col>
      </Row>
      <Row >
        <Col md={3} className="mx-auto ">
          <Row className="flex-column">
            <Col md={8} className="mx-auto pb-5">
              <input
                type="text"
                placeholder="  Tìm kiếm...."
                style={{ borderRadius: "10px",margin:"0" }}
                onChange={handleInputChange}

              ></input>
            </Col>
            <Col md={6} className="mx-auto pb-5">
            <Form >
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Danh mục sản phẩm</Form.Label>
                <Form.Control as="select">
                  <option value="0">Tất cả</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
            </Col>
            <Col md={6} className="mx-auto pb-5">
            <Form >
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Danh mục sản phẩm</Form.Label>
                <Form.Control as="select">
                  <option value="0">Tất cả</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
            </Col>
            
          </Row>
        </Col>

        <Col className="d-flex align-content-between flex-wrap " md={9}>
          <Row>
            {productsOnPage.map((product) => (
              <div key={product._id} style={{ marginBottom: "10px" }}>
                <Link to={`/detail/${product._id}`}>
                  <Products_Card
                    name={product.name}
                    obj={product.pettype}
                    price={product.price}
                    img={product.image[0]}
                  />
                </Link>
              </div>
            ))}
          </Row>
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Paginator
          first={first}
          rows={rows}
          totalRecords={products.length}
          onPageChange={onPageChange}
        />
      </Row>
    </div>
  );
};

export default Home;
