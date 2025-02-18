import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import "../../../style/Breadcrumb.css"
const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [visible, setVisible] = useState(false);

  const user = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:9999/payment/user/${user}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleOrderDetail = (orderId) => {
    const order = orders.find((o) => o._id === orderId);
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
    <Container>
      <Row className="ml-1 mb-4 mt-4">
        <Col md={6}></Col>
      </Row>
      <Row>
        <Col className="text-center">
          <div className="table-responsive">
            {orders.length === 0 ? (
              <h5 style={{ marginTop: "30px" }}>
                Bạn chưa đặt đơn hàng nào !!!{" "}
              </h5>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>STT</th>
                    <th style={{ width: "15%" }}>Ngày Đặt Hàng</th>
                    <th style={{ width: "25%" }}>Trạng Thái</th>
                    <th style={{ width: "20%" }}>Tổng</th>
                    <th style={{ width: "20%" }}>Phương thức thanh toán</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order,index) => (
                    <tr key={order._id}>
                      <td style={{ verticalAlign: "middle" }}>{index+1}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        {formatDate(order.createdAt)}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {order.status}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {formatCurrency(order.totalAmount) + " ₫"}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        {order.paymentMethod === "VnPay"
                          ? "VnPay-Đã thanh toán"
                          : order.paymentMethod}
                      </td>
                      <td>
                        <Eye
                          style={{
                            color: "blue",
                            fontSize: "25px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOrderDetail(order._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
      {visible && (
        <OrderDetail
          visible={visible}
          setVisible={setVisible}
          order={selectedOrder}
        />
      )}
    </Container>
  );
};

export default OrderStatus;
