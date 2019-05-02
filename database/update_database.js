const request = require("superagent");
const knex = require("../knex/knex");

const AsyncPolling = require("async-polling");
const checkNewJobsInterval = 3000; //60 000 = 1m
const feed = "https://api.workbuster.com/jobs/feed/kyhdemo?format=json";

// ===========================================================================//
//    JOBS = ALL OBJECTS IN FEED                                              //
//    ADS = ALL OBJECTS IN DATABASE = DATA OF BOTH JOB OBJECT AND AD INFO     //
// ===========================================================================//

let allNewJobsIndex = []; // All jobs that are in feed but not in database
let allAds = [
  {
    id: "2168",
    company: "Kungliga Operan",
    title: "Solist balett",
    last_application_timestamp: "18 dagar kvar",
    department: "Dansare",
    city: "Stockholm",
    views: 15,
    clicks: 12,
    applies: 25
  },
  {
    id: "2978",
    company: "KYH",
    title: "Lärare Front End",
    last_application_timestamp: "72 dagar kvar",
    department: "Lärare",
    city: "Nacka",
    views: 5,
    clicks: 2,
    applies: 11
  },
  {
    id: "12312",
    company: "Kumla Anstalt",
    title: "Kåkfarare sökes",
    last_application_timestamp: "18 dagar kvar",
    department: "Kriminell",
    city: "Kumla",
    views: 12,
    clicks: 16,
    applies: 78
  },
  {
    id: "97268",
    company: "Försäkringskassan",
    title: "Handläggare",
    last_application_timestamp: "3 dagar kvar",
    department: "Handläggare",
    city: "Stockholm",
    views: 72,
    clicks: 51,
    applies: 63
  },
  {
    id: "23523",
    company: "Kungliga Kadettakademin",
    title: "Krypskytt",
    last_application_timestamp: "14 dagar kvar",
    department: "Gävershanterare",
    city: "Jönköping",
    views: 12,
    clicks: 16,
    applies: 31
  }
]; // Object of each ad in database
let allAdsID = []; // ID's of all ads in database
let allJobsID = [];
let allResults = []; // Array with allJobsID, allAds, AllAdsID, allNewJobsIndex // REMOVE LATER ON
let pollingRuns = 0; // REMOVE LATER ON
let lastFetchError;

module.exports = ({ router }) => {
  // ========================================================= //
  //               ON GIVEN INTERVAL                           //
  //       CHECK FOR NEW JOBS IN FEED AND SAVE TO DATABASE     //
  // ========================================================= //

  async function getAllAds(end) {
    pollingRuns++; // REMOVE LATER ON
    console.log(pollingRuns); // REMOVE LATER ON

    lastFetchError = null;

    allResults = [];

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
        return allJobsID;
      })
      .catch(err => {
        lastFetchError = "no data to get the api,";
      });

    // ======================= //
    //     GET ALL ADS         // GET OBJECT OF EACH AD IN DATABASE, SAVE TO ARRAY allAds
    // ======================= //

    allAds = await knex("ads");

    allResults.push(allAds); // REMOVE LATER ON

    // ======================= //
    //     GET ALL ADS ID      // GET ID OF EACH AD IN DATABASE, SAVE TO ARRAY allAdsID
    // ======================= //

    allAdsList = await knex.select("id").from("ads");
    allAdsID = []; // Epmty array to get a fresh one
    for (i = 0; i < allAdsList.length; i++) {
      let adID = allAdsList[i].id;
      allAdsID.push(adID);
    }
    allResults.push(allAdsID); // REMOVE LATER ON

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
