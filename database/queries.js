const knex = require("../knex/knex.js");

const getAllAds = async (ctx, next) => {
  ctx.body = await knex("ads").orderBy("id", "asc");
}

module.exports = {
  getAllAds
};
