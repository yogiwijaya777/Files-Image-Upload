const path = require('path');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError} = require('../errors')
const uploadProductImage = async (req, res) => {
  if (!req.files) throw new BadRequestError('No file uploaded')
  
  const productImage = req.files.image; new BadRequestError('No file uploaded')
  
  if (!productImage.mimetype.startsWith('image')) throw
  
  const maxSize = 100000

  if(productImage.size > maxSize) throw new BadRequestError('Please upload image smaller than 100kb')

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = { uploadProductImage };
