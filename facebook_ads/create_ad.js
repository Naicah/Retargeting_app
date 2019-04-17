
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

const access_token = 'EAAgSjZC0XzacBAH5LvD8lErqAbW57pKOkKZA9OWbXZCbBxxvwoWRvpJZBXyOsdQwVuLqYuBA4eE4ZCDTdQmXp8WiO2W7Fm32CqouknwZAVhzPRzOKODr0sHeDrMZATIByIxylZCHpcQEL51NFgVZA3eOfdRn0hgEkUAFAmlOfkzxZBFu5V6wW37LAyAXgxXwXDm2QZD';
const app_secret = '2696e47e54e4f6f25248900e99f12fd3';
const app_id = '2272209449504167';
const id = 'act_1897009923766808';
const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

// todo: document everything

const logApiCallResult = (apiCallName, data) => {
  console.log('test', apiCallName);
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
const campaigns = (new AdAccount(id)).createCampaign(
  fields,
  params
);
logApiCallResult('campaigns api call complete.', campaigns);

