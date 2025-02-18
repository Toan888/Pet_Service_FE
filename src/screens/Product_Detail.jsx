import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Breadcrumb } from "react-bootstrap";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cart, CartPlus, Coin } from "react-bootstrap-icons";
import Simila_Product from "../components/Simila_Product";
import Comment from "./Comment";
import Products_Card from "../model/Products_Card";
import axios from "axios";
import { toast } from "react-toastify";
import "../style/Breadcrumb.css";
const Product_Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [profile, setProfile] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState(1);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const nav = useNavigate();
  let categoryId;

  useEffect(() => {
    fetch(`http://localhost:9999/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // categoryId = data.category._id;
        console.log(categoryId);
        setProduct(data);
      })
      .catch((error) => console.error(error));

    fetch(`http://localhost:9999/products/similar/${id}`)
      .then((response) => response.json())
      .then((data) => setSimilarProducts(data))
      .catch((error) => console.error(error));
  }, [id]);

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

  const increaseQuantity = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const decreaseQuantity = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };
  const handleAddToCart = () => {
    if (isLoggedIn) {
      const cartItem = {
        userId: userId,
        productId: product._id,
        categoryId: product.category._id,
        quantity: value,
      };

      axios
        .post("http://localhost:9999/cart", cartItem)
        .then((response) => {
          toast.success("Thêm vào giỏ hàng thành công!");
          setValue(1);
          console.log(response.data);
        })
        .catch((error) => {
          toast.error("Hãy thử lại");
          console.error({ error: error.message });
        });
    } else {
      toast.error("Vui lòng đăng nhập để mua hàng!");
      nav("/login");
    }
  };

  const handleByNow = () => {
    if (isLoggedIn) {
      const orderData = {
        userId: profile._id,
        productId: product,
        categoryId: product.category._id,
        quantity: value,
      };
      nav("/checkout", { state: { listCart: [orderData] } });
    } else {
      toast.error("Vui lòng đăng nhập để mua hàng!");
      nav("/login");
    }
  };
  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("en-US", {
        currency: "VND",
      });
    }
  }

  return (
    <Container fluid>
      <Row className="mt-1 ml-2">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="http://localhost:3000/listproduct">
            Danh sách sản phẩm
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Chi tiết sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Container className=" mt-4">
        {product && (
          <Row>
            <Col md={6}>
              <div>
                <Zoom>
                  <img
                    alt={product.name}
                    src={selectedImage || product.image[0]}
                    width="500"
                  />
                </Zoom>
                <div>
                  {product.image.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={product.name}
                      width="100"
                      style={{ cursor: "pointer", margin: "5px" }}
                      onClick={() => setSelectedImage(imgSrc)}
                    />
                  ))}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <h2>{product.name}</h2>
                <Coin
                  style={{
                    color: "yellow",
                    fontSize: "27px",
                    marginRight: "5px",
                    marginBottom: "10px",
                  }}
                />
                {formatCurrency(product.price) + " ₫"}
                <div class="d-flex align-items-center">
                  <Button
                    onClick={decreaseQuantity}
                    style={{ borderRadius: "10px" }}
                  >
                    -
                  </Button>
                  <input
                    className="text-center ml-2 mr-2"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{
                      width: "50px",
                      height: "37px",
                      borderRadius: "10px",
                    }}
                  />
                  <Button
                    onClick={increaseQuantity}
                    style={{ borderRadius: "10px" }}
                  >
                    +
                  </Button>
                </div>
                <div class="d-flex mt-4 flex-column ">
                  <Button
                    className="btn btn-danger d-block text-center w-50"
                    onClick={handleAddToCart}
                  >
                    <CartPlus style={{ color: "white", fontSize: "30px" }} />
                    THÊM VÀO GIỎ HÀNG
                  </Button>

                  <Button
                    className="btn btn-success d-block text-center w-50 mt-3"
                    onClick={handleByNow}
                  >
                    <CartPlus style={{ color: "white", fontSize: "30px" }} />
                    MUA NGAY
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
        {product && (
          <Row>
            <div
              className="cards flex-column"
              style={{ width: "100%", height: "28rem", marginRight: "10px" }}
            >
              <h2>Giới thiệu sản phẩm</h2>
              <p>{product.description}</p>
            </div>
          </Row>
        )}
        <Row>
          <Comment />
        </Row>
        <Row>
          <div>
            <Row
              className="container text-center"
              style={{ marginTop: "100px" }}
            >
              <Col md={12}>
                <h3 style={{ textAlign: "center" }}>Sản Phẩm Tương Tự</h3>
              </Col>
              {similarProducts.map((similarProduct) => (
                <Col md={3} key={similarProduct._id}>
                  <Products_Card
                    name={similarProduct.name}
                    obj={similarProduct.pettype}
                    price={similarProduct.price}
                    img={similarProduct.image[0]}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Row>
      </Container>
    </Container>
  );
};

export default Product_Detail;
