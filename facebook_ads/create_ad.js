// "use strict";

// const Koa = require("koa");
// const app = new Koa();

// const bizSdk = require("facebook-nodejs-business-sdk");
// const AdAccount = bizSdk.AdAccount;
// const Campaign = bizSdk.Campaign;
// const AdSet = bizSdk.AdSet;

// const access_token =
//   "EAAgSjZC0XzacBAChsNn9QFmCta44IgUsOkuZCiIfjrKfvKCOblLvX0HDqQPIgNqNw2TvsSNDdABSw5pwg2GonpZArH9PP846LAGxLY7k4wdCLW9jUu9KmA4IVP1qETSg2zYFxSLHwj1FbU4KlavijqRegcs3ZB28mi4ZAI0GkgPIb4IZBH2S0yDyl5uwvUyA0ZD";
// const app_secret = "2696e47e54e4f6f25248900e99f12fd3";
// const app_id = "2272209449504167";
// const id = "act_2268066353434439";
// const api = bizSdk.FacebookAdsApi.init(access_token);
// const showDebugingInfo = true; // Setting this to true shows more debugging info.
// if (showDebugingInfo) {
//   api.setDebug(true);
// }

// // ================================== //
// //         CREATE CAMPAIGN            //
// // ================================== //

// const logApiCallResult = (apiCallName, data) => {
//   console.log(apiCallName);
//   if (showDebugingInfo) {
//     // console.log('Data:' + JSON.stringify(data));
//   }
// };

// let campaignFields, campaignParams;
// campaignFields = [];

// campaignParams = {
//   name: new Date(),
//   objective: "LINK_CLICKS",
//   status: "PAUSED"
// };

// // https://kyhdemo.workbuster.com/jobs/62892-frontendutvecklare-till-workbuster/thanks DENNA LÄNK AnVÄNDS SOM EXKLUDERINGS-PARAMETER"
// let campaignID;

// const campaigns = new AdAccount(id)
//   .createCampaign(campaignFields, campaignParams)
//   .then(response => {
//     campaignID = response.id;
//     console.log("Här är campaignID't: " + campaignID);
//   })
//   .catch(err => {
//     return response.throw(400, "no data to get the api,");
//   });

// logApiCallResult("campaigns api call complete.", campaigns);

// // ================================== //
// //           CREATE ADSET             //
// // ================================== //

// const adsetLogApiCallResult = (apiCallName, data) => {
//   console.log(apiCallName);
//   if (showDebugingInfo) {
//     console.log("Data:" + JSON.stringify(data));
//   }
// };

// let adsetFields, adsetParams;
// adsetFields = [];
// adsetParams = {
//   name: "My AdSet",
//   campaign_id: campaignID,
//   optimization_goal: "REACH",
//   billing_event: "IMPRESSIONS",
//   bid_amount: "2",
//   daily_budget: "1000",

//   start_time: "2019-03-11T04:33:43-0700",
//   end_time: "2019-03-18T04:33:43-0700",

//   bid_amount: "1000",
//   promoted_object: { page_id: "<pageID>" },
//   targeting: { geo_locations: { countries: ["US"] } },
//   user_os: "iOS",
//   publisher_platforms: "facebook",
//   device_platforms: "mobile"
// };

// const adSets = new AdAccount(id)
//   .createAdSet(adsetFields, adsetParams)
//   .then(response => {
//     console.log("adset created");
//   })
//   .catch(err => {
//     return response.throw(400, "no data to get the api,");
//   });

// // logApiCallResult("campaigns api call complete.", camAdSet);
// // logApiCallResult("campaigns api call complete.", campaigns);

// adsetLogApiCallResult("adsets api call complete.", adSets);
