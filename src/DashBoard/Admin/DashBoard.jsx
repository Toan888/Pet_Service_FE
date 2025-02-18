import React from "react";
import { Breadcrumb, Col, Nav, Row, Tab } from "react-bootstrap";
import UserManagement from "../UserMana/UserManagement";
import OrderManagement from "../OrderMana/OrderForAdmin/OrderManagement";
import ManaAllCateProduct from "../ProductMana/Product/ManaAllCateProduct";
import ManaAllDashBoard from "./ManaAllDashBoard";
import AppointmentList from "../AppointmentMana/AppointmentList";
import ServiceManagement from "../ManaService/Manaservice";
const DashBoard = () => {
  const role = parseInt(localStorage.getItem("role"), 10);
  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={role === 3 ? "four" : "first"}
    >
      <Row className="mt-2 ml-2">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item active>Quản lí</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      {role === 1 && (
        <Row style={{ marginTop: "50px" }}>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" style={{ color: "black" }}>
                  Quản lí sản phẩm
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" style={{ color: "black" }}>
                  Quản lí người dùng
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="three" style={{ color: "black" }}>
                  Quản lí đơn hàng
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="four" style={{ color: "black" }}>
                  Quản lí lịch đặt chăm sóc
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="six" style={{ color: "black" }}>
                  Quản lí dịch vụ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="five" style={{ color: "black" }}>
                  Thống kê
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ManaAllCateProduct />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <UserManagement />
              </Tab.Pane>
              <Tab.Pane eventKey="three">
                <OrderManagement />
              </Tab.Pane>
              <Tab.Pane eventKey="four">
                <AppointmentList />
              </Tab.Pane>
              <Tab.Pane eventKey="five">
                <ManaAllDashBoard />
              </Tab.Pane>
              <Tab.Pane eventKey="six">
                <ServiceManagement />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      )}

      {role === 2 && (
        <Row style={{ marginTop: "90px" }}>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" style={{ color: "black" }}>
                  Quản lí sản phẩm
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="three" style={{ color: "black" }}>
                  Quản lí đơn hàng
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="five" style={{ color: "black" }}>
                  Thống kê
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ManaAllCateProduct />
              </Tab.Pane>

              <Tab.Pane eventKey="three">
                <OrderManagement />
              </Tab.Pane>
              <Tab.Pane eventKey="five">
                <ManaAllDashBoard />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      )}

      {role === 3 && (
        <Row style={{ marginTop: "90px" }}>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="four" style={{ color: "black" }}>
                  Quản lí lịch đặt chăm sóc
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="five" style={{ color: "black" }}>
                  Thống kê
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="four">
                <AppointmentList />
              </Tab.Pane>
              <Tab.Pane eventKey="five">
                <ManaAllDashBoard />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      )}
    </Tab.Container>
  );
};

export default DashBoard;
