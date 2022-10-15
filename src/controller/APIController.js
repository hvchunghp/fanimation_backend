import db from "../configs/connectDB";

let getAllProducts = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "select *, category.categoryName FROM product INNER JOIN category ON product.category=category.category;"
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let getTopSeller = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "select *, category.categoryName FROM product INNER JOIN category ON product.category=category.category limit 5;"
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let getProduct = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `select *, category.categoryName from product INNER JOIN category ON product.category=category.category where id = '${req.params.id}'`
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let getCategory = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(`select * from category`);

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let getProductsByCategory = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `select * from product where category = '${req.params.category}' order by ${req.params.sort} ${req.params.type}`
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let getAboutPrice = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `select * from product where cost BETWEEN ${req.params.from} and ${req.params.to} order by ${req.params.sort} ${req.params.type}`
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};
let sortBy = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `select * from product order by ${req.params.sort} ${req.params.type}`
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let createNewProduct = async (req, res) => {
  let { productName, cost, description, category, image } = req.body;
  try {
    if (!productName || !cost || !category || !image) {
      return res.status(200).json({
        message: "Missing required parameter",
      });
    }
    await db.execute(
      "insert into product(productName, cost, description, category, image) values (?, ?, ?, ?, ?)",
      [productName, cost, description, category, image]
    );
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

let updateProduct = async (req, res) => {
  let { id } = req.params;
  let { productName, cost, description, category, image } = req.body;
  try {
    if (!productName || !cost || !category || !image) {
      return res.status(200).json({
        message: "Missing required parameter",
      });
    }
    await db.execute(
      `update product set productName = ?, cost = ?, description = ?, category = ?, image = ? where id= ?`,
      [productName, cost, description, category, image, id]
    );

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteProduct = async (req, res) => {
  let { id } = req.params;
  try {
    if (!id) {
      return res.status(200).json({
        message: "Missing required parameter",
      });
    }
    await db.execute(`delete from product where id = '${id}'`);

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

let postComment = async (req, res) => {
  let { id } = req.params;
  let { comment } = req.body;
  try {
    if (!comment) {
      return res.status(200).json({
        message: "Missing required parameter",
      });
    }
    await db.execute(
      `insert into comment(productId, comment) values('${id}', '${comment}')`
    );
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

let getComments = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `select * from comment where productId = ${req.params.id}`
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteComment = async (req, res) => {
  try {
    await db.execute(`delete from comment where id = '${req.params.id}'`);

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

let addToCart = async (req, res) => {
  let { productId } = req.body;
  try {
    await db.execute(`insert into cart(productId) values('${productId}')`);
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

let deleteFromCart = async (req, res) => {
  try {
    await db.execute(`delete from cart where id = '${req.params.id}'`);

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
let changeCount = async (req, res) => {
  let { id } = req.params;
  let { count } = req.body;
  try {
    if (count <= 0) {
      return res.status(-1).json({
        message: "Error",
      });
    }
    await db.execute(`update cart set count = ? where id= ?`, [count, id]);

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

let getProductsOnCart = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `SELECT * FROM product INNER JOIN cart ON product.id = cart.productId`
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let getTotalPrice = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `SELECT SUM(cost) as TotalCost FROM product INNER JOIN cart ON product.id = cart.productId`
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};
let getAllDiscountCodes = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(`SELECT * FROM discount`);
    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};
let getDiscountCode = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      `SELECT * FROM discount where discountCode = '${req.params.discountCode}'`
    );

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let getFAQ = async (req, res) => {
  try {
    const [rows, fields] = await db.execute(`SELECT * FROM faq`);

    return res.status(200).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getTopSeller,
  getCategory,
  getProductsByCategory,
  getAboutPrice,
  sortBy,
  createNewProduct,
  updateProduct,
  deleteProduct,
  postComment,
  getComments,
  deleteComment,
  addToCart,
  deleteFromCart,
  changeCount,
  getProductsOnCart,
  getTotalPrice,
  getAllDiscountCodes,
  getDiscountCode,
  getFAQ,
};
