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
      hideFilter: function() {
        this.filterContainerHidden ^= true;
      },
      hideSort: function() {
        this.sortContainerHidden ^= true;
      },
      ifJobCategory: function(ad) {
        // if (ad.job_category === null || ad.job_category === "") {
        if (ad.job_category) {
          return ",";
        } else {
          return "";
        }
      },

      getFilterLocation: function() {
        this.filterLocation = event.target.value;
      },
      getFilterJobCategory: function() {
        this.filterJobCategory = event.target.value;
      },
      getFilterCompany: function() {
        this.filterCompany = event.target.value;
      }
    },
    computed: {
      adLocationList: function() {
        const adLocations = [];
        this.adsList.forEach(ad => {
          if (!adLocations.includes(ad.city)) {
            adLocations.push(ad.city);
          }
        });
        return adLocations;
      },
      adJobCategoryList: function() {
        const adJobCategory = [];
        this.adsList.forEach(ad => {
          if (!adJobCategory.includes(ad.job_category)) {
            adJobCategory.push(ad.job_category);
          }
        });
        return adJobCategory;
      },
      adCompaniesList: function() {
        const adCompanies = [];
        this.adsList.forEach(ad => {
          if (!adCompanies.includes(ad.company)) {
            adCompanies.push(ad.company);
          }
        });
        return adCompanies;
      },
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
