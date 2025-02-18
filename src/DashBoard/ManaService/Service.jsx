import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { PenFill, PlusSquareFill, Trash } from "react-bootstrap-icons";
import AddTimeSlot from "./AddService";

import axios from "axios";
import EditService from "./EditService";

const Service = () => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/service")
      .then((res) => {
        setSlots(res.data);
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error);
      });
  }, []);

  const handleDeleteSlot = (id) => {
    if (window.confirm("Bạn có muốn xóa time slot này không?")) {
      axios
        .delete(`http://localhost:9999/service/${id}`)
        .then(() => {
          setSlots(slots.filter((slot) => slot._id !== id));
          console.log("Deleted time slot successfully");
        })
        .catch((error) => {
          console.error("Failed to delete time slot:", error);
        });
    }
  };

  const handleEditSlot = (slot) => {
    setDataEdit(slot);
    setEditVisible(true);
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
            <Row className="ml-1 mb-4 mt-4">
              
              <Col md={12} className="d-flex justify-content-end">
                <Button onClick={() => setVisible(true)}>
                  <PlusSquareFill className="mr-2" />
                  Thêm dịch vụ
                </Button>
              </Col>
            </Row>
          </div>

          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th>Loại dịch vụ</th>
                <th>Mô tả dịch vụ</th>
                <th>Giá</th>
                <th>Thời gian</th>
                <th colSpan={2}>Hành động</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {slots.map((slot, index) => (
                <tr key={index}>
                  <td>{index +1} </td>
                  <td>{slot.name}</td>
                  <td>{slot.description}</td>
                  <td>{formatCurrency(slot.price) + " ₫"}</td>
                  <td>{slot.duration}</td>

                  <td>
                    <i
                      className="delete"
                      onClick={() => handleDeleteSlot(slot._id)}
                    >
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
                        onClick={() => handleEditSlot(slot)}
                      />
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {visible && <AddTimeSlot visible={visible} setVisible={setVisible} />}
      {editVisible && (
        <EditService
          editVisible={editVisible}
          setEditVisible={setEditVisible}
          data={dataEdit}
          slotId={dataEdit._id}
        />
      )}
    </Container>
  );
};

export default Service;
