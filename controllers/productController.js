const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => {
  res.send('Create product');
};
const getAllProducts = async (req, res) => {
  res.send('Get All product');
};

module.exports = {
  createProduct,
  getAllProducts,
};
