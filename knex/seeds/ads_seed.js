exports.seed = knex => {
  return knex("ads")
    .del()
    .then(() => {
      return knex("ads").insert({
        id: "1234",
        title: "Work for me!!",
        description_short: "Come and work for me, it will be amazing!",
        last_application_timestamp: "2019-04-18T23:59:59+02:00",
        published_first_date: "2019-03-18",
        updated_timestamp: "2019-03-18T16:21:15.589Z",
        apply_url: "http://www.thecompany.com",
        image:
          "https://s3-eu-west-1.amazonaws.com/wb-bolt-production/account_728/image-gallery/1e3cc4b203a11d11c389da18fee7052b4d9c7deb-bruqc3.jpg",
        company: "The Company",
        city: "Stockholm",
        views: 0,
        clicks: 0,
        applies: 0
      });
    });
};
