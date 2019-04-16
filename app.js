const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();

const knex = require("./knex/knex.js");
const sqlDb = require("./database/queries");

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;

// ERROR HANDLING//
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

const jobsRouter = new Router();
require("./feed/jobs")({ jobsRouter });
jobsRouter.get("/ads", sqlDb.getAds);
app.use(jobsRouter.routes());
app.use(jobsRouter.allowedMethods());

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
