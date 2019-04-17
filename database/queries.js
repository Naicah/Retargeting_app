const knex = require("../knex/knex.js");

const getAllAds = async (ctx, next) => {
  ctx.body = await knex("ads");
  ctx.body += "hupp";
};

const getAllAdsID = async (ctx, next) => {
  ctx.body = await knex.select("id").from("ads");

  // knex.select( 'title', 'author', 'year' ).from( 'books' )
  // Outputs:
  // select`title`, `author`, `year` from`books`
};

module.exports = {
  getAllAds,
  getAllAdsID
};
