const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.patch("/:id", dishesController.update);

module.exports = dishesRoutes;