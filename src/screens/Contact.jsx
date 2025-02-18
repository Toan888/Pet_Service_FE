import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../style/contact.css'
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    content: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    if (!formData.name || !formData.phone || !formData.email || !formData.content) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      await postGoogle(formData);
      setFormData({ name: '', phone: '', email: '', content: '' });
    } catch (error) {
      alert('Gửi thành công.');
    }
  };


  const postGoogle = async (data) => {
    const formURL = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSco2fO10FAqLtQ43kBn2dD_aaPj7ihbn3qn2usGm0T-ZYPR3g/formResponse";
    const formDataToSend = new FormData();
    formDataToSend.append("entry.2143736806", data.name);
    formDataToSend.append("entry.302580376", data.phone);
    formDataToSend.append("entry.731850584", data.email);
    formDataToSend.append("entry.2097721425", data.content);

    const timestamp = new Date().toISOString();
    formDataToSend.append("entry.timestampFieldID", timestamp);

    const response = await fetch(formURL, {
      method: "POST",
      body: formDataToSend,
    });

    console.log("response.ok:", response.ok);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

  };


  return (
    <div>
      <div className="container123">
        <div className="contact-box">
          <div className="left"></div>
          <div className="right">
            <h2 className='theh2'>Thông tin liên hệ</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Control
                  type="text"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                  className="field"
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Control
                  type="tel"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  className="field"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="field"
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Nội dung tư vấn"
                  value={formData.content}
                  onChange={handleChange}
                  className="field"
                />
              </Form.Group>
              <Button type="submit" className="btn">GỬI</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactForm;