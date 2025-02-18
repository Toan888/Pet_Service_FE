import React, { useEffect, useState } from 'react';
import {  Upload, message } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
const ComUpImg = ({ onChange, numberImg, existingImages }) => {
  const [fileList, setFileList] = useState([]);
  const maxImages = numberImg || 10;


  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      setFileList(
        existingImages.map((img, index) => ({
          uid: `${index}`,
          status: 'done',
          url: (img.thumbUrl || img.url) ||(img.url||img.thumbUrl)
        }))
      );
    }
  }, [existingImages]);

  const handleDelete = (file) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
    onChange(updatedFileList);
  }

  console.log(existingImages);
  const isImageFile = (file) => {
    const acceptedFormats = ['.jpg', '.jpeg', '.png', '.gif'];
    if (file.name) {
      const fileExtension = file.name.toLowerCase().slice(-4); // Lấy phần mở rộng của tệp
      if (!acceptedFormats.includes(fileExtension)) {
        message.error('Chỉ cho phép chọn các tệp hình ảnh.');
        return false; // Ngăn tải lên nếu không phải là hình ảnh
      }
    }
    return true;
  };


  const handleFileChange = ({ fileList }) => {
    const filteredFileList = fileList.filter((file) => isImageFile(file));
    if (filteredFileList.length > maxImages) {
      message.error(`Chỉ được chọn tối đa ${maxImages} ảnh.`);
      const firstFiveImages = filteredFileList.slice(0, maxImages);
      setFileList(firstFiveImages);
      onChange(firstFiveImages);
    } else {
      setFileList(filteredFileList);
      onChange(filteredFileList);
    }
  };
  return (
    <>
      <Upload
        fileList={fileList}
        listType="picture-card"
        onChange={handleFileChange}
        beforeUpload={() => false} // Để tránh tải lên tự động
        accept=".jpg,.jpeg,.png,.gif" // Chỉ cho phép chọn các tệp hình ảnh
        multiple={true} // Cho phép chọn nhiều tệp
      >
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      </Upload>
    </>
  );
};

export default ComUpImg;
