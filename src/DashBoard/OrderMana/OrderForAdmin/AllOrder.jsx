import React, { useEffect, useState } from "react";
import { Col, Container, FormSelect, Row, Table } from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";
import axios from "axios";
import { toast } from "react-toastify";
import OrderDetailAdmin from "./OrderDetailAdmin";

const AllOrder = () => {
  const [listOrder, setListOrder] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9999/payment")
      .then((response) => {
        setListOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleStatusChange = (e, orderId) => {
    e.preventDefault();
    const newStatus = e.target.value; // Lấy giá trị mới của status từ dropdown
    axios
      .put("http://localhost:9999/payment/" + orderId, {
        status: newStatus,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Status updated successfully!");
          // Cập nhật trạng thái của đơn hàng trong state
          setListOrder((prevOrders) => {
            return prevOrders.map((order) => {
              if (order._id === orderId) {
                return { ...order, status: newStatus };
              }
              return order;
            });
          });
        } else {
          console.log("Edit Status failed");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleOrderDetail = (orderId) => {
    const order = listOrder.find((o) => o._id === orderId);
    setSelectedOrder(order);
    setVisible(true);
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
      <Row className="ml-1 mb-4 mt-4">
        
      </Row>
      <Row style={{ width: "100%" }}>
        <Col md={12}>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th>Ngày Đặt Hàng</th>
                <th>Khách Hàng</th>
                <th>Số Điện Thoại</th>
                <th>Địa Chỉ</th>
                <th>Trạng Thái</th>
                <th>Tổng</th>
                <th>Phương Thức Thanh Toán</th>
                <th>Hành Động</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {listOrder.map((o, index) => (
                <tr key={o._id}>
                  <td>{index + 1}</td>
                  <td>{formatDate(o.createdAt)}</td>
                  <td>{o.userId.fullname}</td>
                  <td>{o.userId.phone}</td>
                  <td>{o.userId.address}</td>
                  <td>
                    <FormSelect
                      style={{
                        borderRadius: "30px",
                        width: "110px",
                        border: "none",
                        paddingLeft: "8px",
                      }}
                      value={o.status}
                      onChange={(e) => {
                        if (
                          o.status === "Processing" &&
                          e.target.value === "Pending"
                        ){
                          return;
                        }
                        handleStatusChange(e, o._id);
                      }}
                      disabled={
                        o.status === "Completed" || o.status === "Cancel"
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      {o.status === "Cancel" && (
                        <option value="Cancel">Cancel</option>
                      )}
                    </FormSelect>
                  </td>
                  <td>{formatCurrency(o.totalAmount) + " ₫"}</td>
                  <td>{o.paymentMethod}</td>
                  <td>
                    <i className="edit">
                      <Eye
                        style={{
                          color: "blue",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleOrderDetail(o._id)}
                      />
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {visible && (
        <OrderDetailAdmin
          visible={visible}
          setVisible={setVisible}
          order={selectedOrder}
        />
      )}
    </Container>
  );
};

export default AllOrder;
