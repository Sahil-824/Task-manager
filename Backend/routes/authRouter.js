const router = require('express').Router();
const authController = require("../Controllers/authController");
const isLogin = require("../middleware/require");


router.post('/signup',authController.signupController);
router.post("/login",authController.loginController);
router.get("/getUser",isLogin,authController.getUser)

module.exports = router;