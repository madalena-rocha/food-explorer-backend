const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { status, price, payment_method, order_items } = request.body;
    const user_id = request.user.id;

    const [order_id] = await knex("orders").insert({
      status,
      price,
      payment_method,
      created_by: user_id,
    });

    const itemsInsert = order_items.map(async ({ dish_id, quantity }) => {
      const { name } = await knex("dishes").select("name").where({ id: dish_id }).first();

      return {
        order_id,
        dish_id,
        name,
        quantity,
      };
    });

    await knex("order_items").insert(await Promise.all(itemsInsert));

    return response.json();
  }
}

module.exports = OrdersController;