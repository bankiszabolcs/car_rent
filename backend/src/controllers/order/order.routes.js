const router = require("express").Router();
const orderController = require("./order.controller");
const authenticateJWT = require("../../auth/authenticate");
const adminAuth = require("../../auth/adminOnly");

router.get("/", authenticateJWT, adminAuth, (req, res, next) =>
  orderController.findAll(req, res, next)
);
router.get("/:id", authenticateJWT, (req, res, next) =>
  orderController.findById(req, res, next)
);
router.get("/user/:userId", authenticateJWT, (req, res, next) =>
  orderController.findByUserId(req, res, next)
);
router.post("/", authenticateJWT, (req, res, next) =>
  orderController.create(req, res, next)
);
router.put("/:id", authenticateJWT, (req, res, next) =>
  orderController.update(req, res, next)
);
router.delete("/:id", authenticateJWT, (req, res, next) =>
  orderController.delete(req, res, next)
);

module.exports = router;
