import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = ({ editVisible, setEditVisible, data, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    birthday: '',
    phone: '',
    address: '',
    gmail: data.gmail // Khởi tạo trạng thái ban đầu với dữ liệu từ props
  });

  // Cập nhật dữ liệu mỗi khi props thay đổi
  useEffect(() => {
    setFormData({
      fullname: data.fullname,
      gender: data.gender,
      birthday: data.birthday,
      phone: data.phone,
      address: data.address,
      gmail: data.gmail
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Chỉ cập nhật giá trị nếu có sự thay đổi từ người dùng
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:9999/users/${data.username}`, formData)
      .then((res) => {
        onUpdate(data.username, formData);
        setEditVisible(false);
        toast.success("Cập nhật người dùng thành công"); // Hiển thị Toast thành công khi cập nhật thành công
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <Modal show={editVisible} onHide={() => setEditVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Họ Và Tên</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giới Tính</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Chọn Giới Tính</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày Sinh</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Địa Chỉ</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
      {/* Toast thành công */}
     
    </Modal>
  );
};

export default EditProfile;
