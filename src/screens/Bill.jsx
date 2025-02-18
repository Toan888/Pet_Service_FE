import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Bill = () => {
  const location = useLocation();
  const [status, setStatus] = useState("Processing");
  const { id } = useParams();
  useEffect(() => {
    if (location?.search) {
      axios
        .post(
          `http://localhost:9999/payment/vnpay-return/${id}${location?.search}`,
          {}
        )
        .then((response) => {
          setStatus(response.data.message); 
        })
        .catch((error) => {
          console.error("Error verifying transaction", error);
          setStatus("Failed");
        });
    }

    // Verify the transaction status with your server
  }, [location.search]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">VNPAY Payment Status</h1>
      <div
        className={`status ${
          status === "Success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </div>
    </div>
  );
};

export default Bill;
