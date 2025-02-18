import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import AllOrder from "./AllOrder";
import Processing from "./Processing";
import Complete from "./Complete";
import Pending from "./Pending";
import Cancel from "./Cancel";
const OrderManagement = () => {
    return (
        <Container fluid>
        <Tabs defaultActiveKey="allorder" id="uncontrolled-tab-example">
          <Tab eventKey="allorder" title="Tất Cả">
            <AllOrder />
          </Tab>
          <Tab eventKey="Pending" title="Chờ Xác Nhận">
          <Pending status="Pending" />
          </Tab>
          <Tab eventKey="Processing" title="Đang Xử Lý">
          <Processing status="Processing" />
          </Tab>
          <Tab eventKey="Complete" title="Đã Giao">
          <Complete status="Completed" />
          </Tab>
          <Tab eventKey="Cancel" title="Đã Huỷ">
          <Cancel status="Cancel" />
          </Tab>
          
        </Tabs>
      </Container>
    );
};

export default OrderManagement;