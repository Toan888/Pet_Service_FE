import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import Form from "react-bootstrap/Form";
import { Toast } from "primereact/toast";
import New_Paper from "../components/New_Paper.jsx";

const Online_Booking = () => {
  const [services, setServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const [showSlots, setShowSlots] = useState(false);
  const [bookingData, setBookingData] = useState({
    service_type: "",
    customer_name: "",
    phone_number: "",
    email: "",
    address: "",
    appointment_date: "",
    timeslotId: "",
    pet_info: {
      pet_name: "",
      species: "",
      breed: "",
      age: "",
      weight: "",
      notes: "",
    },
    userId: "", // Add this field
  });
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:9999/service");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get("http://localhost:9999/slots");
        setSlots(response.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    fetchSlots();
  }, []);

  useEffect(() => {
    // Fetch userId from local storage or your auth context
    const userId = localStorage.getItem("userId");
    setBookingData((prevData) => ({
      ...prevData,
      userId: userId,
    }));
  }, []);

  const fetchSlotsByDate = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:9999/slots?date=${date}`
      );
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots by date:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "appointment_date") {
      fetchSlotsByDate(value);
      setShowSlots(true);
    }
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
      timeslotId: "",
    }));
  };

  const handlePetInfoChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      pet_info: {
        ...prevData.pet_info,
        [name]: value,
      },
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!bookingData.service_type)
      newErrors.service_type = "Yêu cầu dịch vụ là bắt buộc";
    if (!bookingData.customer_name)
      newErrors.customer_name = "Họ và tên là bắt buộc";
    if (!bookingData.phone_number)
      newErrors.phone_number = "Số điện thoại là bắt buộc";
    if (!bookingData.email) newErrors.email = "Email là bắt buộc";
    if (!bookingData.address) newErrors.address = "Địa chỉ là bắt buộc";
    if (!bookingData.appointment_date)
      newErrors.appointment_date = "Thời gian là bắt buộc";
    if (!bookingData.pet_info.pet_name)
      newErrors.pet_name = "Tên thú cưng là bắt buộc";
    if (!bookingData.pet_info.species) newErrors.species = "Loài là bắt buộc";
    if (!bookingData.pet_info.breed)
      newErrors.breed = "Thuộc giống là bắt buộc";
    if (!bookingData.pet_info.age) newErrors.age = "Tuổi là bắt buộc";
    if (!bookingData.pet_info.weight)
      newErrors.weight = "Trọng lượng là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:9999/booking",
          bookingData
        );
        console.log("Booking created:", response.data);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Booking request sent successfully",
          life: 3000,
        });
        setBookingData({
          service_type: "",
          customer_name: "",
          phone_number: "",
          email: "",
          address: "",
          appointment_date: "",
          timeslotId: "",
          pet_info: {
            pet_name: "",
            species: "",
            breed: "",
            age: "",
            weight: "",
            notes: "",
          },
          userId: localStorage.getItem("userId"), // Reset with userId
        });
        setErrors({});
        setSelectedSlot("");
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill in all required fields",
        life: 3000,
      });
    }
  };

  return (
    <div>
      <Row>
        <div
          className="mt-3 text-center"
          style={{ backgroundColor: "#f4f5f5", width: "100%", height: "200px" }}
        >
          <img src={logo} alt="logo" />
        </div>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Row>
            <Col md={8}>
              <Form>
                <Form.Group controlId="serviceType">
                  <Form.Label>Yêu Cầu Dịch Vụ</Form.Label>
                  <Form.Control
                    as="select"
                    name="service_type"
                    onChange={handleInputChange}
                    value={bookingData.service_type}
                    isInvalid={!!errors.service_type}
                  >
                    <option value="">Chọn dịch vụ</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.service_type}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="customerName">
                  <Form.Label>Họ và Tên</Form.Label>
                  <Form.Control
                    name="customer_name"
                    onChange={handleInputChange}
                    value={bookingData.customer_name}
                    isInvalid={!!errors.customer_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.customer_name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Số Điện Thoại</Form.Label>
                  <Form.Control
                    name="phone_number"
                    onChange={handleInputChange}
                    value={bookingData.phone_number}
                    isInvalid={!!errors.phone_number}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone_number}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={handleInputChange}
                    value={bookingData.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Địa Chỉ</Form.Label>
                  <Form.Control
                    name="address"
                    onChange={handleInputChange}
                    value={bookingData.address}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="appointmentDate">
                  <Form.Label>Thời Gian</Form.Label>
                  <Form.Control
                    type="date"
                    name="appointment_date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleInputChange}
                    value={bookingData.appointment_date}
                    isInvalid={!!errors.appointment_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.appointment_date}
                  </Form.Control.Feedback>
                </Form.Group>
                {showSlots && (
                  <Form.Group controlId="slot">
                    <Form.Label>Chọn Slot</Form.Label>
                    <br></br>
                    {slots.map((slot) => (
                      <Button
                        key={slot._id}
                        value={slot._id}
                        variant={
                          bookingData.timeslotId === slot._id
                            ? "success"
                            : "outline-primary"
                        }
                        disabled={slot.availableSlots === 0}
                        onClick={() => {
                          setSelectedSlot(slot._id);
                          setBookingData((prevData) => ({
                            ...prevData,
                            timeslotId: slot._id,
                          }));
                        }}
                        style={{ margin: "5px" }}
                      >
                        {slot.time} h - {slot.availableSlots} nhân viên còn
                        trống
                      </Button>
                    ))}
                  </Form.Group>
                )}
                <Form.Group controlId="petName">
                  <Form.Label>Tên Thú Cưng</Form.Label>
                  <Form.Control
                    name="pet_name"
                    onChange={handlePetInfoChange}
                    value={bookingData.pet_info.pet_name}
                    isInvalid={!!errors.pet_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pet_name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="species">
                  <Form.Label>Loài</Form.Label>
                  <Form.Control
                    as="select"
                    name="species"
                    onChange={handlePetInfoChange}
                    value={bookingData.pet_info.species}
                    isInvalid={!!errors.species}
                  >
                    <option value="0">Chọn Loài</option>
                    <option value="Chó">Chó</option>
                    <option value="Mèo">Mèo</option>
                    <option value="Khác">Khác</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.species}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="breed">
                  <Form.Label>Thuộc Giống</Form.Label>
                  <Form.Control
                    as="select"
                    name="breed"
                    onChange={handlePetInfoChange}
                    value={bookingData.pet_info.breed}
                    isInvalid={!!errors.breed}
                  >
                    <option value="0">Chọn Giống</option>
                    <option value="Đực">Đực</option>
                    <option value="Cái">Cái</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.breed}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="age">
                      <Form.Label>Tuổi (Năm)</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        onChange={handlePetInfoChange}
                        value={bookingData.pet_info.age}
                        isInvalid={!!errors.age}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.age}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="weight">
                      <Form.Label>Trọng Lượng (Kg)</Form.Label>
                      <Form.Control
                        type="number"
                        name="weight"
                        onChange={handlePetInfoChange}
                        value={bookingData.pet_info.weight}
                        isInvalid={!!errors.weight}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.weight}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="notes">
                  <Form.Label>Ghi Chú</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Nhập một vài tình trạng của bé để chuyên viên của chúng tôi có thể hỗ trợ bạn tốt nhất..."
                    name="notes"
                    onChange={handlePetInfoChange}
                    value={bookingData.pet_info.notes}
                  />
                </Form.Group>
                <Row>
                  <Col className="mt-3">
                    <Button onClick={handleSubmit}>Gửi yêu cầu</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col md={4}>
              <New_Paper></New_Paper>
            </Col>
          </Row>
        </Col>
      </Row>
      <Toast ref={toast} />
    </div>
  );
};

export default Online_Booking;