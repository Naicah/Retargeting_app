// const bizSdk = require("facebook-nodejs-business-sdk");

// // const accessToken = "EAAH0vZC5H3I8BAMmqZBB0wgjyHZCVKltwXV4LVYk4eC4csZBR2JlT2qlz7oK5TKZCQHQru93mU3pmmrVsDbr4mZCMw3PYDgsk6GxlVlnc2PzGejDZAlF6YxG0UloYzTY6dz5kSxYWEQvLqNlfwM6je9ROwiAHZAegip9valSRJkp8gZDZD"; // old

<<<<<<< HEAD
 const accessToken = "EAAgSjZC0XzacBAChsNn9QFmCta44IgUsOkuZCiIfjrKfvKCOblLvX0HDqQPIgNqNw2TvsSNDdABSw5pwg2GonpZArH9PP846LAGxLY7k4wdCLW9jUu9KmA4IVP1qETSg2zYFxSLHwj1FbU4KlavijqRegcs3ZB28mi4ZAI0GkgPIb4IZBH2S0yDyl5uwvUyA0ZD";
=======
//  const accessToken = "EAAgSjZC0XzacBAH5LvD8lErqAbW57pKOkKZA9OWbXZCbBxxvwoWRvpJZBXyOsdQwVuLqYuBA4eE4ZCDTdQmXp8WiO2W7Fm32CqouknwZAVhzPRzOKODr0sHeDrMZATIByIxylZCHpcQEL51NFgVZA3eOfdRn0hgEkUAFAmlOfkzxZBFu5V6wW37LAyAXgxXwXDm2QZD";
>>>>>>> facebook

//  // const accountId = "act_2294603300601736"; // OLD
//  //const accountId = "act_2272209449504167"; // real
//  const accountId = "act_1897009923766808"; // sandbox

// const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
// const AdAccount = bizSdk.AdAccount;
// const Campaign = bizSdk.Campaign;

// const account = new AdAccount(accountId);
// var campaigns;

// account
//   .read([AdAccount.Fields.name])
//   .then(account => {
//     return account.getCampaigns([Campaign.Fields.name], { limit: 10 }); // fields array and params
//   })
//   .then(result => {
//     campaigns = result;
//     campaigns.forEach(campaign => console.log(campaign.name));
//   })
//   .catch(console.error);
