import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PencilSquare, X } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditService = ({ editVisible, setEditVisible, data, slotId }) => {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [price, setPrice] = useState(data.price);
  const [duration, setDuration] = useState(data.duration);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onHide = () => {
    setEditVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:9999/service/${slotId}`,
        {
          name,
          description,
          price,
          duration,
        }
      );

      if (response.status === 200) {
        toast.success("Dịch vụ đã được cập nhật thành công!");
        setEditVisible(false);
        navigate("/dashboard");
      } else {
        toast.error("Lỗi khi cập nhật dịch vụ. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật dịch vụ:", error);
      toast.error("Lỗi khi cập nhật dịch vụ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const dialogFooter = (
    <div style={{ margin: "20px", textAlign: "end" }}>
      <Button
        className="btn btn-primary mr-2"
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <PencilSquare /> Cập nhật
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
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        footer={dialogFooter}
        className="bg-light dialogForm"
        style={{ width: "70vw" }}
        modal
        header={<div className="custom-dialog-header">Chỉnh sửa Dịch vụ</div>}
      >
        <div className="bg-light p-1" style={{ margin: "25px" }}>
          <div style={{ margin: "40px" }}>
            <form>
              <Row>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="name">
                      <h6>Tên</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Chỉnh sửa tên"
                      style={{ height: "50px" }}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="description">
                      <h6>Mô tả</h6>
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Chỉnh sửa mô tả"
                      rows="3"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="price">
                      <h6>Giá</h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      placeholder="Chỉnh sửa giá"
                      style={{ height: "50px" }}
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="duration">
                      <h6>Thời lượng</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="duration"
                      placeholder="Chỉnh sửa thời lượng"
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

export default EditService;
