
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
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
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};

let fields, params;
fields = [
];
params = {
  'name' : 'My first campaign',
  'objective' : 'LINK_CLICKS',
  'status' : 'PAUSED',
};
const campaigns = (new AdAccount(id)).createCampaign(
  fields,
  params
);
logApiCallResult('campaigns api call complete.', campaigns);

