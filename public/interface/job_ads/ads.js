$.getJSON("/allAds", function(data) {
  console.log(data);
  var ad = new Vue({
    el: "#mainContainer",
    data: {
      adsList: data,
      title: "Workbuster",
      sortContainerHidden: false,
      filterContainerHidden: false,
      filterSearch: "",
      filterLocation: "",
      filterJobCategory: "",
      filterCompany: ""
    },
    methods: {
      // CALCULATE DAYS LEFT TO APPLY TO JOB, RETURN STRING
      calcDaysLeft: function(date) {
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
      // TOGGLE FILTER SECTION
      toggleFilter: function() {
        this.filterContainerHidden ^= true;
      },
      // TOGGLE SORT SECTION
      toggleSort: function() {
        this.sortContainerHidden ^= true;
      },
      // CREATES COMMA IF AD HAS A JOB CATEGORY
      ifJobCategory: function(ad) {
        if (ad.job_category) {
          return ",";
        } else {
          return "";
        }
      },
      // GET WHICH LOCATION TO FILTER ON
      getFilterLocation: function() {
        this.filterLocation = event.target.value;
      },
      // GET WHICH JOB CATEGORY TO FILTER ON
      getFilterJobCategory: function() {
        this.filterJobCategory = event.target.value;
      },
      // GET WHICH COMPANY TO FILTER ON
      getFilterCompany: function() {
        this.filterCompany = event.target.value;
      }
    },
    computed: {
      // CREATES LIST OF ALL LOCATIONS
      adLocationList: function() {
        const adLocations = [];
        this.adsList.forEach(ad => {
          if (!adLocations.includes(ad.city)) {
            adLocations.push(ad.city);
          }
        });
        return adLocations;
      },
      // CREATES LIST OF ALL JOB CATEGORIES
      adJobCategoryList: function() {
        const adJobCategory = [];
        this.adsList.forEach(ad => {
          if (!adJobCategory.includes(ad.job_category)) {
            adJobCategory.push(ad.job_category);
          }
        });
        return adJobCategory;
      },
      // CREATES LIST OF ALL COMPANIES
      adCompaniesList: function() {
        const adCompanies = [];
        this.adsList.forEach(ad => {
          if (!adCompanies.includes(ad.company)) {
            adCompanies.push(ad.company);
          }
        });
        return adCompanies;
      },
      // RETURNS ONLY ONGOING ADS
      // filterOngoing() {
      //   return this.adsList.filter(ad => {
      //     return ad.title
      //       .toLowerCase()
      //       .includes(this.filterSearch.toLowerCase());
      //   });
      // },
      // RETURNS ONLY ADS THAT MATCHES THE SEARCH
      filterSearchList() {
        return this.adsList.filter(ad => {
          return ad.title
            .toLowerCase()
            .includes(this.filterSearch.toLowerCase());
        });
      }
    }
  });
});
