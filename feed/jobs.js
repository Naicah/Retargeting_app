const request = require("superagent");
const knex = require("../knex/knex");
const queries = require("../database/queries");

const feed = "https://api.workbuster.com/jobs/feed/kyhdemo?format=json";

// JOBS = ALL OBJECTS IN FEED
// ADS = ALL OBJECTS IN DATABASE = DATA OF BOTH JOB OBJECT AND AD INFO

let allJobsID = []; // ID's and index of all jobs in feed
let allNewJobsIndex = []; // All jobs that are in feed but not in database
let allAds = []; // Object of each ad in database
let allAdsID = []; // ID's of all ads in database

module.exports = ({ router }) => {
  // --- GET ALL JOBS ID --- //
  // GET INDEX AND ID OF EACH JOB IN FEED, SAVE TO ARRAY allJobsID
  router.get("/jobslength", async (ctx, next) => {
    await request.get(feed).then(res => {
      const jobs = res.body.jobs;

      var i;
      for (i = 0; i < jobs.length; i++) {
        let index = i;
        let id = jobs[i].id;
        let job = { index, id };
        allJobsID.push(job);

        ctx.body = allJobsID; // REMOVE LATER ON
      }
    });
  });

  // --- GET ALL ADS --- //
  // GET OBJECT OF EACH AD IN DATABASE, SAVE TO ARRAY allAds
  router.get("/ads", async (ctx, next) => {
    allAds = await knex("ads");
    ctx.body = allAds; // REMOVE LATER ON
  });

  // --- GET ALL ADS ID --- //
  // GET ID OF EACH AD IN DATABASE, SAVE TO ARRAY allAdsID
  router.get("/ID", async (ctx, next) => {
    allAdsID = await knex.select("id").from("ads");
    ctx.body = allAdsID; // REMOVE LATER ON
  });

  // --- GET ALL NEW JOBS INDEX--- //
  // GET INDEX OF UNSAVED JOBS (exists in feed but not in database), SAVE TO ARRAY allNewJobsIndex

  // compare allAdsID and allJobsID
  // remove all dublicates
  // save index of each remaining ID

  //
  //
  //
  //
  //
  //

  //
  //
  //
  //
  //

  //
  //
  //
  //
  //

  //
  //
  //
  //
  //

  //
  //
  //
  //
  //

  // GET JOBS FROM FEED AND SAVE TO DB
  router.get("/", async (ctx, next) => {
    await request
      .get(feed)
      .then(res => {
        // GET JOB DATA FROM FEED
        const jobs = res.body.jobs;
        const jobObject = {
          id: jobs[0].id,
          title: jobs[0].title,
          description_short: jobs[0].description_short,
          last_application_timestamp: jobs[0].last_application_timestamp,
          published_first_date: jobs[0].published_first_date,
          updated_timestamp: jobs[0].updated_timestamp,
          apply_url: jobs[0].apply_url,
          image: jobs[0].image,
          company: jobs[0].company.name,
          city: jobs[0].company.city || "Ospecificerad stad",
          views: 0,
          clicks: 0,
          applies: 0
        };

        console.log("object", jobObject); // REMOVE LATER ON

        // ADD JOB DATA TO DATABASE
        knex("ads")
          .insert(jobObject)
          .then(function(result) {
            // .then required so that promise is executed
            res.json({ success: true, message: "ok" }); // respond back to request
          });

        ctx.body = [jobObject]; // REMOVE LATER ON
      })

      .catch(err => {
        return ctx.throw(400, "no data to get the api,");
      });
  });
};
