const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();

const knex = require("./knex/knex.js");

const PORT = process.env.PORT || 3000;


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

const router = new Router();
require("./database/update_database")({ router });
app.use(router.routes());
app.use(router.allowedMethods());

app.use(require("koa-static-server")({ rootDir: "public" }));

