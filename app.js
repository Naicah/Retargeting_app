const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();

const knex = require("./knex/knex.js");

const PORT = process.env.PORT || 3005;
// export {default as jobObject} from './feed/jobs';

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;

// ERROR HANDLING
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

// ====================================================================================================== //
//                                              ROUTES                                                    //
// ====================================================================================================== //

// require our external routes and pass in the router
// Every route listener is a function, so we’re basically just attaching all of our functions to the Router() Object.
// It’s the same as writing it this way:
// const basicRoutes = require('./routes/basic');basicRoutes({router});
// just without instantiating a variable

const router = new Router();
require("./database/update_database")({ router });
// router.get("/ads", queries.getAllAds);
// router.get("/ID", queries.getAllAdsID);
app.use(router.routes());
app.use(router.allowedMethods());

// ====================================================================================================== //
//                                              DATABASE                                                  //
// ====================================================================================================== //

// server.get("/pets", (req, res) => {
//   knex
//     .select()
//     .from("pets")
//     .timeout(1000)
//     .then(rows => {
//       res.send(rows);
//     });

// use the knex variable above to create dynamic queries
// });

// ====================================================================================================== //
//                                              INTERFACE                                                 //
// ====================================================================================================== //

// const vue = new Vue({
//   el: "",
//   data: {}
// });
