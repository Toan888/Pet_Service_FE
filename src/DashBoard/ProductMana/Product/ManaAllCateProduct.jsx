import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import ManaFood from "../Food/ManaFood";
import ManaPet from "../Pet/ManaPet";
import ManaToy from "../Toy/ManaToy";
import ManaMedice from "../Medicine/ManaMedice";
import axios from "axios";
import AllProducts from "./AllProducts";

const ManaAllCateProduct = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.error("Error fetching toys:", error);
      });
  }, []);

  const toyId = category.find((category) => category.name === "Toy")?._id;
  const foodId = category.find((category) => category.name === "Food")?._id;
  const petId = category.find((category) => category.name === "Pet")?._id;
  const medicineId = category.find(
    (category) => category.name === "Medicine"
  )?._id;

  return (
    <Container fluid>
      <Tabs defaultActiveKey="allproducts" id="uncontrolled-tab-example">
        <Tab eventKey="allproducts" title="Tất cả sản phẩm ">
          <AllProducts />
        </Tab>
        <Tab eventKey="Food" title="Thức ăn">
          <ManaFood categoryId={foodId} />
        </Tab>
        <Tab eventKey="Pet" title="Động vật">
          <ManaPet categoryId={petId} />
        </Tab>
        <Tab eventKey="Toy" title="Đồ chơi">
          <ManaToy categoryId={toyId} />
        </Tab>
        <Tab eventKey="Medicine" title="Thuốc">
          <ManaMedice categoryId={medicineId} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ManaAllCateProduct;
