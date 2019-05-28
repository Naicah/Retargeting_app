const request = require("superagent");
const knex = require("../knex/knex");

const AsyncPolling = require("async-polling");
const checkNewJobsInterval = 60000; //60 000 = 1m
const feed = "https://api.workbuster.com/jobs/feed/kyhdemo?format=json";

// ===========================================================================//
//    JOBS = ALL OBJECTS IN FEED                                              //
//    ADS = ALL OBJECTS IN DATABASE = DATA OF BOTH JOB OBJECT AND AD INFO     //
// ===========================================================================//

let allNewJobsIndex = []; // All jobs that are in feed but not in database
let allAds = [];
let allAdsID = []; // ID's of all ads in database
let allJobsID = [];
let lastFetchError;

module.exports = ({ router }) => {
  // ========================================================= //
  //               ON GIVEN INTERVAL                           //
  //       CHECK FOR NEW JOBS IN FEED AND SAVE TO DATABASE     //
  // ========================================================= //

  async function getAllAds(end) {
    lastFetchError = null;
    // ======================= //
    //     GET ALL JOBS ID     // GET ID OF EACH JOB IN FEED, SAVE TO ARRAY allJobsID
    // ======================= //

    allJobsID = [];
    await request
      .get(feed)
      .then(res => {
        const jobs = res.body.jobs;
        allJobsID = jobs.map(job => job.id);
      })
      .catch(err => {
        lastFetchError = "no data to get the api,";
      });

    // ======================= //
    //     GET ALL ADS         // GET OBJECT OF EACH AD IN DATABASE, SAVE TO ARRAY allAds
    // ======================= //

    allAds = await knex("ads");

    // ======================= //
    //     GET ALL ADS ID      // GET ID OF EACH AD IN DATABASE, SAVE TO ARRAY allAdsID
    // ======================= //

    allAdsList = await knex.select("id").from("ads");
    allAdsID = []; // Epmty array to get a fresh one
    allAdsID = allAdsList.map(ad => ad.id);

    // =========================== //
    //    GET ALL NEW JOBS INDEX   // GET INDEX OF UNSAVED JOBS (exists in feed but not in database), SAVE TO ARRAY allNewJobsIndex
    // =========================== //

    allNewJobsIndex = []; // Epmty array to get a fresh one
    allNewJobsIndex = allJobsID.map(job => {
      if (!allAdsID.includes(job.id)) {
        allJobsID.indexOf(job);
      }
    });

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
              city: job.location.city || job.location.name || null,
              job_category: job.department.name,
              applies: 0,
              clicks: 0,
              views: 0
            };

            // ================================== //
            //    ADD ALL NEW JOBS TO DATABASE    // SAVE EACH JOB OBJECT TO DATABASE
            // ================================== //
            knex("ads")
              .insert(jobObject)
              .then(function(result) {
                // .then required so that promise is executed
              });
          });
        })

        .catch(err => {
          lastFetchError = "no data to get the api,";
        });
    }
    end();
  } // End getAllAds

  // Set polling for getAllAds
  const getAllAdsWorker = AsyncPolling(getAllAds, checkNewJobsInterval);

  // Start getAllAdsWorker
  getAllAdsWorker.run();

  // Returns all ads in database (for interface)
  router.get("/allAds", async (ctx, next) => {
    ctx.body = allAds;
  });
};
