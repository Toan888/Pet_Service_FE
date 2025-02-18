import React from "react";
import { Coin } from "react-bootstrap-icons";
const Products_Card = ({ img, obj, name, price }) => {

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("en-US", {
        currency: "VND",
      });
    }
  }

  return (
    <div
      className="cards flex-column"
      style={{ width: "18rem", height: "28rem", marginRight: "10px" }}
    >
      <div>
        <img
          src={img}
          style={{
            width: "250px",
            height: "270px",
            alignItems: "center",
          }}
        ></img>
      </div>
      <div>
        <i className="text-secondary">{obj}</i>
      </div>
      <div>
        <p className="text-center mt-1 font-weight-bolder">{name}</p>
      </div>
      <div>
        <h4 className="text-primary">
          <Coin style={{color:'yellow', fontSize:'27px' , marginRight:'5px'}}/>{formatCurrency(price)+" ₫"}
        </h4>
      </div>
    </div>
  );
};

export default Products_Card;
