

$.getJSON('/allAds', function(data) {
  new Vue({
    el: '#mainContainer',
    data: {
      title: "Workbuster",
      allAdsList: data,
      adsToShowList: [],
      sortContainerHidden: false,
      filterContainerHidden: false,
      filterSearch: "",
      filterLocation: "",
      filterJobCategory: "",
      filterCompany: "",
      showOngoing: false,
      showFinished: false,
      showAll: false
    },
    mounted() {
      this.createChart();
    },
    watch: {
      showOngoing: function() {
        if (this.showOngoing) {
          this.adsToShowList = this.allAdsList.filter(
            ad => ad.status === "ongoing"
          );
          console.log("showOngoing true");
        }
      },
      showFinished: function() {
        if (this.showOngoing) {
          this.adsToShowList = this.allAdsList.filter(
            ad => ad.status === "finished"
          );
        }
      },
      showAll: function() {
        if (this.showOngoing) {
          this.adsToShowList = this.allAdsList;
        }
      }
    },
    created() {
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
      this.showOngoing = true;
      console.log("created");
    },
    methods: {
      createChart() {
         new Chart('bar-chart', {
           methods:{
            adStatistic: function(){
              console.log('hej', this.allAdsList)
            }
           },
          type: 'bar',
          data: {
            labels: ['Ansökningar', 'Visningar', 'Klick'],
            datasets: [
              {
                data: [12, 20, 10],
                label: 'Antal:',
                backgroundColor: [
                  'rgba(45, 125, 210, 1)',
                  'rgba(34, 95, 160, 1)',
                  'rgba(14, 38, 63, 1)'
                ],
                datalabels: {
                  align: 'end',
                  anchor: 'end'
                }
              }
  
            ]
  
          },
  
          options: {
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    display: false,
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },

            legend: false,
            tooltip: false,
            plugins: {
              datalabels: {
              }
            }
          }
        })
      },

      // -------------- SORT & FILTER --------------- //
      // TOGGLE FILTER SECTION
      toggleFilter: function() {
        this.filterContainerHidden ^= true;
      },
      // TOGGLE SORT SECTION
      toggleSort: function() {
        this.sortContainerHidden ^= true;
      },

      // --------------- FILTER --------------- //
      // GET WHICH LOCATION TO FILTER ON
      getFilterLocation: function() {
        this.filterLocation = event.target.value
        console.log(this.filterLocation,'locatoin')
      },
      // GET WHICH JOB CATEGORY TO FILTER ON
      getFilterJobCategory: function() {
        this.filterJobCategory = event.target.value
      },
      // GET WHICH COMPANY TO FILTER ON
      getFilterCompany: function() {
        this.filterCompany = event.target.value;
      },

      // --------------- SORT --------------- //
      // SORT ADS BASED ON WHICH SORT BUTTON WAS CLICKED
      sortAds(value) {
        switch (value) {
          case "title":
            this.adsToShowList.sort((a, b) => (a.title > b.title ? 1 : -1));
            break;
          case "company":
            this.adsToShowList.sort((a, b) => (a.company > b.company ? 1 : -1));
            break;
          case "city":
            this.adsToShowList.sort((a, b) => (a.city > b.city ? 1 : -1));
            break;
          case "job_category":
            this.adsToShowList.sort((a, b) =>
              a.job_category > b.job_category ? 1 : -1
            );
            break;
          case "applies":
            this.adsToShowList.sort((a, b) => b.applies - a.applies);
            break;
          case "views":
            this.adsToShowList.sort((a, b) => b.views - a.views);
            break;
          case "clicks":
            this.adsToShowList.sort((a, b) => b.clicks - a.clicks);
            break;
          case "last_application_timestamp":
            this.adsToShowList.sort((a, b) =>
              a.last_application_timestamp > b.last_application_timestamp
                ? 1
                : -1
            );
            break;
        }
      },

      // ----------------------- ADS ------------------------ //

      // --------------- JOB CATEGORY --------------- //
      // CREATES COMMA IF AD HAS A JOB CATEGORY
      ifJobCategory: function(ad) {
        if (ad.job_category) {
          return ",";
        } else {
          return "";
        }
      },

      // --------------- DAYS LEFT --------------- //
      // CALCULATE DAYS LEFT TO APPLY TO JOB
      calcDaysLeft: function(date) {
        const now = Date.now();
        const latest = new Date(date);
        const millisecondsLeft = latest - now;
        return (daysLeft = Math.floor(millisecondsLeft / 1000 / 60 / 60 / 24));
      },
      // RETURNS HOW MANY DAYS LEFT TO APPLY, OR SAYS THAT AD IS FINISHED
      getStatus: function(date) {
        const daysLeft = this.calcDaysLeft(date);

        if (daysLeft > 0) {
          return daysLeft + " dagar kvar";
        } else {
          return "Avslutad";
        }
      }
    },

    computed: {
      // -------------- FILTER --------------- //
      // SHOW ADS THAT MATCHES SEARCH
      searchList() {
        return this.adsToShowList.filter(ad => {
          return ad.title
            .toLowerCase()
            .includes(this.filterSearch.toLowerCase());
        });
      },
      // CREATES LIST OF ALL LOCATIONS
      adLocationList: function() {
        const adLocations = [];
        this.allAdsList.forEach(ad => {
          if (!adLocations.includes(ad.city)) {
            adLocations.push(ad.city)
          }
        })
        return adLocations
      },
      // CREATES LIST OF ALL JOB CATEGORIES
      adJobCategoryList: function() {
        const adJobCategory = [];
        this.allAdsList.forEach(ad => {
          if (!adJobCategory.includes(ad.job_category)) {
            adJobCategory.push(ad.job_category)
          }
        })
        return adJobCategory
      },
      // CREATES LIST OF ALL COMPANIES
      adCompaniesList: function() {
        const adCompanies = [];
        this.allAdsList.forEach(ad => {
          if (!adCompanies.includes(ad.company)) {
            adCompanies.push(ad.company)
          }
        })
        return adCompanies
      }
    }
  })
    // ========================================================= //
    //               STATISTIC MENU                              //
    //         INIT A CHART FOR STATISTIC                         //
    // ========================================================= //

})
