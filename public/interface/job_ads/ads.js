const url = "allAds";
fetch(url)
  .then(res => res.json())
  .then(data => {
    new Vue({
      el: "#mainContainer",
      data: {
        allAdsList: data,
        adStatistics: [0, 0, 0],
        adsToShowList: [],
        sortContainerHidden: false,
        filterContainerHidden: false,
        filterSearch: "",
        filterLocation: "",
        filterJobCategory: "",
        filterCompany: "",
        showStatus: "",
        showActive: "",
        statisticsChart: "",
        selected: ""
      },
      //  CALCULATES AND SAVES STATUS FOR EACH AD IN allAdsList
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
        this.showOngoing = true;
      },

      mounted() {
        this.showStatus = "ongoing"; // Display ongoing ads
        this.createChart(); // Display statistics
      },
      watch: {
        // SHOW ADS BASED ON STATUS
        showStatus: function() {
          let status;

          if (this.showStatus === "all") {
            this.adsToShowList = this.allAdsList;
          } else {
            switch (this.showStatus) {
              case "ongoing":
                status = "ongoing";
                break;
              case "finished":
                status = "finished";
                break;
              case "all":
                break;
            }
            this.adsToShowList = this.allAdsList.filter(
              ad => ad.status === status
            );
          }
        },

        // ===================== STATISTICS =============== //
        // DISPLAYS CHOSEN STATISTICS
        adStatistics: function() {
          this.createChart();
        }
      }, // End watch

      methods: {
        // TOGGLE VALUE (BOOLEAN) FOR GIVEN DATAKEY
        toggle(dataKey) {
          this[dataKey] = !this[dataKey];
        },

        // TOGGLE WHICH ADS THATS ARE SHOWED BASED ON STATUS
        showAdsByStatus(status) {
          this.showStatus = status;
        },
        showBySort(status) {
          this.showActive = status;
        },

        // ============== FILTER ================ //

        getFilterInput(type) {
          this["filter" + type] = event.target.value;
        },

        // ================ SORT ================ //
        // SORT ADS BASED ON WHICH SORT BUTTON WAS CLICKED
        sort(value, type) {
          switch (type) {
            case "string":
              this.adsToShowList.sort((a, b) => (a[value] > b[value] ? 1 : -1));
              break;
            case "integer":
              this.adsToShowList.sort((a, b) => b[value] - a[value]);
              break;
          }
        },

        // ======================== ADS ======================= //

        // --------------- JOB CATEGORY --------------- //
        // CREATES COMMA IF AD HAS A JOB CATEGORY
        ifJobCategory(ad) {
          if (ad.job_category) {
            return ",";
          } else {
            return "";
          }
        },

        // --------------- DAYS LEFT --------------- //
        // CALCULATE DAYS LEFT TO APPLY TO JOB
        calcDaysLeft(date) {
          const now = Date.now();
          const latest = new Date(date);
          const millisecondsLeft = latest - now;
          return (daysLeft = Math.floor(
            millisecondsLeft / 1000 / 60 / 60 / 24
          ));
        },
        // RETURNS HOW MANY DAYS LEFT TO APPLY, OR SAYS THAT AD IS FINISHED
        getStatus(date) {
          const daysLeft = this.calcDaysLeft(date);

          if (daysLeft > 0) {
            return daysLeft + " dagar kvar";
          } else {
            return "Avslutad";
          }
        },

        // ====================== STATISTICS ==================== //
        // GET STATISTICS FOR GIVEN ADD
        getAdStatistics(ad) {
          this.adStatistics.length < 3
            ? this.adStatistics.push(ad.applies, ad.clicks, ad.views)
            : this.adStatistics.splice(0, 3, ad.applies, ad.clicks, ad.views);

          return this.adStatistics;
        },
        // CREATE CHART FOR STATISTICS
        createChart() {
          // Remove previous chart
          if (this.statisticsChart !== "") {
            this.statisticsChart.destroy();
          }
          // Create new chart
          this.statisticsChart = new Chart("bar-chart", {
            type: "bar",
            data: {
              labels: ["Ansökningar", "Klick", "Visningar"],
              datasets: [
                {
                  data: this.adStatistics,
                  label: "",
                  backgroundColor: [
                    "rgba(45, 125, 210, 1)",
                    "rgba(34, 95, 160, 1)",
                    "rgba(14, 38, 63, 1)"
                  ],
                  // Sets where to show numbers
                  datalabels: {
                    align: "end",
                    anchor: "end"
                  }
                }
              ]
            },
            options: {
              scales: {
                yAxes: [
                  // Hides gridlines
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
                    },
                    barPercentage: 0.7 // Bar width
                  }
                ]
              },
              layout: {
                padding: {
                  // Padding inside canvas
                  left: 50,
                  right: 50,
                  top: 42,
                  bottom: 32
                }
              },
              tooltips: {
                enabled: false
              },

              legend: false, // Labels y-axis
              tooltip: false, // Belongs to plugin
              plugins: {
                datalabels: {
                  // Numbers
                  font: {
                    weight: "bold",
                    size: 25,
                    family: "Montserrat"
                  },
                  color: "rgba(132, 133, 132, 1)"
                }
              },
              responsive: true,
              responsiveAnimationDuration: 0,
              maintainAspectRatio: false // Enables posibility to set size of chart (set in CSS)
            }
          });
        },
        createFilterList(dataKey) {
          const filterList = [];
          this.adsToShowList.map(ad => {
            if (!filterList.includes(ad[dataKey])) {
              filterList.push(ad[dataKey]);
            }
          });
          return filterList;
        }
      }, // End methods

      computed: {
        // ================ FILTER ================== //
        // SHOW ADS THAT MATCHES SEARCH
        filterSearchList() {
          return this.adsToShowList.filter(ad => {
            return ad.title
              .toLowerCase()
              .includes(this.filterSearch.toLowerCase());
          });
        },
        // CREATES LIST OF ALL LOCATIONS
        adLocationList: function() {
          adLocation = this.createFilterList("city");
          return adLocation;
        },
        // CREATES LIST OF ALL JOB CATEGORIES
        adJobCategoryList: function() {
          adJobCategory = this.createFilterList("job_category");
          return adJobCategory;
        },
        // CREATES LIST OF ALL COMPANIES
        adCompaniesList: function() {
          adCompany = this.createFilterList("company");
          return adCompany;
        }
      }
    });
    // ========================================================= //
    //               STATISTIC MENU                              //
    //         INIT A CHART FOR STATISTIC                         //
    // ========================================================= //
  })
  .catch(err => {
    throw err;
  });
