const knex = require("../database/knex");
const AppError = require("../utils/AppError");

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

  async show(request, response) {
    const { id } = request.params;

    const cart = await knex("carts").where({ id }).first();
    const cart_items = await knex("cart_items").where({ cart_id: id });

    return response.json({
      ...cart,
      cart_items,
    });
  }

  async update(request, response) { 
    const { id } = request.params;
    const { cart_items } = request.body;

    const cart = await knex("carts").where({ id }).first();

    if (!cart) {
      throw new AppError("Carrinho não encontrado.", 404);
    }

    const cartUpdate = {
      updated_at: knex.fn.now(),
    }

    await knex("cart_items").where({ cart_id: id }).delete();

    const itemsInsert = cart_items.map(async ({ dish_id, quantity }) => {
      const { name } = await knex("dishes").select("name").where({ id: dish_id }).first();

      return {
        cart_id: id,
        dish_id,
        name,
        quantity,
      };
    });

    await knex("cart_items").insert(await Promise.all(itemsInsert));
    await knex("carts").where({ id }).update(cartUpdate);

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("cart_items").where({ cart_id: id }).delete();
    await knex("carts").where({ id }).delete();

    return response.json();
  }
}

module.exports = CartsController;