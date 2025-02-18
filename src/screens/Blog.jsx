import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import {
  HandThumbsUp,
  Chat,
  CameraReels,
  Images,
  EmojiLaughing,
  Send,
  Trash3Fill,
  Pen,
} from "react-bootstrap-icons";
import "../style/blog.css";
import Zoom from "react-medium-image-zoom";
import EditBlog from "./EditBlog";
import Comment from "./Comment";
import AddBlog from "./AddBlog";
import { toast } from "react-toastify";
import { Image } from "antd";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ fontSize: "30px" }}
  >
    {children || "..."}
  </a>
));

const CustomMenu = React.forwardRef(
  (
    { style, className, "aria-labelledby": labeledBy, onEdit, onDelete },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          position: "absolute",
          left: "50%",
          transform: "translate(-60%, 80%)",
          maxWidth: "60px",
        }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled d-flex justify-content-between">
          <button className="dropdown-item dropdown-item-edit" onClick={onEdit}>
            <Pen size={18}></Pen>
          </button>
          <button
            className="dropdown-item dropdown-item-delete"
            onClick={onDelete}
          >
            <Trash3Fill size={18}></Trash3Fill>
          </button>
        </ul>
      </div>
    );
  }
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [visible, setVisible] = useState(false);
  const fullname = localStorage.getItem("fullname");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    axios
      .get("http://localhost:9999/blogs")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const handleDeleteBlog = (id) => {
    if (window.confirm("Do you want to delete this blog")) {
      axios
        .delete(`http://localhost:9999/blogs/${id}`)
        .then(() => {
          toast.success("Delete successfully!");
          setBlogs(blogs.filter((blog) => blog._id !== id));
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const handleEditBlog = (blog) => {
    setDataEdit(blog);
    setEditVisible(true);
  };

  const handleUpdateBlog = (id, updatedData) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === id ? { ...blog, ...updatedData } : blog
      )
    );
  };

  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleComment = (blog) => {
    setShowCommentForm(true);
    setSelectedBlog(blog);
    setSelectedBlogId(blog._id);
    setBlogs([`Item ${blogs.length + 1}`, ...blogs]);
  };
  return (
    <Container style={{ marginTop: "20px" }}>
      {isLoggedIn && (
        <Row>
          <Col md={12}>
            <div className="cardd">
              <div className="card-header fc-card-header">
                <h4>Bài Viết</h4>
              </div>
              <Row style={{ marginTop: "20px" }}>
                <Col md={2} sm={2} xs={2} style={{ textAlign: "center" }}>
                  <img
                    src="https://www.localbotswana.com/img/bw/d/1641218846_95961.jpg"
                    className="rounded-circle"
                    style={{ width: "44px", marginTop: "10px" }}
                    alt="img_profile"
                  />
                </Col>
                <Col md={8} sm={8} xs={8}>
                  <input
                    style={{
                      borderRadius: "40px",
                      paddingRight: "20px",
                      height: "60px",
                    }}
                    className="form-control"
                    placeholder="Bạn đang nghĩ gì thế ???"
                    onClick={() => setVisible(true)}
                  ></input>
                </Col>
                <Col md={2} sm={2} xs={2} style={{ textAlign: "center" }}>
                  <button className="rounded-circle" style={{ border: "none" }}>
                    <Send style={{ fontSize: "25px", marginTop: "10px" }} />
                  </button>
                </Col>
              </Row>
              <hr />

              <Row style={{ marginLeft: "0px", cursor: "pointer" }}>
                <Col md={4} sm={4} xs={4} className="text-center">
                  <button className="fc-btn fc-btn-rounded">
                    <label>
                      <CameraReels
                        style={{
                          fontSize: "25px",
                          marginRight: "10px",
                          color: "red",
                        }}
                      />
                      Phát trực tiếp
                    </label>
                  </button>
                </Col>
                <Col md={4} sm={4} xs={4} className="text-center">
                  <button
                    className="fc-btn fc-btn-rounded"
                    style={{ cursor: "pointer" }}
                  >
                    <label>
                      <Images
                        style={{ fontSize: "25px", marginRight: "10px" }}
                      />
                      Ảnh/Video
                    </label>
                  </button>
                </Col>
                <Col md={4} sm={4} xs={4} className="text-center">
                  <button
                    className="fc-btn fc-btn-rounded"
                    style={{ cursor: "pointer" }}
                  >
                    <label>
                      <EmojiLaughing
                        style={{ fontSize: "25px", marginRight: "10px" }}
                      />
                      Cảm xúc
                    </label>
                  </button>
                </Col>
              </Row>
              <br />
            </div>
          </Col>
        </Row>
      )}

      <br />
      {blogs
        .slice()
        .reverse()
        .map((b) => (
          <Row key={b._id}>
            <Col md={12}>
              <div className="cardd">
                <div className="card-body">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                      color: "gray",
                    }}
                  >
                    <img
                      src="https://www.localbotswana.com/img/bw/d/1641218846_95961.jpg"
                      className="rounded-circle"
                      style={{ width: "40px", marginRight: "4px" }}
                    />
                    <b>{b.userId?.fullname}</b>
                    {fullname === b.userId?.fullname && (
                      <Dropdown style={{ marginLeft: "auto" }}>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu
                          as={CustomMenu}
                          onEdit={() => handleEditBlog(b)}
                          onDelete={() => handleDeleteBlog(b._id)}
                        />
                      </Dropdown>
                    )}
                  </div>
                  <small
                    style={{
                      display: "block",
                      marginTop: "-10px",
                      marginLeft: "55px",
                      color: "gray",
                    }}
                  >
                    {formatDate(b.createdAt)}
                  </small>
                  <p>{b.content}</p>
                  <Row>
                    <Image.PreviewGroup>
                      {b.images &&
                        b.images.map((imgSrc, index) => (
                          <Col
                            md={6}
                            sm={4}
                            xs={4}
                            key={index}
                            style={{ marginBottom: "20px", display: "flex" }}
                          >
                            <Zoom>
                              <Image
                                src={imgSrc}
                                style={{
                                  width: "520px",
                                  height: "350px",
                                  flexWrap: "wrap",
                                  objectFit: "cover",
                                }}
                              />
                            </Zoom>
                          </Col>
                        ))}
                    </Image.PreviewGroup>
                  </Row>
                  <br />
                  <hr />
                  <Row>
                    <Col md={12}>
                      <div style={{ textAlign: "left" }}>
                        <span style={{ marginLeft: "24px" }}>
                          1 like 13 Comment
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <Row style={{ marginLeft: "0px", display: "flex" }}>
                    <Col md={6} sm={6} xs={6}>
                      <button className="fc-btn fc-btn-white">
                        <div className="fc-icon">
                          <label style={{ cursor: "pointer" }}>
                            <HandThumbsUp
                              style={{ fontSize: "25px", marginRight: "10px" }}
                            />
                            Thích
                          </label>
                        </div>
                      </button>
                    </Col>
                    <Col md={6} sm={6} xs={6}>
                      <button
                        className="fc-btn fc-btn-white"
                        onClick={() => handleComment(b)}
                      >
                        <div className="fc-icon fc-icon-comentar">
                          <label style={{ cursor: "pointer" }}>
                            <Chat
                              style={{ fontSize: "25px", marginRight: "10px" }}
                            />
                            Bình luận
                          </label>
                        </div>
                      </button>
                    </Col>
                  </Row>
                  <br />
                </div>
              </div>
            </Col>
            {showCommentForm && selectedBlog && selectedBlog._id === b._id && (
              <Comment
                blogId={selectedBlog._id}
                onClose={() => setShowCommentForm(false)}
                selectedBlogId={selectedBlogId}
              />
            )}
          </Row>
        ))}
      {editVisible && (
        <EditBlog
          editVisible={editVisible}
          setEditVisible={setEditVisible}
          data={dataEdit}
          onUpdate={handleUpdateBlog}
        />
      )}
      {visible === true && (
        <AddBlog visible={visible} setVisible={setVisible} />
      )}
    </Container>
  );
};

export default Blog;
