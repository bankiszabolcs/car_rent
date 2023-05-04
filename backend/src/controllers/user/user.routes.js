const router = require("express").Router();
const userController = require("./user.controller");
const authenticateJWT = require("../../auth/authenticate");
const adminAuth = require("../../auth/adminOnly");

router.post("/", (req, res, next) => {
  return userController.create(req, res, next);
});
router.get("/", authenticateJWT, adminAuth, (req, res, next) => {
  return userController.findAll(req, res, next);
});
router.get("/:id", authenticateJWT, (req, res, next) => {
  return userController.findById(req, res, next);
});
router.post("/emailUsed", (req, res, next) => {
  return userController.isEmailUsed(req, res, next);
});
router.post("/usernameUsed", (req, res, next) => {
  return userController.isUsernameUsed(req, res, next);
});
router.put("/:id", authenticateJWT, (req, res, next) => {
  return userController.update(req, res, next);
});
router.delete("/:id", authenticateJWT, (req, res, next) => {
  return userController.delete(req, res, next);
});
router.post("/checkPassword", (req, res, next) => {
  return userController.checkPassword(req, res, next);
});

module.exports = router;
