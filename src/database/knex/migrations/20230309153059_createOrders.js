exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id");
  
  table.text("status").notNullable();
  table.decimal("price", 10, 2).notNullable();
  table.text("payment_method").notNullable();

  table.integer("created_by").references("id").inTable("users");
  table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
