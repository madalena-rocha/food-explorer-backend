exports.up = knex => knex.schema.createTable("order_items", table => {
  table.increments("id");

  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");
  table.integer("dish_id").references("id").inTable("dishes");

  table.text("name").notNullable();
  table.integer("quantity").notNullable();
});

exports.down = knex => knex.schema.dropTable("order_items");