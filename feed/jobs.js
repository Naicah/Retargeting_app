const request = require("superagent");
const knex = require("../knex/knex");

const feed = "https://api.workbuster.com/jobs/feed/kyhdemo?format=json";

// JOBS = ALL OBJECTS IN FEED
// ADS = ALL OBJECTS IN DATABASE = DATA OF BOTH JOB OBJECT AND AD INFO

let allJobsID = []; // ID's of all jobs in feed
let allNewJobsIndex = []; // All jobs that are in feed but not in database
let allAds = []; // Object of each ad in database
let allAdsID = []; // ID's of all ads in database

let allResults = []; // Array with allJobsID, allAds, AllAdsID, allNewJobsIndex // REMOVE LATER ON

module.exports = ({ router }) => {
  router.get("/", async (ctx, next) => {
    // ======================= //
    //     GET ALL JOBS ID     // GET ID OF EACH JOB IN FEED, SAVE TO ARRAY allJobsID
    // ======================= //

    await request
      .get(feed)
      .then(res => {
        const jobs = res.body.jobs;

        var i;
        for (i = 0; i < jobs.length; i++) {
          let id = jobs[i].id;
          let job = id;
          allJobsID.push(job);
        }
        allResults.push(allJobsID); // REMOVE LATER ON
        ctx.body = allJobsID; // REMOVE LATER ON
      })
      .catch(err => {
        return ctx.throw(400, "no data to get the api,");
      });

    // ======================= //
    //     GET ALL ADS         // GET OBJECT OF EACH AD IN DATABASE, SAVE TO ARRAY allAds
    // ======================= //

    allAds = await knex("ads");
    ctx.body = allAds; // REMOVE LATER ON
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
    ctx.body = allAdsID; // REMOVE LATER ON

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

    ctx.body = allNewJobsIndex; // REMOVE LATER ON
    ctx.body = allResults; // REMOVE LATER ON

    // ================================ //
    //    GET NEW JOBS AND SAVE TO DB   // GET DATA FROM FEED FOR EACH JOB IN FEED THAT IS NOT SAVED IN DATABASE (based in allNewJobsIndex)
    // ================================ // AND SAVE OBJECT IN DATABASE

    await request
      .get(feed)
      .then(res => {
        // GET JOB DATA FROM FEED, for indexes saved in allNewJobsIndex
        const jobs = res.body.jobs;
        let jobObject;

        allNewJobsIndex.forEach(function(index) {
          jobObject = {
            id: jobs[index].id,
            title: jobs[index].title,
            description_short: jobs[index].description_short,
            last_application_timestamp: jobs[index].last_application_timestamp,
            published_first_date: jobs[index].published_first_date,
            updated_timestamp: jobs[index].updated_timestamp,
            apply_url: jobs[index].apply_url,
            image: jobs[index].image,
            company: jobs[index].company.name,
            city: jobs[index].company.city || "Ospecificerad stad",
            views: 0,
            clicks: 0,
            applies: 0
          };

          // ADD JOB DATA TO DATABASE
          knex("ads")
            .insert(jobObject)
            .then(function(result) {
              // .then required so that promise is executed
              res.json({ success: true, message: "ok" }); // respond back to request
            });

          ctx.body = [jobObject]; // REMOVE LATER ON
        });
      })

      .catch(err => {
        return ctx.throw(400, "no data to get the api,");
      });
  });
};
