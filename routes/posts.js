const router = require("express").Router();
const postController = require("../controllers/post");
const verifyMiddleware = require("../utils/verifyMiddleware");

router.post("/", verifyMiddleware, postController.createPost);
router.delete("/", postController.deletePost);
router.get("/user/", verifyMiddleware, postController.getAllPostsOfUser);
router.get("/:id", postController.getPostsById);
router.get("/", verifyMiddleware, postController.getAllPosts);
router.put("/:id", postController.updatePost);
router.put("/like/:id", verifyMiddleware, postController.likePost);

module.exports = router;
