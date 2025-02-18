import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  PlusSquareDotted,
  PlusSquareFill,
  Trash,
  X,
} from "react-bootstrap-icons";
import { Col, FormSelect, Row } from "react-bootstrap";
import "../../../style/addproduct.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import Loading from "../../../components/Loading";

const EditProduct = (props) => {
  const { editVisible, setEditVisible, data, productId } = props;

  const [editProducts, setEditProducts] = useState({});
  const [image, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPettype, setSelectedPettype] = useState(null);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);

  const nav = useNavigate();

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
  // console.log(image);
  useEffect(() => {
    axios
      .get("http://localhost:9999/products/" + productId)
      .then((res) => {
        setEditProducts({
          ...res.data,
          category: res.data.category?._id,
        });
        setImagesPreview(res.data.image);
        setImages(res.data.image);
        setSelectedCategory(res.data.category);
        setSelectedPettype(res.data.pettype);
        if (res.data.image && res.data.image.length > 0) {
          setImages(res.data.image);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [productId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:9999/products/" + productId, {
        name: editProducts.name,
        image: image,
        quantity: editProducts.quantity,
        description: editProducts.description,
        pettype: selectedPettype,
        category: selectedCategory,
        price: editProducts.price,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Product updated successfully!");
          setEditVisible(false);
          console.log(editProducts);
        } else {
          console.log("Edit profile failed");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    nav("/dashboard");
  };
  const onHide = () => {
    setEditVisible(false);
  };

  const dialogFooter = (
    <div style={{ margin: "20px", textAlign: "end" }}>
      <Button
        className=" btn btn-success mr-2"
        type="button"
        form="editProductForm"
        onClick={handleUpdate}
      >
        <PlusSquareFill /> Lưu
      </Button>
      <Button onClick={onHide} className=" btn btn-danger">
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
    setImages([...editProducts.image, ...newImages]); // Thêm ảnh mới vào images từ editProducts
    setImagesPreview([...imagesPreview, ...newImages]); // Cập nhật imagesPreview thay đổi
  };

  const handleDeleteImage = (image) => {
    setImages((prev) => prev.filter((item) => item !== image));
    setImagesPreview((prev) => prev.filter((item) => item !== image));
  };

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        footer={dialogFooter}
        className="bg-light dialogForm"
        style={{ width: "70vw" }}
        modal
        header={<div className="custom-dialog-header">Sửa sản phẩm </div>}
      >
        <div className="bg-light p-1" style={{ margin: "25px" }}>
          <div style={{ margin: "40px" }}>
            <form id="addProductForm">
              <Row>
                <Col md={6}>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="name">
                      <h6>Tên</h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Input product name"
                      style={{ height: "50px" }}
                      required
                      value={editProducts.name}
                      onChange={(e) =>
                        setEditProducts({
                          ...editProducts,
                          name: e.target.value,
                        })
                      }
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
                      placeholder="Input description"
                      required
                      rows={5}
                      value={editProducts.description}
                      onChange={(e) =>
                        setEditProducts({
                          ...editProducts,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group w-full">
                    <label className="label" htmlFor="description">
                      <h5>Ảnh</h5>
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
                        <label className="label" htmlFor="quantity">
                          <h6>Số lượng</h6>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Input quantity"
                          style={{ height: "50px" }}
                          required
                          value={editProducts.quantity}
                          onChange={(e) =>
                            setEditProducts({
                              ...editProducts,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group w-full">
                        <label className="label" htmlFor="price">
                          <h6>Giá</h6>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Input quantity"
                          style={{ height: "50px" }}
                          required
                          value={editProducts.price}
                          onChange={(e) =>
                            setEditProducts({
                              ...editProducts,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <div className="">
                        <label className="label">
                          <h6>Lọai sản phẩm </h6>
                        </label>
                        <br></br>
                        <select
                          className="form-control"
                          value={editProducts.category}
                          name="category"
                          onChange={(e) => {
                            const updatedCategory = e.target.value;
                            setEditProducts({
                              ...editProducts,
                              category: updatedCategory,
                            });
                            setSelectedCategory(updatedCategory);
                          }}
                          required
                          style={{ height: "50px" }}
                        >
                          <option value="0">Select Category</option>
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
                          value={editProducts.pettype}
                          name="pettype"
                          onChange={(e) => {
                            const updatedPettype = e.target.value;
                            setEditProducts({
                              ...editProducts,
                              pettype: updatedPettype,
                            });
                            setSelectedPettype(updatedPettype);
                          }}
                          required
                          style={{ height: "50px" }}
                        >
                          <option value="0">Select Pet Type</option>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <Col md={12} style={{ paddingTop: "125px" }}>
                    <Row className="image-container">
                      {imagesPreview.map((item, index) => (
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

export default EditProduct;
