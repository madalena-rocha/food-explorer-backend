exports.up = knex => knex.schema.createTable("cart_items", table => {
  table.increments("id");

  table.integer("cart_id").references("id").inTable("carts").onDelete("CASCADE");
  table.integer("dish_id").references("id").inTable("dishes");

  table.text("name").notNullable();
  table.integer("quantity").notNullable();
});

exports.down = knex => knex.schema.dropTable("cart_items");
