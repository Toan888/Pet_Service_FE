import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { PenFill, PlusSquareFill, Trash } from "react-bootstrap-icons";

const UserManagement = () => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((resp) => resp.json())
      .then((data) => {
        setListUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  return (
    <Container fluid>
      <Row style={{ width: "100%" }}>
        <Col md={12}>
          <div>
            <Row className="ml-1 mb-4">
              <h3>Quản Lí Khách Hàng</h3>
            </Row>
          </div>

          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th>Họ và Tên</th>
                <th>Giới tính</th>
                <th>Địa chỉ </th>
                <th>Ngày sinh</th>
                <th>Số điện thoại</th>
                <th>Gmail</th>
                <th>Tên tài khoản</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {listUser.map((u, index) => (
                <tr key={index}>
                  <td>{index +1}</td>
                  <td>{u.fullname}</td>
                  <td>{u.gender}</td>
                  <td>{u.address}</td>
                  <td>{formatDate(u.birthday)}</td>
                  <td>{u.phone}</td>
                  <td>{u.gmail}</td>
                  <td>{u.username}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagement;
