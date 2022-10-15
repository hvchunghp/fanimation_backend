import express from "express";
import APIController from "../controller/APIController";

let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/products", APIController.getAllProducts);
  router.get("/best-sellers", APIController.getTopSeller);
  router.get("/product/:id", APIController.getProduct);
  router.get("/category", APIController.getCategory);
  router.get(
    "/category/:category/:sort-:type",
    APIController.getProductsByCategory
  );
  router.get("/price/:from-:to/:sort-:type", APIController.getAboutPrice);
  router.get("/category/:sort-:type", APIController.sortBy);
  router.post("/create-product", APIController.createNewProduct);
  router.put("/update-product/:id", APIController.updateProduct);
  router.delete("/delete-product/:id", APIController.deleteProduct);
  router.post("/comments/:id", APIController.postComment);
  router.get("/getComment/:id", APIController.getComments);
  router.delete("/delete-comment/:id", APIController.deleteComment);
  router.post("/add-to-cart", APIController.addToCart);
  router.put("/change-count/:id", APIController.changeCount);
  router.delete("/delete-from-cart/:id", APIController.deleteFromCart);
  router.get("/cart", APIController.getProductsOnCart);
  router.get("/totalPrice", APIController.getTotalPrice);
  router.get("/discount", APIController.getAllDiscountCodes);
  router.get("/discount/:discountCode", APIController.getDiscountCode);
  router.get("/FAQ", APIController.getFAQ);

  return app.use("/api/", router);
};

export default initAPIRoute;
