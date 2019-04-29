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
const pixel_id = "384339385749203";
const conversion_id = "709358172813044";
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
let fields, params;
// ====================================== //
//              CREATE CAMPAIGN           //
// ====================================== //

const logApiCallResult = (apiCallName, data) => {
  console.log('', '\n');
  console.log("============================");
  console.log(apiCallName);
  console.log("============================");
  if (showDebugingInfo) {
    console.log("Data:" + JSON.stringify(data));
  }
  console.log("============================");
  console.log('', '\n');
};
async function myFunction () {
fields = [];
params = {
  objective: "LINK_CLICKS",
  status: "PAUSED",
  buying_type: "AUCTION",
  name: new Date()
};
try {
  campaign = await (new AdAccount(ad_account_id)).createCampaign(fields, params);
  console.log('======= CAMPAIGN')
} catch(e) {
  console.log("It borked! " + e);
}

//campaign
campaign_id = campaign.id;

  // // ====================================== //
  // //         CREATE CUSTOM AUDIENCES        //
  // // ====================================== //
  // .then(result => {
  //   logApiCallResult("custom audience api call complete.", result);
  //   campaign_id = result.id;
  //   const fields = [];
  //   const params = {
  //     'name' : 'FacebookPixelCA',
  //     'rule' : {
  //       'inclusions':{
  //         'operator':'or',
  //         'rules':[
  //           {
  //             'event_sources':[
  //               {
  //               'id':'384339385749203',
  //               'type':'pixel'}
  //             ],'retention_seconds':25992000,
  //             'filter':{
  //               'operator':'and','filters':[
  //                 {
  //                   "operator": "=",
  //                   "field": "event",
  //                   "value": "store_visit"
  //                  }
  //                ]
  //               },
  //               "aggregation" : {
  //                 "type":"count",
  //                 "operator":">",
  //                 "value":0
  //                }
  //             }
  //           ]
  //         },
  //       },
  //     'prefill' : '1',
  //   };
  //   return new AdAccount(ad_account_id).createCustomAudience(fields, params);
  // })


  // // ====================================== //
  // //         CREATE CUSTOM AUDIENCES        //
  // // ====================================== //
  // .then(result => {
  //   logApiCallResult("custom audience api call complete.", result);
  //   campaign_id = result.id;
  //   const fields = [];
  //   const params = {
  //     'name' : 'FacebookPixelCA',
  //     'rule' : {
  //       'inclusions':{
  //         'operator':'or',
  //         'rules':[
  //           {
  //             'event_sources':[
  //               {
  //               'id':'384339385749203',
  //               'type':'pixel'}
  //             ],'retention_seconds':25992000,
  //             'filter':{
  //               'operator':'and','filters':[
  //                 {
  //                   "operator": "=",
  //                   "field": "event",
  //                   "value": "store_visit"
  //                  }
  //                ]
  //               },
  //               "aggregation" : {
  //                 "type":"count",
  //                 "operator":">",
  //                 "value":0
  //                }
  //             }
  //           ]
  //         },
  //       },
  //     'prefill' : '1',
  //   };
  //   return new AdAccount(ad_account_id).createCustomAudience(fields, params);
  // })


  // ====================================== //
  //              CREATE ADSET              //
  // ====================================== //


  //.then(result => {
    logApiCallResult("campaign api call complete.", campaign);
  //  campaign_id = result.id;
    fields = [];
    params = {
      status: "PAUSED",
      daily_budget: "1000",
      billing_event: "IMPRESSIONS",
      bid_amount: "20",
      campaign_id: campaign_id,
      optimization_goal: "LINK_CLICKS",
      
      url: 'https://kyhdemo.workbuster.com',
      // promoted_object : {
      //   pixel_id: pixel_id,
      // },
      targeting : {
        'geo_locations':{
          'countries':[
            'US']
          }
        },
      // targeting:{  
        
      //   "custom_audiences":[{"id":customAudience_id}]},
 
    
      name: ('New ' + new Date())
    };
    try {
      ad_set = await (new AdAccount(ad_account_id)).createAdSet(fields, params);
      console.log('======= AD_SET')
    } catch(e) {
      console.log("It borked! " + e);
    }
    
   
  //})
  ad_set_id = ad_set.id;
  // ====================================== //
  //              CREATE ADCREATIVE         //
  // ====================================== //
  /*
  $link = (object)[
    'link' => $linkUrl,
];

$signUp = (object)[
    'type'  => "SIGN_UP",
    'value' => $link,
];

$linkData = (object)[
    'call_to_action' => $signUp,
    'link'           => $objectUrl,
    'image_hash'     => $response->hash,
    'message'        => $body,
];

$objectStory = (object)[
    'link_data' => $linkData,
    'page_id'   => $pageId,
];

$data = (object)[
    'name'              => 'system-generated-' . $accountId,
    'title'             => $title,
    'object_story_spec' => $objectStory,
    'access_token'      => $this->accessToken,
];
*/

const link = {
  link: 'https://kyhdemo.workbuster.com/jobs/62892-frontendutvecklare-till-workbuster'
}

const signUp = {
  type: 'SIGN_UP',
  value: link,
}

const linkData = {
  call_to_action: signUp,
  link: 'https://kyhdemo.workbuster.com/jobs/62892-frontendutvecklare-till-workbuster',
  //image_url: 'https://s3-eu-west-1.amazonaws.com/wb-bolt-production/account_728/image-gallery/1e3cc4b203a11d11c389da18fee7052b4d9c7deb-bruqc3.jpg',
  image_hash: 'f053af9f189d66d8a479b15b01592391',
  message: 'Hej på dig'
}

const objectStory = {
  link_data: linkData,
  page_id: 272837913620776
}

const data = {
  name: ('ADC' + new Date()),
  title: 'My title',
  object_story_spec: objectStory
}

// const link_data = {
// call_to_action: {
//   type: 'SIGN_UP',
//   value: {
//     link: 'https://kyhdemo.workbuster.com/jobs/62892-frontendutvecklare-till-workbuster'
//   },
//   link: 'https://kyhdemo.workbuster.com/jobs/62892-frontendutvecklare-till-workbuster',
//   image_url: 'https://s3-eu-west-1.amazonaws.com/wb-bolt-production/account_728/image-gallery/1e3cc4b203a11d11c389da18fee7052b4d9c7deb-bruqc3.jpg',
//   message: 'Click me'
// } 
// }
// const object_story = {
//   link_data: link_data,
//   page_id: "272837913620776"
// }



//.then(result => {
    logApiCallResult("ad_set api call complete.", ad_set);
    fields = [];
    params = data;
    //  params = {
    //    name: ('ADC' + new Date()),
    //      title:"front end utvecklare till workbuster",
    //    body: "Like My Page",
    //    object_story_spec: object_story,
      //object_url: "https://kyhdemo.workbuster.com/jobs/62892-frontendutvecklare-till-workbuster",
      //link_url: "https://kyhdemo.workbuster.com/jobs/62892-frontendutvecklare-till-workbuster",
      //image_url:
      //  "https://s3-eu-west-1.amazonaws.com/wb-bolt-production/account_728/image-gallery/1e3cc4b203a11d11c389da18fee7052b4d9c7deb-bruqc3.jpg"
      
      //   object_id: page_id,
      
     // };
 
     try {
      creative = await (new AdAccount(ad_account_id)).createAdCreative(fields, params);
      console.log('======= CREATIVE')
  } catch(e) {
      console.log("It borked! " + e);
  }
    
  //})
  // ====================================== //
  //              CREATE AD                 //
  // ====================================== //
  //.then(result => {
    logApiCallResult("creative api call complete.", creative);
    creative_id = creative.id;
    fields = [];
    params = {
      'status': "PAUSED",
      'adset_id': ad_set_id,
      'name': "My Ad",
      'creative': { 'creative_id': creative_id },
      'ad_format' : 'DESKTOP_FEED_STANDARD',
    };
    ad = await (new AdAccount(ad_account_id)).createAd(fields, params);
  //})
  //.then(result => {
    logApiCallResult("ad api call complete.", ad);
    ad_id = ad.id;
    fields = [];
    params = {
      ad_format: "DESKTOP_FEED_STANDARD"
    };
    ad_preview = await (new Ad(ad_id)).getPreviews(fields, params);
  //})
  //.then(result => {
    logApiCallResult("adpreview api call complete.", ad_preview);
    adpreview_id = ad_preview.id;
  // })
  // .catch(error => {
  //   console.log(error);
  // });
    console.log("Look ma, i'm donezo. " + adpreview_id);
  }
  myFunction();

