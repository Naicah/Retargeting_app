
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
// const Campaign = bizSdk.Campaign;*
const AdSet = bizSdk.AdSet;

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


const adsetLogApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};


let adsetFields, adsetParams;
adsetFields = [
];
adsetParams = {

  'name' : 'My AdSet',
  'campaign_id' : '23843580054470340',
  'optimization_goal' : 'REACH',
  'billing_event' : 'IMPRESSIONS',
  'bid_amount' : '2',
  'daily_budget' : '1000'
  
};

/* make the API call */
FB.api(
    "/act_2268066353434439/adsets",
    "POST",
    {
        "name": "My Reach Ad Set",
        "optimization_goal": "REACH",
        "billing_event": "IMPRESSIONS",
        "bid_amount": "2",
        "daily_budget": "1000",
        "campaign_id": "23843580083730340",
        "status": "PAUSED"

    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);

// Custom audiences

// let customAudiencesFields, customAudiencesParams;
// customAudiencesFields = [
// ];
// customAudiencesParams = {
//  'name' : 'My Test Website Custom Audience',
//  'rule' : {'inclusions':{'operator':'or','rules':[{'event_sources':[{'id':'<pixelID>','type':'pixel'}],'retention_seconds':8400,'filter':{'operator':'and','filters':[{'field':'url','operator':'i_contains','value':'shoes'}]}}]}},
//  'prefill' : '1',
// };
// const customAudiences = (new AdAccount(id)).createCustomAudience(
//  fields,
//  params
// );
// logApiCallResult('customaudiences api call complete.', customAudiences);

// https://kyhdemo.workbuster.com/jobs/62892-frontendutvecklare-till-workbuster/thanks DENNA LÄNK AnVÄNDS SOM EXKLUDERINGS-PARAMETER"


const adsets = (new AdAccount(id)).createAdSet(
  adsetFields,
  adsetParams
);


adsetLogApiCallResult('adsets api call complete.', adsets);