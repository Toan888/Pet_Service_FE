import cloudinary from '../configs/cloudinaryConfig.js';

export const cloudinaryImgs = async (images) => {
    const imagePromises = images.map((image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = () => {
                const base64data = reader.result;
                cloudinary.uploader.upload(base64data, (error, result) => {
                    if (error) reject(error);
                    resolve(result.secure_url);
                });
            };
        });
    });

    const urls = await Promise.all(imagePromises);
    return urls;
};
