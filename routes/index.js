const express = require("express");
const router = express.Router();

const TaskController = require("../controller/TaskController");

/**
 * START
 * API: Create Task
 */
router.get("/api/task", TaskController.list);
router.post("/api/task/add", TaskController.create);
router.patch("/api/task/id/:task_id", TaskController.updateStatus);
/**
 * START
 * API: Create Task
 */

module.exports = router;
