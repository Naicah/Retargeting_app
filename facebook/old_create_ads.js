"use strict";
const bizSdk = require("facebook-nodejs-business-sdk");
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const AdSet = bizSdk.AdSet;

const access_token =
  "EAAgSjZC0XzacBAChsNn9QFmCta44IgUsOkuZCiIfjrKfvKCOblLvX0HDqQPIgNqNw2TvsSNDdABSw5pwg2GonpZArH9PP846LAGxLY7k4wdCLW9jUu9KmA4IVP1qETSg2zYFxSLHwj1FbU4KlavijqRegcs3ZB28mi4ZAI0GkgPIb4IZBH2S0yDyl5uwvUyA0ZD";
const app_secret = "2696e47e54e4f6f25248900e99f12fd3";
const app_id = "2272209449504167";
let page_id = "272837913620776";
const ad_account_id = "act_2268066353434439";
const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

let campaign;
let campaign_id;
let ad_set;
let ad_set_id;
let creative;
let creative_id;
let ad;
let ad_id;
let adpreview;
let adpreview_id;

// ====================================== //
//              CREATE CAMPAIGN           //
// ====================================== //

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log("Data:" + JSON.stringify(data));
  }
};

const fields = [];
const params = {
  objective: "PAGE_LIKES",
  status: "PAUSED",
  buying_type: "AUCTION",
  name: new Date()
};
campaign = new AdAccount(ad_account_id).createCampaign(fields, params);
campaign

  // ====================================== //
  //              CREATE ADSET              //
  // ====================================== //
  .then(result => {
    logApiCallResult("campaign api call complete.", result);
    campaign_id = result.id;
    const fields = [];
    const params = {
      status: "PAUSED",
      targeting: { geo_locations: { countries: ["US"] } },
      daily_budget: "1000",
      billing_event: "IMPRESSIONS",
      bid_amount: "20",
      campaign_id: campaign_id,
      optimization_goal: "PAGE_LIKES",
      promoted_object: { page_id: page_id },
      name: new Date()
    };
    return new AdAccount(ad_account_id).createAdSet(fields, params);
  })

  // ====================================== //
  //              CREATE ADCREATIVE         //
  // ====================================== //
  .then(result => {
    logApiCallResult("ad_set api call complete.", result);
    ad_set_id = result.id;
    const fields = [];
    const params = {
      body: "Like My Page",
      image_url:
        "https://s3-eu-west-1.amazonaws.com/wb-bolt-production/account_728/image-gallery/1e3cc4b203a11d11c389da18fee7052b4d9c7deb-bruqc3.jpg",
      name: "My Creative",
      //   object_id: page_id,
      title: "My Page Like Ad"
    };
    return new AdAccount(ad_account_id).createAdCreative(fields, params);
  })
  // ====================================== //
  //              CREATE AD                 //
  // ====================================== //
  .then(result => {
    logApiCallResult("creative api call complete.", result);
    creative_id = result.id;
    const fields = [];
    const params = {
      status: "PAUSED",
      adset_id: ad_set_id,
      name: "My Ad",
      creative: { creative_id: creative_id }
    };
    return new AdAccount(ad_account_id).createAd(fields, params);
  })
  .then(result => {
    logApiCallResult("ad api call complete.", result);
    ad_id = result.id;
    const fields = [];
    const params = {
      ad_format: "DESKTOP_FEED_STANDARD"
    };
    return new Ad(ad_id).getPreviews(fields, params);
  })
  .then(result => {
    logApiCallResult("adpreview api call complete.", result);
    adpreview_id = result[0].id;
  })
  .catch(error => {
    console.log(error);
  });
