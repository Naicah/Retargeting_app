

$.getJSON('/allAds', function(data) {
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


 // ====================================== //
  //     METHODS TO hide filter % sort  //
  // ====================================== //

  var filterSort = new Vue({
    el: '#filterAndSortIcons',
    // components: { 'filters': myComponent },
    data: {

   },
   methods: {
    hideElement: function() {
      filterBinding.isHidden ^= true
      },
     hideSort: function() {
      sortBinding.isHidden ^=true
     }
   },
  })

  // ====================================== //
  //         FILTER & SORT Menu             //
  // ====================================== //
  var filterBinding = new Vue({
    el: '#adFilterBindingdMethods',
    data: {
      isHidden: false,
      adsList: data,
      title: 'Workbuster'
    },
    computed: {
// <----------------- See city,jobcat and company from database --------------------->
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
      },

    },
  })
})

var sortBinding = new Vue({
  el: '#adSortContainerId',
  data: {
    isHidden: false,
  },
})

