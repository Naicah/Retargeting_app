const request = require("superagent");
// log all events to the terminal
const knex = require("../knex/knex");

// GET JOBS FROM FEED
module.exports = ({ jobsRouter }) => {
  jobsRouter.get("/", async (ctx, next) => {
    await request
      .get("https://api.workbuster.com/jobs/feed/kyhdemo?format=json")
      .then(res => {
        const jobObject = {
          id: res.body.jobs[0].id,
          title: res.body.jobs[0].title,
          description_short: res.body.jobs[0].description_short,
          last_application_timestamp:
          res.body.jobs[0].last_application_timestamp,
          published_first_date: res.body.jobs[0].published_first_date,
          updated_timestamp: res.body.jobs[0].updated_timestamp,
          apply_url: res.body.jobs[0].apply_url,
          image: res.body.jobs[0].image,
          company: res.body.jobs[0].company.name,
          city: res.body.jobs[0].location.city || 'Ankeborg (default city)'
        }
        console.log("object", jobObject);
        ctx.body = [jobObject];
        knex("ads").insert(jobObject).then( function (result) {
          console.log({ success: true, message: 'ok' });     // respond back to request
       })
        // return knex("ads").insert(jobObject)
      })


      .catch(err => {
        return ctx.throw(400, "no data to get the api,");
      });
  });
};
