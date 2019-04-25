
'use strict';
const knex = require("../knex/knex.js");
var util = require('util')
const queries = require("../database/queries");


const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const AdCreative = bizSdk.AdCreative;


const Campaign = bizSdk.Campaign;

const access_token = 'EAAgSjZC0XzacBAChsNn9QFmCta44IgUsOkuZCiIfjrKfvKCOblLvX0HDqQPIgNqNw2TvsSNDdABSw5pwg2GonpZArH9PP846LAGxLY7k4wdCLW9jUu9KmA4IVP1qETSg2zYFxSLHwj1FbU4KlavijqRegcs3ZB28mi4ZAI0GkgPIb4IZBH2S0yDyl5uwvUyA0ZD';
const app_secret = '2696e47e54e4f6f25248900e99f12fd3';
const app_id = '2272209449504167';
const id = 'act_2268066353434439';
const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true; // Setting this to true shows more debugging info.

if (showDebugingInfo) {
  api.setDebug(true);
}

// todo: document everything

const logApiCallResult = (apiCallName, data) => {
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};


let fields, params;
fields = [
];
params = {
  'name' : 'My SDK campaign',
  'objective' : 'LINK_CLICKS',
  'status' : 'PAUSED',
};
// const campaigns = (new AdAccount(id)).createCampaign(
//   fields,
//   params
// );


let adFields, adParams
adFields = [
  'asset_feed_spec',
]
adParams = {
  'create_ad':' This is and ad'
}

const adCode = (new AdCreative(id)).get(
  adFields,
  adParams
)
logApiCallResult('campaigns api call complete.', adCode);
