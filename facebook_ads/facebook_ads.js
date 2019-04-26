const bizSdk = require('facebook-nodejs-business-sdk')

// const accessToken = "EAAH0vZC5H3I8BAMmqZBB0wgjyHZCVKltwXV4LVYk4eC4csZBR2JlT2qlz7oK5TKZCQHQru93mU3pmmrVsDbr4mZCMw3PYDgsk6GxlVlnc2PzGejDZAlF6YxG0UloYzTY6dz5kSxYWEQvLqNlfwM6je9ROwiAHZAegip9valSRJkp8gZDZD"; // old

 const accessToken = "EAAgSjZC0XzacBAChsNn9QFmCta44IgUsOkuZCiIfjrKfvKCOblLvX0HDqQPIgNqNw2TvsSNDdABSw5pwg2GonpZArH9PP846LAGxLY7k4wdCLW9jUu9KmA4IVP1qETSg2zYFxSLHwj1FbU4KlavijqRegcs3ZB28mi4ZAI0GkgPIb4IZBH2S0yDyl5uwvUyA0ZD";

// const accountId = "act_2294603300601736"; // OLD
//const accountId = "act_2272209449504167"; // real
const accountId = 'act_2268066353434439' // sandbox

const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken)
const AdAccount = bizSdk.AdAccount
const AdCreative = bizSdk.AdCreative;

const Campaign = bizSdk.Campaign;

const account = new AdAccount(accountId);
var campaigns;

const create = new AdCreative(accountId)
const Create = bizSdk.AdSet

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

  // create
  // .read([AdCreative.Fields.name])
  // .then(create => {
  //   return create.getAdCreatives([Create.Fields.name], { limit: 10 }); // fields array and params)
  // })
  // .then(result => {
  //   create = result;
  //   create.forEach(create => console.log(create.name));
  // })
  // .catch(console.error);

