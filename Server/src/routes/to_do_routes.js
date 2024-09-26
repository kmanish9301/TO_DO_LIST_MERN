const express = require("express");
const {
  CreateToDo,
  GetAllTasks,
  UpdateTask,
  DeleteTask,
} = require("../controller/to_do_controller");
const router = express.Router();

router.post("/create_task", CreateToDo);
router.get("/get_tasks", GetAllTasks);
router.put("/update_task/:id", UpdateTask);
router.delete("/delete_task/:id", DeleteTask);

module.exports = router;
