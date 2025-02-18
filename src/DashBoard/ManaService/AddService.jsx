import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PlusSquareFill, X } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTimeSlot = (props) => {
  const { visible, setVisible } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onHide = () => {
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:9999/service", {
        name,
        description,
        price,
        duration,
      });

      if (response.status === 201) {
        toast.success("Service added successfully!");
        setVisible(false);
        navigate("/dashboard");
      } else {
        console.error("Error adding service:", response.data);
        toast.error("Error adding service. Please try again.");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Error adding service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const dialogFooter = (
    <div style={{ margin: "20px", textAlign: "end" }}>
      <Button
        className="btn btn-success mr-2"
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <PlusSquareFill /> Thêm
      </Button>
      <Button onClick={onHide} className="btn btn-danger">
        <X style={{ fontSize: "22px" }} />
        Đóng
      </Button>
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        footer={dialogFooter}
        className="bg-light dialogForm"
        style={{ width: "70vw" }}
        modal
        header={<div className="custom-dialog-header">Thêm dịch vụ</div>}
      >
        <div className="bg-light p-1" style={{ margin: "25px" }}>
          <div style={{ margin: "40px" }}>
            <form>
              <Row>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="name">
                      <h6>Tên dịch vụ</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Nhập tên dịch vụ"
                      style={{ height: "50px" }}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="description">
                      <h6>Mô tả dịch vụ</h6>
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Nhập mô tả"
                      rows="3"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="price">
                      <h6>Giá</h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      placeholder="Nhập giá"
                      style={{ height: "50px" }}
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="duration">
                      <h6>Thời gian</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="duration"
                      placeholder="Nhập thời gian"
                      style={{ height: "50px" }}
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
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

export default AddTimeSlot;
