const router = require("express").Router();
const { register } = require("./controllers/auth-controller");
const {
  createProduct,
  getProduct,
  companyProduct,
  totalWaste,
} = require("./controllers/product-controller");

router.post("/api/register", register);
router.post("/api/createProduct", createProduct);
router.get("/api/getProd/:id", getProduct);
router.get("/api/companyProd/:email", companyProduct);
router.post("/api/totalWaste", totalWaste);

module.exports = router;
