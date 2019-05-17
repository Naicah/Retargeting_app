const url = "allAds";
fetch(url)
  .then(res => res.json())
  .then(data => {
    new Vue({
      el: "#mainContainer",
      data: {
        loggedInUser: "Workbuster",
        allAdsList: data,
        adsToShowList: [],
        showStatus: "",
        sortContainerHidden: false,
        filterContainerHidden: false,
        filterSearch: "",
        filterLocation: "",
        filterJobCategory: "",
        filterCompany: "",
        statisticsChart: "",
        chartTitle: "",
        adStatistics: [0, 0, 0]
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
      },

      mounted() {
        this.showStatus = "ongoing"; // Display ongoing ads
        this.createChart(); // Display statistics


      }, // End mounted
      watch: {
        // SHOW ADS BASED ON STATUS
        showStatus: function() {
          this.adsToShowList = this.getAdsByStatus(this.showStatus);
          this.getAdSetStatistics(this.adsToShowList)

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

        // ===================== STATUS ================== //
        // TOGGLE WHICH ADS THATS ARE SHOWED BASED ON STATUS
        showAdsByStatus(status) {
          this.showStatus = status;
        },

        // ==================== FILTER =================== //
        // GET VALUE TO FILTER ON FROM INPUT FIELD, STORE IN DATA
        getFilterInput(type) {
          this["filter" + type] = event.target.value;
        },

        // ======================= SORT =================== //
        // SORT ADS BASED ON WHICH SORT BUTTON WAS CLIC1KED
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
          this.chartTitle = ad.title;
          this.adStatistics.length < 3
            ? this.adStatistics.push(ad.applies, ad.clicks, ad.views)
            : this.adStatistics.splice(0, 3, ad.applies, ad.clicks, ad.views);

          return this.adStatistics;
        },
        
        getAdSetStatistics(dataKey, value) {
          this.adStatistics = [0,0,0]
          let adsetstatistics = [0,0,0];
          console.log(dataKey);
          let theValue = "filter" + value;         
        
          for (let index = 0; index < this.adsToShowList.length; index++) {
            
            console.log("thevalue" + this[theValue]);
            
            this.chartTitle = "Annonser " + this[theValue];

            if(this.adsToShowList[index][dataKey] === this[theValue]) {
              console.log('same')
              adsetstatistics[0] += this.adsToShowList[index].applies;
              adsetstatistics[1] += this.adsToShowList[index].clicks;
              adsetstatistics[2] += this.adsToShowList[index].views
              console.log(adsetstatistics);
              
            }
           
          }
          console.log(adsetstatistics);
          
          this.adStatistics = adsetstatistics;
          console.log(this.adStatistics);
          

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
        // GET ARRAY OF ADS WITH THE GIVEN STATUS
        getAdsByStatus(status) {
          if (status === "all") {
            ads = this.allAdsList;
          } else {
            ads = this.allAdsList.filter(ad => ad.status === status);
          }
          return ads;
        },
        // GET ARRAY OF KEYS IN AD TO BE ABLE TO FILTER ON (only unique values)
        getFilterList(dataKey) {
          const filterList = [];
          this.adsToShowList.map(ad => {
            let value = ad[dataKey];
            if (ad[dataKey] === null) {
              value = "Ej angett";
            }
            if (!filterList.includes(value)) {
              filterList.push(value);
            }
          });
          return filterList;
        }
      }, // End methods

      computed: {
        // ===================== STATUS ==================== //
        // CALCULATE TOTAL ADS WITH STATUS ONGOING
        totalOngoing: function() {
          return this.getAdsByStatus("ongoing").length;
        },
        // CALCULATE TOTAL ADS WITH STATUS FINISHED
        totalFinished: function() {
          return this.getAdsByStatus("finished").length;
        },
        // CALCULATE TOTAL ADS
        totalAll: function() {
          return this.getAdsByStatus("all").length;
        },
        // ===================== FILTER ===================== //
        // SHOW ADS THAT MATCHES SEARCH
        filterSearchList() {
          return this.adsToShowList.filter(ad => {
            return ad.title
              .toLowerCase()
              .includes(this.filterSearch.toLowerCase());
          });
        },
        // CREATES FILTERLIST OF ALL COMPANIES
        adCompaniesList: function() {
          adCompany = this.getFilterList("company");
          return adCompany;
        },
        // CREATES FILTERLIST OF ALL LOCATIONS
        adLocationList: function() {
          adLocation = this.getFilterList("city");
          return adLocation;
        },
        // CREATES FILTERLIST OF ALL JOB CATEGORIES
        adJobCategoryList: function() {
          adJobCategory = this.getFilterList("job_category");
          return adJobCategory;
        }
      } // End computed
    });
  })
  .catch(err => {
    throw err;
  });
