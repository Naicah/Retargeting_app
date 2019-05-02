"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.table("ads", table => {
    table.string("job_category");
  });
};

module.exports.down = (knex, Promise) => {
  return knex.schema.table("ads", table => {
    table.dropColumn("job_category");
  });
};
