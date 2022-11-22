const router = require("express").Router();
const commentController = require("../controllers/comment");
const verifyMiddleware = require("../utils/verifyMiddleware");

router.post("/create", verifyMiddleware, commentController.createComment);
router.delete("/delete", commentController.deleteComment);
router.get("/:id", commentController.getComment);
router.get("/all/:id", commentController.getAllCommentsForPost);
router.put("/:id", commentController.updateComment);

module.exports = router;
