const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const cloudinary = require('cloudinary').v2;

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'files-image-upload',
    }
  );
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) throw new BadRequestError('No file uploaded');

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image'))
    throw new BadRequestError('No file uploaded');

  const maxSize = Infinity;

  if (productImage.size > maxSize)
    throw new BadRequestError('Please upload image smaller than 100kb');

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = { uploadProductImage, uploadProductImageLocal };
