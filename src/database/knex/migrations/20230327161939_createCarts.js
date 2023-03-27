exports.up = knex => knex.schema.createTable("carts", table => {
  table.increments("id");

  table.integer("created_by").references("id").inTable("users").onDelete("CASCADE");
  
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("carts");
