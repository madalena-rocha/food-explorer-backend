const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const checkAdminPermission = require("../middlewares/checkAdminPermission");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", checkAdminPermission, upload.single("image"), dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", checkAdminPermission, dishesController.delete);
dishesRoutes.patch("/:id", checkAdminPermission, upload.single("image"), dishesController.update);

module.exports = dishesRoutes;