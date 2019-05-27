const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const knex = require("./knex/knex.js");
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

const router = new Router();
require("./database/update_database")({ router });
app.use(router.routes());
app.use(router.allowedMethods());

app.use(require("koa-static-server")({ rootDir: "public" }));
