import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  Image,
  PlusCircleDotted,
  PlusSquareDotted,
  PlusSquareFill,
  Trash,
  TrashFill,
  X,
} from "react-bootstrap-icons";
import { Col, Form, FormSelect, Row } from "react-bootstrap";
import "../../../style/addproduct.css";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import ComUpImg from "../../../ComeUpImage/ComUpImg";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const AddProducts = (props) => {
  const { visible, setVisible } = props;
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPettype, setSelectedPettype] = useState(null);
  const [image, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.error("Error fetching toys:", error);
      });
  }, []);
  const onHide = () => {
    setVisible(false);
  };

  console.log(image);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("pettype", selectedPettype);
      formData.append("category", selectedCategory);
      formData.append("price", price);

      // Thêm URL ảnh vào formData
      image.forEach((imgUrl) => {
        formData.append("image", imgUrl);
      });

      const response = await axios.post(
        "http://localhost:9999/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Product added successfully!");
        console.log(response.data);
        setVisible(false);
        navigate("/dashboard");
      } else {
        console.error("Error adding product:", response.data);
        toast.error("Error adding product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.");
    }
  };

  const dialogFooter = (
    <div style={{ margin: "20px", textAlign: "end" }}>
      <Button
        className="btn btn-success mr-2"
        type="button"
        form="addProductForm"
        onClick={handleSubmit}
      >
        <PlusSquareFill /> Thêm
      </Button>
      <Button onClick={onHide} className="btn btn-danger">
        <X style={{ fontSize: "22px" }} />
        Đóng
      </Button>
    </div>
  );

  const handleFiles = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newImages = [];
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "img_shop");

      const response = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/dakpa1ph2/image/upload/`,
        data: formData,
      });

      if (response.status === 200) {
        newImages.push(response.data.url);
      } else {
        console.log("Failed to upload image");
      }
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...newImages]);
    setImages(newImages);
  };

  const handleDeleteImage = (image) => {
    setImages((prev) => prev.filter((item) => item !== image));
    setImagesPreview((prev) => prev.filter((item) => item !== image));
  };

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        footer={dialogFooter}
        className="bg-light dialogForm"
        style={{ width: "70vw" }}
        modal
        header={<div className="custom-dialog-header">Thêm Sản Phẩm</div>}
      >
        <div className="bg-light p-1" style={{ margin: "25px" }}>
          <div style={{ margin: "40px" }}>
            <form id="addProductForm">
              <Row>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="name">
                      <h6>Tên sản phẩm </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Thêm tên sản phẩm "
                      style={{ height: "50px" }}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="description">
                      <h6>Mô tả sản phẩm </h6>
                    </label>
                    <TextArea
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Thêm mô tả sản phẩm "
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group w-full p-4">
                    <label className="label" htmlFor="description">
                      <h5>Ảnh </h5>
                    </label>
                    <label style={{ paddingLeft: "100px" }} htmlFor="file">
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <PlusSquareDotted
                            style={{ cursor: "pointer" }}
                            color=""
                            size={80}
                          />
                        </div>
                      )}
                    </label>
                    <input
                      onChange={handleFiles}
                      hidden
                      type="file"
                      id="file"
                      multiple
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <div className="form-group w-full">
                        <label className="label" htmlFor="congNgheManHinh">
                          <h6>Số lượng </h6>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Input quantity"
                          style={{ height: "50px" }}
                          required
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group w-full">
                        <label className="label" htmlFor="congNgheManHinh">
                          <h6>Giá sản phẩm </h6>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Input quantity"
                          style={{ height: "50px" }}
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <div className="">
                        <label className="label">
                          <h6>Loại sản phẩm </h6>
                        </label>
                        <br></br>
                        <select
                          className="form-control"
                          name="category"
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          required
                          style={{ height: "50px" }}
                        >
                          <option value="0">Sản phẩm của</option>
                          {category.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="">
                        <label className="label">
                          <h6>Dành cho </h6>
                        </label>
                        <br></br>
                        <select
                          className="form-control "
                          name="pettype"
                          onChange={(e) => setSelectedPettype(e.target.value)}
                          required
                          style={{ height: "50px" }}
                        >
                          <option value="0">Chọn đối tượng</option>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <Col md={12} style={{ paddingTop: "125px" }}>
                    <Row className="image-container">
                      {imagesPreview?.map((item, index) => (
                        <Col md={3} key={index} className="image-item">
                          <div className="relative">
                            <img src={item} alt="preview" />
                            <span
                              title="Xóa"
                              onClick={() => handleDeleteImage(item)}
                            >
                              <Trash />
                            </span>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddProducts;
