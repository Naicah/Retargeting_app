# Workbuster retargeting

## Purpose of the application

The purpose of the application is to fetch data from a JSON feed and then use that data to automatically create ads on Facebook through their Business Manager with the help of a Facebook API. The application requires an approved Facebook App to generate Access tokens to be able to use this application. The application also consists of GUI that takes in data from a SQL database and lets you view important information and statistics about the ads, and provides an approachable overview of current and past ads you have created through the help of the application.

The backend part of the application is constructed in Node.js, together with KNEX and KOA as a framework on top of that. The GUI is constructed with Vue.js.

## How far we have come

As the app currently stands, its capable of taking in data from a standing JSON feed and use that data to create and send a request to the Facebook Business SDK.

It’s important to note that to be able to use this application you have to replace all current facebook authentication information in the code with your own. You have to have your own approved Facebook app and provide its acces token and authentication information to the application. The app is currently not able of fetching data from the Facebook Business SDK and writing it into the database.
Features to implement
Convert GUI to use VUE CLI.

Create API calls that take in data from the facebook API and write it to the database.

Add a login function, preferably a Google-login.

## Dependencies

`package.json`.

    ...
      "dependencies": {
        "async-polling": "^0.2.1",
        "chart.js": "^2.8.0",
        "chartjs-plugin-datalabels": "^0.6.0",
        "dotenv": "^7.0.0",
        "express": "^4.16.4",
        "facebook-nodejs-ads-sdk": "^2.11.4",
        "facebook-nodejs-business-sdk": "^3.2.11",
        "gulp": "^4.0.0",
        "knex": "^0.16.5",
         "koa": "^2.7.0",
        "koa-router": "^7.4.0",
        "koa-static-server": "^1.4.0",
        "migrate": "^1.6.2",
        "nodemon": "^1.18.11",
        "objection": "^1.6.8",
         "pg": "^7.1.2",
        "superagent": "^5.0.2",
        "vue": "^2.6.10",
        "vue-chartjs": "^3.4.2",
        "vue-data-tables": "^3.4.4",
        "vue-google-login": "^2.0.0"
      },
    ...



## How to run the application

### In the project directory, you can run:

#### npm install

Always run this command to install all dependencies first.

#### npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.


## Contributors
The developers who have created the application.

| Developers  | Github repo |
| ------------- | ------------- |
| Daniel Rydh  | https://github.com/danielrydh  |
| Dessi Costa  | https://github.com/DessiC  |
| Jonathan Nilsson  | https://github.com/joni43  |
| Nina Hedman  | https://github.com/Naicah|
| Oliver Brian Barra Vasquez  | https://github.com/OliverBrian  |
|
