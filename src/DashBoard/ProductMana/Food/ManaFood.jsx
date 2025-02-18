/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { PenFill, PlusSquareFill, Trash } from "react-bootstrap-icons";
import AddFood from "./AddFood";
import EditProduct from "../Product/EditProduct";

import axios from "axios";

const ManaFood = ({ categoryId }) => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:9999/products/filter/${categoryId}`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error("Error fetching foods:", error);
        });
    }
  }, [categoryId]);

  const imageBodyTemplate = (p) => {
    return (
      <img
        src={p.image[0]}
        alt="image"
        style={{ height: "150px", width: "150px" }}
        className="w-6rem shadow-2 border-round"
      />
    );
  };
  const handleEditFood = (f) => {
    setDataEdit(f); // Cập nhật giá trị dataEdit bằng dữ liệu sản phẩm cần chỉnh sửa
    setEditVisible(true); // Hiển thị giao diện chỉnh sửa sản phẩm
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
      <Row style={{ width: "100%" }}>
        <Col md={12}>
          <div>
            <Row className="ml-1 mb-4 mt-4"></Row>
            {/* <Row className="ml-1 mb-4">
              <Button onClick={() => setVisible(true)}>
                <PlusSquareFill className="mr-2" />
                Add Food
              </Button>
            </Row> */}
          </div>

          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th> Tên</th>
                <th>Hình Ảnh</th>
                <th>Giá</th>
                <th>Số Lượng </th>
                <th>Loại Thú Cưng</th>
                <th colSpan={2}>Hành Động</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {products.map((f, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{f.name}</td>
                  <td>{imageBodyTemplate(f)}</td>
                  <td>{formatCurrency(f.price) +" ₫"}</td>
                  <td>{f.quantity}</td>
                  <td>{f.pettype}</td>
                  <td>
                    <i className="delete">
                      <Trash
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                      />
                    </i>
                  </td>
                  <td>
                    <i className="edit">
                      <PenFill
                        style={{
                          color: "blue",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditFood(f)}
                      />
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {visible === true && (
        <AddFood visible={visible} setVisible={setVisible} />
      )}

      {editVisible === true && (
        <EditProduct
          editVisible={editVisible}
          setEditVisible={setEditVisible}
          data={dataEdit}
          productId={dataEdit._id}
        />
      )}
    </Container>
  );
};

export default ManaFood;
