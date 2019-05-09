$.getJSON("/allAds", function(data) {
  console.log(data);
  var ad = new Vue({
    el: "#mainContainer",
    data: {
      title: "Workbuster",
      allAdsList: data,
      ongoingAdsList: "",
      finishedAdsList: "",
      adsToShowList: data,
      showAdsWithStatus: "all",
      sortContainerHidden: false,
      filterContainerHidden: false,
      filterSearch: "",
      filterLocation: "",
      filterJobCategory: "",
      filterCompany: ""
    },
    watch: {
      showAdsWithStatus: function() {
        switch (this.showAdsWithStatus) {
          case "ongoing":
            this.adsToShowList = this.ongoingAdsList.filter(
              ad => ad.status === "ongoing"
            );
            break;
          case "finished":
            this.adsToShowList = this.finishedAdsList.filter(
              ad => ad.status === "finished"
            );
            break;
        }
      }

      // whenever search field changes, this function will run
      // filterSearch: function() {
      //   this.adsToShowList = this.adsToShowList.filter(ad =>
      //     ad.title.toLowerCase().includes(this.filterSearch.toLowerCase())
      //   );
      // }
    },
    methods: {
      // CALCULATE DAYS LEFT TO APPLY TO JOB
      calcDaysLeft: function(date) {
        const now = Date.now();
        const latest = new Date(date);
        const millisecondsLeft = latest - now;
        return (daysLeft = Math.floor(millisecondsLeft / 1000 / 60 / 60 / 24));
      },
      // RETURNS ONLY ONGOING ADS
      filterOngoing: function() {
        this.adsToShowList = this.adsToShowList.filter(
          ad => this.calcDaysLeft(ad.last_application_timestamp) > 0
        );
      },
      // RETURNS HOW MANY DAYS LEFT TO APPLY, OR SAYS THAT AD IS FINISHED
      getStatus: function(date) {
        const daysLeft = this.calcDaysLeft(date);

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
        this.allAdsList.forEach(ad => {
          if (!adLocations.includes(ad.city)) {
            adLocations.push(ad.city);
          }
        });
        return adLocations;
      },
      // CREATES LIST OF ALL JOB CATEGORIES
      adJobCategoryList: function() {
        const adJobCategory = [];
        this.allAdsList.forEach(ad => {
          if (!adJobCategory.includes(ad.job_category)) {
            adJobCategory.push(ad.job_category);
          }
        });
        return adJobCategory;
      },
      // CREATES LIST OF ALL COMPANIES
      adCompaniesList: function() {
        const adCompanies = [];
        this.allAdsList.forEach(ad => {
          if (!adCompanies.includes(ad.company)) {
            adCompanies.push(ad.company);
          }
        });
        return adCompanies;
      },
      setStatus: function() {
        const list = this.allAdsList;
        var i;
        for (i = 0; i < list.length; i++) {
          daysLeft = this.calcDaysLeft(list[i].last_application_timestamp);

          if (daysLeft > 0) {
            list[i].status = "ongoing";
          } else {
            list[i].status = "finished";
          }
        }

        console.log("setStatus");
        // return this.allAdsList;
      },
      setStatusLists: function() {
        switch (this.showAdsWithStatus) {
          case "ongoing":
            this.ongoingAdsList = this.allAdsList.filter(
              ad => ad.status === "ongoing"
            );
            break;
          case "finished":
            this.finishedAdsList = this.allAdsList.filter(
              ad => ad.status === "finished"
            );
            break;
        }
      },
      searchList() {
        return this.adsToShowList.filter(ad => {
          return ad.title
            .toLowerCase()
            .includes(this.filterSearch.toLowerCase());
        });
      }
    }
  });
});
