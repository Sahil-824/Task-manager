const router = require('express').Router();
const todoController = require("../Controllers/todoController");
const isLogin = require("../middleware/require");


router.post("/add",isLogin,todoController.addTodo);
router.post("/get",isLogin,todoController.getTodos);
router.post("/delete",isLogin,todoController.deleteTodo);
router.post("/markCompleted",isLogin,todoController.markCompleted);
router.post("/updateTodo",isLogin,todoController.updateTodo);


module.exports = router;