const knex = require("../knex/knex.js");

const getAds = async (ctx, next) => {
  ctx.body = await knex("ads").orderBy("id", "asc");
}

module.exports = {
  getAds
};
