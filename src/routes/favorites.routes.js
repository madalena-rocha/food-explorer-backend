const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.delete("/:dish_id", favoritesController.delete);

module.exports = favoritesRoutes;