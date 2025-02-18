import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PlusSquareFill, X, Trash } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTimeSlot = (props) => {
  const { visible, setVisible } = props;
  const [time, setTime] = useState(0);
  const [availableSlots, setAvailableSlots] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onHide = () => {
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:9999/slots", {
        time,
        availableSlots,
      });

      if (response.status === 201) {
        toast.success("Time slot added successfully!");
        setVisible(false);
        navigate("/dashboard");
      } else {
        console.error("Error adding time slot:", response.data);
        toast.error("Error adding time slot. Please try again.");
      }
    } catch (error) {
      console.error("Error adding time slot:", error);
      toast.error("Error adding time slot. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const dialogFooter = (
    <div style={{ margin: "20px", textAlign: "end" }}>
      <Button
        className="btn btn-success mr-2"
        type="button"
        form="addSlotForm"
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
        header={<div className="custom-dialog-header">Thêm ca dịch vụ</div>}
      >
        <div className="bg-light p-1" style={{ margin: "25px" }}>
          <div style={{ margin: "40px" }}>
            <form id="addSlotForm">
              <Row>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="time">
                      <h6>Thời gian (hours) </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="time"
                      placeholder="Thêm thời gian"
                      style={{ height: "50px" }}
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="availableSlots">
                      <h6>Số lượng chỗ </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="availableSlots"
                      placeholder="Thêm số lượng slots"
                      style={{ height: "50px" }}
                      required
                      value={availableSlots}
                      onChange={(e) => setAvailableSlots(e.target.value)}
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
