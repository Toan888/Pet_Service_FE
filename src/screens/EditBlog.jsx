
import axios from "axios";
import { Dialog } from "primereact/dialog";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Images, PlusSquareDotted, PlusSquareFill, Trash, X, XLg } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import ".././style/addBlog.css"

const EditBlog = (props) => {
    const { editVisible, setEditVisible, data, onUpdate } = props;
    const [content, setContent] = useState(data?.content || '');
    const [images, setImages] = useState(data?.images || []);
    const [isLoading, setIsLoading] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (data) {
            setImagesPreview(data.images);
            setContent(data.content || '');
            setImages(data.images || []);
        }
    }, [data]);
    console.log(data);
    const handleEditBlog = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:9999/blogs/${data._id}`, {
                content: content,
                images: images
            })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Chỉnh sửa blog thành công");
                    onUpdate(data._id, { content, images });
                    setEditVisible(false);
                } else {
                    toast.error("Chỉnh sửa blog thất bại");
                }
            })
            .catch((error) => {
                toast.error("Chỉnh sửa blog thất bại: " + error.message);
            });
    };

    const onHide = () => {
        setEditVisible(false);
    };

    const dialogFooter = (
        <div style={{ margin: "20px", textAlign: 'end' }}>
            <Button
                className="btn btn-success mr-2"
                type="submit"
                form="editProductForm"
                onClick={handleEditBlog}
            >
                <PlusSquareFill /> Save
            </Button>
            <Button onClick={onHide} className="btn btn-danger" style={{ marginRight: " 40px" }}>
                <X style={{ fontSize: "22px" }} />
                Close
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
            formData.append("upload_preset", "img_blog");

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
        setImages([...data.images, ...newImages]); // Thêm ảnh mới vào images từ editProducts
        setImagesPreview([...imagesPreview, ...newImages])
    };

    const handleDeleteImage = (imageToDelete) => {  
        setImages((prev) => prev.filter((item) => item !== imageToDelete));
        setImagesPreview((prev) => prev.filter((item) => item !== imageToDelete));
    };

    const calculateColumnWidth = () => {
        switch (imagesPreview.length) {
            case 1:
                return 12;
            case 2:
                return 6;
            case 3:
                return 4;
            case 4:
                return 3;
            default:
                return 3;
        }
    };
    const calculateImageHeight = () => {
        switch (imagesPreview.length) {
          case 1:
            return '100%';
          case 2:
            return '400px';
          case 3:
            return '300px';
          case 4:
            return '200px';
          default:
            return '300px';
        }
      };
      const calculatewidthImage = () => {
        switch (imagesPreview.length) {
          case 1:
            return "500px"; // 50% của 12 cột
          case 2:
            return "100%";
          case 3:
            return "100%";
          case 4:
            return "100%";
          default:
            return "100%";
        }
      };

      
    return (
        <Container>
            <Dialog
                visible={editVisible}
                onHide={onHide}
                footer={dialogFooter}
                className="bg-light"
                style={{ width: "70vw" }}
                modal
                header={<div className="custom-dialog-header">Chỉnh Sửa Bài Viết</div>}
            >
                <Row>
                    <Col md={12} className="p-4">
                        <Form>
                            <Form.Group controlId="content" style={{ marginBottom: "20px", marginLeft: " 20px", marginRight: "" }}>
                                <Form.Label style={{ fontWeight: "bold",fontSize:"20px" }}>Nội dung</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Nhập nội dung... "
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    style={{ width: "97.5%" }}
                                />
                            </Form.Group>
                            <Col md={12} >
                                <Row className="image-container">
                                    {imagesPreview.map((item, index) => (
                                        <Col md={calculateColumnWidth()}
                                            key={index}
                                            className="image-item"
                                        >
                                            <div className="relative">
                                                <img src={item} alt="preview" style={{ width:calculatewidthImage(), height: calculateImageHeight() }} />
                                                <span title="Xóa" onClick={() => handleDeleteImage(item)}>
                                                    <XLg size={20} />
                                                </span>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                            <div className="form-group w-full">
                                <label htmlFor="file">
                                    {isLoading
                                        ? <Loading />
                                        : <div className='flex flex-col items-center justify-center m-5'
                                        >
                                            <Images size={30} />
                                            <span style={{ color: "black", fontSize: "20px" }}>   Thêm ảnh/video</span>
                                        </div>}
                                </label>
                                <input onChange={handleFiles} hidden type="file" id='file' multiple />
                            </div>

                        </Form>

                    </Col>
                </Row>
            </Dialog>
        </Container>
    );
};

export default EditBlog;

