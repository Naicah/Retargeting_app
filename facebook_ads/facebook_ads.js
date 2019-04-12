const bizSdk = require("facebook-nodejs-business-sdk");

const accessToken =
  "EAAH0vZC5H3I8BAMmqZBB0wgjyHZCVKltwXV4LVYk4eC4csZBR2JlT2qlz7oK5TKZCQHQru93mU3pmmrVsDbr4mZCMw3PYDgsk6GxlVlnc2PzGejDZAlF6YxG0UloYzTY6dz5kSxYWEQvLqNlfwM6je9ROwiAHZAegip9valSRJkp8gZDZD";
const accountId = "act_2294603300601736";

const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

const account = new AdAccount(accountId);
var campaigns;

account
  .read([AdAccount.Fields.name])
  .then(account => {
    return account.getCampaigns([Campaign.Fields.name], { limit: 10 }); // fields array and params
  })
  .then(result => {
    campaigns = result;
    campaigns.forEach(campaign => console.log(campaign.name));
  })
  .catch(console.error);
