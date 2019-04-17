"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable("ads", table => {
    table
      .integer("id")
      .notNullable()
      .primary();
    table.string("title").notNullable();
    table.string("description_short").notNullable();
    table.timestamp("last_application_timestamp").notNullable();
    table.date("published_first_date").notNullable();
    table.timestamp("updated_timestamp").notNullable();
    table.string("apply_url").notNullable();
    table.string("image").notNullable();
    table.string("company").notNullable();
    table.string("city");
    table
      .integer("views")
      .notNullable()
      .defaultTo(1);
    table
      .integer("clicks")
      .notNullable()
      .defaultTo(1);
    table
      .integer("applies")
      .notNullable()
      .defaultTo(1);
  });
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTable("ads");
};
