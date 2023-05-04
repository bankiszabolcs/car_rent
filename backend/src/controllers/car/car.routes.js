const router = require("express").Router();
const carController = require("./car.controller");
const authenticateJWT = require("../../auth/authenticate");
const adminAuth = require("../../auth/adminOnly");

router.post("/", authenticateJWT, adminAuth, (req, res, next) =>
  carController.create(req, res, next)
);
router.get("/", (req, res, next) => carController.findAll(req, res, next));
router.get("/:id", (req, res, next) => carController.findById(req, res, next));
router.put("/:id", authenticateJWT, adminAuth, (req, res, next) =>
  carController.update(req, res, next)
);
router.delete("/:id", authenticateJWT, adminAuth, (req, res, next) =>
  carController.delete(req, res, next)
);

module.exports = router;
