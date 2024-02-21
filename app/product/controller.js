const fs = require("fs");
const path = require("path");
const Product = require("./model");

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3001/public/${image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  } else {
    try {
      await Product.sync();
      const result = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const index = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (e) {
    res.send(e);
  }
};

const update = async (req, res) => {
  const productID = req.params.id;
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  try {
    const product = await Product.findByPk(productID);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (image) {
      const target = path.join(__dirname, "../../uploads", image.originalname);
      fs.renameSync(image.path, target);

      await product.update({
        users_id: users_id || product.users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3001/public/${image.originalname}`,
      });
      return res.json(product);
    } else {
      await product.update({
        users_id: users_id || product.users_id,
        name,
        price,
        stock,
        status,
      });
      return res.json(product);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const view = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      res.status(404).send({
        status: "failed",
        response: "Product not found",
      });
      return;
    }

    res.send({
      status: "success",
      response: product,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      response: error.message,
    });
  }
};

const destroy = async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Cari produk berdasarkan ID
      const product = await Product.findByPk(productId);
  
      if (!product) {
        res.status(404).send({
          status: "failed",
          response: "Product not found"
        });
        return;
      }
  
      // Hapus produk
      await product.destroy();
  
      res.send({
        status: "success",
        response: "Product deleted successfully"
      });
    } catch (error) {
      res.status(500).send({
        status: "failed",
        response: error.message
      });
    }
  };
  

module.exports = { store, index, update, view, destroy };
