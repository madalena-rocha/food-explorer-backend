const { Router } = require("express");

const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.post("/:user_id", dishesController.create);

module.exports = dishesRoutes;