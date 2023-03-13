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

  async show(request, response) {
    const { id } = request.params;

    const order = await knex("orders").where({ id }).first();
    const order_items = await knex("order_items")
      .where({ order_id: id })
      .orderBy("name");

    return response.json({
      ...order,
      order_items,
    });
  }
  
  async update(request, response) {
    const { id } = request.params;
    const { status, price, payment_method } = request.body;

    const order = await knex("orders").where({ id }).first();

    const orderUpdate = {
      status: status ?? order.status,
      price: price ?? order.price,
      payment_method: payment_method ?? order.payment_method,
    };

    await knex("orders").where({ id }).update(orderUpdate);

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("orders").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    let orders;

    if(user.is_admin) {
      orders = await knex("orders")
        .select([
          "orders.id",
          "orders.status",
          "orders.price",
          "orders.payment_method",
          "users.name as created_by",
          "orders.created_at",
        ])
        .innerJoin("users", "users.id", "orders.created_by")
        .orderBy("orders.created_at", "desc");
      } else {
        orders = await knex("orders")
          .select([
            "orders.id",
            "orders.status",
            "orders.price",
            "orders.payment_method",
            "orders.created_at",
          ])
          .where({ created_by: user_id })
          .orderBy("orders.created_at", "desc");
      }

    const ordersDishes = await knex("order_items");
    const ordersWithDishes = orders.map((order) => {
      const orderDishes = ordersDishes.filter((dish) => dish.order_id === order.id);
      const filteredDishes = user.is_admin ? orderDishes : orderDishes.map(({ name, quantity }) => ({ name, quantity }));

      return {
        ...order,
        dishes: filteredDishes,
      };
    });

    return response.json(ordersWithDishes);
  }
}

module.exports = OrdersController;