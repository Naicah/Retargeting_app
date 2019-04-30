const request = require("superagent");
const knex = require("../knex/knex");

const AsyncPolling = require("async-polling");
const checkNewJobsInterval = 30000; //60 000 = 1m
const feed = "https://api.workbuster.com/jobs/feed/kyhdemo?format=json";

// ===========================================================================//
//    JOBS = ALL OBJECTS IN FEED                                              //
//    ADS = ALL OBJECTS IN DATABASE = DATA OF BOTH JOB OBJECT AND AD INFO     //
// ===========================================================================//

let allJobsID = []; // ID's of all jobs in feed
let allNewJobsIndex = []; // All jobs that are in feed but not in database
let allAds = []; // Object of each ad in database
let allAdsID = []; // ID's of all ads in database

let allResults = []; // Array with allJobsID, allAds, AllAdsID, allNewJobsIndex // REMOVE LATER ON
let pollingRuns = 0; // REMOVE LATER ON

// ========================================================= //
//               ON GIVEN INTERVAL                           //
//       CHECK FOR NEW JOBS IN FEED AND SAVE TO DATABASE     //
// ========================================================= //

AsyncPolling(function(end) {
  pollingRuns++; // REMOVE LATER ON
  console.log(pollingRuns); // REMOVE LATER ON
  module.exports = ({ router }) => {
    allResults = [];
    router.get("/", async (ctx, next) => {
      // ======================= //
      //     GET ALL JOBS ID     // GET ID OF EACH JOB IN FEED, SAVE TO ARRAY allJobsID
      // ======================= //
      allJobsID = [];
      await request
        .get(feed)
        .then(res => {
          const jobs = res.body.jobs;

          var i;
          for (i = 0; i < jobs.length; i++) {
            let jobId = jobs[i].id;
            allJobsID.push(jobId);
          }
          allResults.push(allJobsID); // REMOVE LATER ON
          // ctx.body = allJobsID; // REMOVE LATER ON
        })
        .catch(err => {
          return ctx.throw(400, "no data to get the api,");
        });

      // ======================= //
      //     GET ALL ADS         // GET OBJECT OF EACH AD IN DATABASE, SAVE TO ARRAY allAds
      // ======================= //

      allAds = await knex("ads");
      // ctx.body = allAds; // REMOVE LATER ON
      allResults.push(allAds); // REMOVE LATER ON

      // ======================= //
      //     GET ALL ADS ID      // GET ID OF EACH AD IN DATABASE, SAVE TO ARRAY allAdsID
      // ======================= //

      allAds = await knex.select("id").from("ads");
      allAdsID = []; // Epmty array to get a fresh one
      for (i = 0; i < allAds.length; i++) {
        let adID = allAds[i].id;
        allAdsID.push(adID);
      }
      allResults.push(allAdsID); // REMOVE LATER ON
      // ctx.body = allAdsID; // REMOVE LATER ON

      // =========================== //
      //    GET ALL NEW JOBS INDEX   // GET INDEX OF UNSAVED JOBS (exists in feed but not in database), SAVE TO ARRAY allNewJobsIndex
      // =========================== //

      allNewJobsIndex = []; // Epmty array to get a fresh one
      for (i = 0; i < allJobsID.length; i++) {
        let id = allJobsID[i];

        if (!allAdsID.includes(id)) {
          allNewJobsIndex.push(i);
        }
      }
      allResults.push(allNewJobsIndex); // REMOVE LATER ON

      // ctx.body = allNewJobsIndex; // REMOVE LATER ON
      // ctx.body = allResults; // REMOVE LATER ON

      // =========================== //
      //    IF THERE ARE NEW JOBS    //
      // =========================== //

      if (allNewJobsIndex.length >= 1) {
        // =========================== //
        //    GET EACH NEW JOBS DATA   // GET DATA FROM FEED FOR EACH JOB IN FEED THAT IS NOT SAVED IN DATABASE (based in allNewJobsIndex)
        // =========================== //

        await request
          .get(feed)
          .then(res => {
            let jobObject;
            allNewJobsIndex.forEach(function(index) {
              const jobs = res.body.jobs;
              let job = jobs[index];
              jobObject = {
                id: job.id,
                title: job.title,
                description_short: job.description_short,
                last_application_timestamp: job.last_application_timestamp,
                published_first_date: job.published_first_date,
                updated_timestamp: job.updated_timestamp,
                apply_url: job.apply_url,
                image: job.image,
                company: job.company.name,
                city: job.location.city || "Ospecificerad stad",
                views: 0,
                clicks: 0,
                applies: 0
              };

              // ================================== //
              //    ADD ALL NEW JOBS TO DATABASE    // SAVE EACH JOB OBJECT TO DATABASE
              // ================================== //

              knex("ads")
                .insert(jobObject)
                .then(function(result) {
                  // .then required so that promise is executed
                  result.json({ success: true, message: "ok" }); // respond back to request
                });

              // ctx.body = [jobObject]; // REMOVE LATER ON
            });
          })

          .catch(err => {
            return ctx.throw(400, "no data to get the api,");
          });
      } else {
        // ctx.body = "There are no new jobs in the feed"; // REMOVE LATER ON
      }

      // ctx.body += "         polling runs: " + pollingRuns; // REMOVE LATER ON
    });
  };

  end();
}, checkNewJobsInterval).run();
