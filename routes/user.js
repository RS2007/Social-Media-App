const router = require("express").Router();
const userController = require("../controllers/user.js");
const verifyMiddleware = require("../utils/verifyMiddleware.js");

router.get("/followers", verifyMiddleware, userController.getFollowers);
router.get("/search", userController.getUserByUsernameRegex);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/following", verifyMiddleware, userController.getFollowing);
router.delete("/delete", verifyMiddleware, userController.deleteUser);
router.post("/update", verifyMiddleware, userController.editUser);
router.put("/follow/:id", verifyMiddleware, userController.followUser);
router.get("/:id", verifyMiddleware, userController.getUserById);

module.exports = router;
