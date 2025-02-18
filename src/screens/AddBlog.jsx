import React, { useState } from "react";
import {
  EmojiWinkFill,
  FileEarmarkImage,
  GeoAltFill,
  Images,
  PlusSquareDotted,
  SendArrowUpFill,
  TagFill,
  ThreeDots,
  Trash,
  XCircle,
  XLg,
} from "react-bootstrap-icons";
import { Button, Tooltip, OverlayTrigger, Col, Row } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import "../style/addBlog.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const AddBlog = (props) => {
  const { visible, setVisible } = props;
  const [content, setContent] = useState('');
  const [images, setImages] = useState(['']);
  const fullname = localStorage.getItem("fullname");
  const nav = useNavigate();
  const userId = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);



  const handleAddBlog = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9999/blogs", {
        content: content,
        userId: userId,
        images: images,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Add Blog Success");
          nav("/blog");
          setVisible(false);
        } else {
          toast.error("Add blog faild");
        }
      });
  };

  const onHide = () => {
    setVisible(false);
  };

  const addImageInput = () => {
    setImages([...images, '']);
  };



  const dialogFooter = (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px",
        marginRight: "20px",
      }}
    >
      <Button className="btn btn-success mr-2" form="addBlog" type="submit">
        <SendArrowUpFill /> Đăng bài
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
    setImagesPreview((prev) => [...prev, ...newImages]);
    setImages(newImages);
  };

  const handleDeleteImage = (image) => {
    setImages((prev) => prev.filter((item) => item !== image));
    setImagesPreview((prev) => prev.filter((item) => item !== image));
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
    <div className="create-post">
      <Dialog
        visible={visible}
        onHide={onHide}
        footer={dialogFooter}
        className="bg-light"
        style={{ width: "70vw" }}
        modal
        header={<div className="custom-dialog-header">Thêm bài viết</div>}
      >
        <div className="header">
          <img
            src="https://www.localbotswana.com/img/bw/d/1641218846_95961.jpg"
            alt="User Avatar"
            className="avatar"
          />
          <div className="user-info">
            <span className="user-name">{fullname}</span>
          </div>
        </div>

        <form id="addBlog" onSubmit={handleAddBlog}>
          <div className="textarea-container">
            <textarea
              placeholder="Bạn đang nghĩ gì thế?"
              className="post-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

          </div>
          <Col md={12} >
            <Row className="image-container">
              {imagesPreview.map((item, index) => (
                <Col md={calculateColumnWidth()}
                  key={index}
                  className="image-item"
                >
                  <div className="relative">
                    <img src={item} alt="preview" style={{ width: calculatewidthImage(), height: calculateImageHeight() }} />
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
          
        </form>
      </Dialog>
    </div>
  );
};

export default AddBlog;
