// // Koa - Get job feed
// const Koa = require('koa')
// const Router = require('koa-router')
// const app = new Koa()

// const PORT = process.env.PORT || 3001;

// // error handling
// app.use(async (ctx, next) => {
//     try {
//       await next()
//     } catch (err) {
//       ctx.status = err.status || 500
//       ctx.body = err.message
//       ctx.app.emit('error', err, ctx)
//     }
//   })

//   const jobsRouter = new Router()
//   // require our external routes and pass in the router
//   //  Every route listener is a function,
//   //  so we’re basically just attaching all of our functions to the Router() Object.
//   // It’s the same as writing it this way,
//   // const basicRoutes = require('./routes/basic');basicRoutes({router});
//   // just without instantiating a variable:

//   require('../routes/jobs')({ jobsRouter })

//   // tells the router to use all the routes that are on the object
//   app.use(jobsRouter.routes())
//   app.use(jobsRouter.allowedMethods())

//   // require our external routes and pass in the router
//   require('../routes/jobs')({ jobsRouter })
