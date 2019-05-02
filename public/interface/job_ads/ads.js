$.getJSON('/allAds', function(data) {
  console.log(data)
  var ad = new Vue({
    el: '#ads',
    data: {
      adsList: data,
      title: "Workbuster"
    },
    methods: {
      calDaysLeft: function(date) {
        const now = Date.now();
        const latest = new Date(date);
        const millisecondsLeft = latest - now;
        const daysLeft = Math.floor(millisecondsLeft / 1000 / 60 / 60 / 24);

        if (daysLeft > 0) {
          return daysLeft + " dagar kvar";
        } else {
          return "Avslutad";
        }
      },
      ifJobCategory: function(ad) {
        // if (ad.job_category === null || ad.job_category === "") {
        if (ad.job_category) {
          return ",";
        } else {
          return "";
        }
      }
    }
  })
  var filterad = new Vue({
    el: '#adFilterBindingdMethods',
    data: {
      adsList: data,
      title: 'Workbuster'
    },
    computed: {
      adLocationList: function() {
        const adLocations = []
        this.adsList.forEach(ad => {
          if (!adLocations.includes(ad.city)) {
            adLocations.push(ad.city)
          }
        })
        return adLocations
      },
      adJobCategoryList: function() {
        const adJobCategory = []
        this.adsList.forEach(ad => {
          if (!adJobCategory.includes(ad.job_category)) {
            adJobCategory.push(ad.job_category)
          }
        })
        return adJobCategory
      },
      adCompaniesList: function() {
        const adCompanies = []
        this.adsList.forEach(ad => {
          if (!adCompanies.includes(ad.company)) {
            adCompanies.push(ad.company)
          }
        })
        return adCompanies
      }
    }
  })
})

// const app = new Vue({
//   el: '#adJobLocation',
//   data: {
//     title: 'Treehouse Public Library',
//     mediaList: media,
//     adLocationType: ''
//   },
//   methods: {
//     toggleDetails: function(media){
//       media.showDetail = !media.showDetail
//     },
//     filterList: function(){
//       this.location = event.target.value;
//     }
//   },
//   computed: {
//     adLocationList: function(){
//       const location = [];
//       this.mediaList.forEach((adLocation)=>{
//         if(!location.includes(adLocation.adLocationType)){
//           location.push(adLocation.adLocationtype);
//         }
//       });
//       return types;
//     }
//   }
// });
