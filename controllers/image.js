const path = require('path');
const Images = require('../models/images');

exports.postImage = async(req, res, next) => {
  console.log(req.files);
  if(req.files) {
    const imageArray = req.files;
    let imageUrlArray = [];
    for(const image of imageArray) {
      const imageUrl = image.path.replace("\\", "/");
      imageUrlArray.push(imageUrl);
    };
    const images = new Images({
      image: imageUrlArray
    });
    images.save();
    return res.status(200).send({ message: 'image upload success', data: imageUrlArray });
  };
  return res.status(401).send({ message: 'image invalid', data: null })
};

exports.getImages = async(req, res, next) => {
  const images = await Images.find();
  let imageUrlArray = [];
  for(const image of images) {
    const imageArray = image.image;
    for(const imageUrl of imageArray) {
      imageUrlArray.push(imageUrl);
    };
  };
  return res.status(200).send({ message: 'fetch images success', data: imageUrlArray});
};