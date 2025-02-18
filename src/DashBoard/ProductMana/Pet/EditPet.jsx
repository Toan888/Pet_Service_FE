import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PlusSquareFill, TrashFill, X } from "react-bootstrap-icons";
import { Col, Form, FormSelect, Row } from "react-bootstrap";
import "../../../style/addproduct.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditPet = (props) => {
  const { editVisible, setEditVisible, data } = props;
  const [breed, setBreed] = useState(data?.breed);
  const [gender, setGender] = useState(data?.gender);
  const [image, setImage] = useState([data?.image[0]]);
  const [quantity, setQuantity] = useState(data?.quantity);
  const [pettype, setPetType] = useState(data?.pettype);
  const nav = useNavigate();
console.log(gender);
  const handleEditProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:9999/pets/${data._id}`, {
        breed: breed,
        gender: gender,
        quantity: quantity,
        pettype: pettype,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Chỉnh sửa sản phẩm thành công");
          nav("/dashboard");
          setEditVisible(false);
          console.log(data);
        } else {
          toast.error("Chỉnh sửa sản phẩm thất bại");
        }
      })
      .catch((error) => {
        toast.error("Chỉnh sửa sản phẩm thất bại: " + error.message);
      });
  };

  const onHide = () => {
    setEditVisible(false);
  };

  const dialogFooter = (
    <div style={{ margin: "20px", textAlign:'end' }}>
      <Button
        className=" btn btn-success mr-2"
        type="submit"
        form="editProductForm"
      >
        <PlusSquareFill /> Lưu
      </Button>
      <Button onClick={onHide} className=" btn btn-danger">
        <X style={{ fontSize: "22px" }} />
        Đóng
      </Button>
    </div>
  );
  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        footer={dialogFooter}
        className="bg-light"
        style={{ width: "70vw" }}
        modal
        header={<div className="custom-dialog-header">Chỉnh Sửa</div>}
      >
        <div className="bg-light p-1" style={{ margin: "25px" }}>
          <div style={{ margin: "40px" }}>
            <form id="editProductForm" onSubmit={handleEditProduct}>
              <Row>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="name">
                      <h6>Giống</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="breed"
                      value={breed}
                      placeholder="Input breed"
                      onChange={(e) => setBreed(e.target.value)}
                      style={{ height: "50px" }}
                      required
                    />
                  </div>
                  <div className="form-group w-full">
                    <Form.Group className="mb-3" controlId="formGroupGender">
                      <label className="label" htmlFor="name">
                        <h6>Giới Tính</h6>
                      </label>
                      <Form.Select
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{
                          width: "100%",
                          height: "45px",
                          marginTop: "3px",
                        }}
                      >
                        <option value="">Lựa Chọn Giới Tính</option>

                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                      <p style={{ color: "red" }}></p>
                    </Form.Group>
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="name">
                      <h6>Hình Ảnh</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}

                      placeholder="Input images"
                      style={{ height: "50px" }}
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="name">
                      <h6>Số Lượng</h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="name"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Input quantity"
                      style={{ height: "50px" }}
                      required
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="description">
                      <h6>Loại Thú Cưng</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={pettype}
                      onChange={(e) => setPetType(e.target.value)}
                      placeholder="Input pettype"
                      style={{ height: "50px" }}
                      required
                    />
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditPet;
