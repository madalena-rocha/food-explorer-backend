const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);

module.exports = routes;