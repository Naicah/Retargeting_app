// const knex = require("../knex/knex.js");

// let allAds;
// // let allAdsID;

// const getAllAds = async (ctx, next) => {
//   // ctx.body = await knex("ads"); // REMOVE LATER ON
//   allAds = await knex("ads");
//   ctx.body = allAds; // REMOVE LATER ON
// };

// // const getAllAdsID = async (ctx, next) => {
// //   // ctx.body = await knex.select("id").from("ads"); // REMOVE LATER ON
// //   allAdsID = await knex.select("id").from("ads");

// //   // ctx.body += " allJobsID " + allJobsID[0].id + " " + allJobsID[1].id; // REMOVE LATER ON
// //   ctx.body = allAdsID; // REMOVE LATER ON
// // };

// module.exports = {
//   getAllAds,
//   // getAllAdsID,
//   allAds
//   // allAdsID
// };

// ====================================================================================================== //
//                              Separate requests from jobs.js                                               //
// ====================================================================================================== //

// REMOVE LATER ON

// JOBS = ALL OBJECTS IN FEED
// ADS = ALL OBJECTS IN DATABASE = DATA OF BOTH JOB OBJECT AND AD INFO

// let allJobsID = []; // ID's of all jobs in feed
// let allNewJobsIndex = []; // All jobs that are in feed but not in database
// let allAds = []; // Object of each ad in database
// let allAdsID = []; // ID's of all ads in database

// module.exports = ({ router }) => {
//   // --- GET ALL JOBS ID --- //
//   // GET ID OF EACH JOB IN FEED, SAVE TO ARRAY allJobsID
//   router.get("/jobslength", async (ctx, next) => {
//     await request.get(feed).then(res => {
//       const jobs = res.body.jobs;

//       var i;
//       for (i = 0; i < jobs.length; i++) {
//         let id = jobs[i].id;
//         let job = id;
//         allJobsID.push(job);
//       }

//       ctx.body = allJobsID; // REMOVE LATER ON
//     });
//   });

//   // --- GET ALL ADS --- //
//   // GET OBJECT OF EACH AD IN DATABASE, SAVE TO ARRAY allAds
//   router.get("/ads", async (ctx, next) => {
//     allAds = await knex("ads");
//     ctx.body = allAds; // REMOVE LATER ON
//   });

//   // --- GET ALL ADS ID --- //
//   // GET ID OF EACH AD IN DATABASE, SAVE TO ARRAY allAdsID
//   router.get("/ID", async (ctx, next) => {
//     allAds = await knex.select("id").from("ads");
//     allAdsID = []; // Epmty array to get a fresh one
//     for (i = 0; i < allAds.length; i++) {
//       let adID = allAds[i].id;
//       allAdsID.push(adID);
//     }

//     ctx.body = allAdsID; // REMOVE LATER ON
//   });

//   // --- GET ALL NEW JOBS INDEX--- //
//   // GET INDEX OF UNSAVED JOBS (exists in feed but not in database), SAVE TO ARRAY allNewJobsIndex
//   router.get("/newJobs", async (ctx, next) => {
//     allNewJobsIndex = []; // Epmty array to get a fresh one
//     let i;
//     for (i = 0; i < allJobsID.length; i++) {
//       let id = allJobsID[i];

//       if (!allAdsID.includes(id)) {
//         allNewJobsIndex.push(i);
//       }
//     }
//     ctx.body = allResults; // REMOVE LATER ON
//   });
// };
