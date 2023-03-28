const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const sessionsRouter = require("./sessions.routes");
const ordersRouter = require("./orders.routes");
const favoritesRouter = require("./favorites.routes");
const cartsRouter = require("./carts.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishesRouter);
routes.use("/orders", ordersRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/carts", cartsRouter);

module.exports = routes;