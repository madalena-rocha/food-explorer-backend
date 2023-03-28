const knex = require("../database/knex");

class CartsController {
  async create(request, response) {
    const { cart_items } = request.body;
    const user_id = request.user.id;

    const [cart_id] = await knex("carts").insert({
      created_by: user_id,
    });

    const itemsInsert = cart_items.map(async ({ dish_id, quantity }) => {
      const { name } = await knex("dishes").select("name").where({ id: dish_id }).first();

      return {
        cart_id,
        dish_id,
        name,
        quantity,
      };
    });

    await knex("cart_items").insert(await Promise.all(itemsInsert));

    return response.json();
  }
}

module.exports = CartsController;