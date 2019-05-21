"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("ads", table => {
    table
      .string("city")
      .nullable()
      .alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("ads", table => {
    table
      .string("city")
      .notNullable()
      .alter();
  });
};
