const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, description, category, price, image, ingredients } = request.body;
    const { user_id } = request.params;

    const dish_id = await knex("dishes").insert({
      name,
      description,
      category,
      price,
      image,
      created_by: user_id,
      updated_by: user_id,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
        created_by: user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.json();
  }
}

module.exports = DishesController;
