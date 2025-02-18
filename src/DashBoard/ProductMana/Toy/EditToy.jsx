import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PlusSquareFill, TrashFill, X } from "react-bootstrap-icons";
import { Col, FormSelect, Row } from "react-bootstrap";
import "../../../style/addproduct.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditToy = (props) => {
  const { editVisible, setEditVisible, data } = props;
  const [name, setName] = useState(data?.name);
  // const [image, setImage] = useState([data?.image[0]]);
  const [quantity, setQuantity] = useState(data?.quantity);
  const [pettype, setPetType] = useState(data?.pettype);
  const nav = useNavigate();
console.log(data);

  const handleEditProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:9999/toys/${data._id}`, {
        name: name,
        quantity: quantity,
        pettype:pettype
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
    <div style={{ margin: "20px",textAlign:'end' }}>
      <Button
        className=" btn btn-success mr-2"
        type="submit"
        form="editProductForm"
      >
        <PlusSquareFill /> Save
      </Button>
      <Button onClick={onHide} className=" btn btn-danger">
        <X style={{ fontSize: "22px" }} />
        Close
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
        header={<div className="custom-dialog-header">Edit Toy</div>}
      >
        <div className="bg-light p-1" style={{ margin: "25px" }}>
          <div style={{ margin: "40px" }}>
            <form id="editProductForm" onSubmit={handleEditProduct}>
              <Row>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="name">
                      <h6>Toy Name</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Input product name"
                      style={{ height: "50px" }}
                      required
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="description">
                      <h6>Images</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="images"
                      // value={image}
                      // onChange={(e) => setImage(e.target.value)}
                      placeholder="Input images"
                      style={{ height: "50px" }}
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="congNgheManHinh">
                      <h6>Quantity</h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Input quantity"
                      style={{ height: "50px" }}
                      required
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="doPhanGiai">
                      <h6>PetType</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={pettype}
                      onChange={(e) => setPetType(e.target.value)}
                      placeholder="Input độ phân giải"
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

export default EditToy;
