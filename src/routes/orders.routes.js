const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const checkAdminPermission = require("../middlewares/checkAdminPermission");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.get("/", ordersController.index);
ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:id", checkAdminPermission, ordersController.delete);
ordersRoutes.patch("/:id", checkAdminPermission, ordersController.update);

module.exports = ordersRoutes;