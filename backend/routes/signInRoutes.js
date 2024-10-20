const express = require("express");
const register = require("../controllers/register");
const login = require("../controllers/login");
const verify = require("../controllers/verify");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/verify",checkAuth,verify);

module.exports = router;
