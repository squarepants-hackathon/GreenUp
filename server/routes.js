const { register } = require("./controllers/auth-controller");
const router = require("express").Router();

router.post("/api/register", register);

module.exports = router;
