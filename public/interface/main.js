const url = "allads";
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
        chartTitle: "Alla annonser",
        statistics: [0, 0, 0],
        selectedAd: "",
        sortBy: ""
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
          this.getStatistics(this.adsToShowList);
          this.changeChartTitle(this.showStatus);
        },

        // ===================== STATISTICS =============== //
        // DISPLAYS CHOSEN STATISTICS
        statistics: function() {
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
        setSortBy(status) {
          this.sortBy = status;
        },

        // ==================== FILTER =================== //
        // CLEAR ALL FILTERS
        clearAllFilters() {
          (this.filterSearch = ""),
            (this.filterLocation = ""),
            (this.filterJobCategory = ""),
            (this.filterCompany = "");
        },

        // GET VALUE TO FILTER ON FROM INPUT FIELD, STORE IN DATA
        getFilterInput(type) {
          this["filter" + type] = event.target.value;
        },

        // ======================= SORT =================== //
        // SORT ADS BASED ON WHICH SORT BUTTON WAS CLICKED
        sort(value, type) {
          switch (type) {
            case "string":
              this.filterSearchList.sort((a, b) =>
                a[value] > b[value] ? 1 : -1
              );
              break;
            case "integer":
              this.filterSearchList.sort((a, b) => b[value] - a[value]);
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
        // GET STATISTICS FOR GIVEN AD
        getStatisticsChosenAd(ad) {
          console.log(ad);
          let location = "";
          let company = "";
          let title = "";
          if (ad.company !== null) {
            company = ad.company;
          }
          if (ad.title !== null) {
            title = ad.title;
            company += ", ";
          }
          if (ad.city !== null) {
            location = ad.city;
            title += ", ";
          }
          this.chartTitle = company + title + location;
          this.statistics.length < 3
            ? this.statistics.push(ad.applies, ad.clicks, ad.views)
            : this.statistics.splice(0, 3, ad.applies, ad.clicks, ad.views);

          return this.statistics;
        },

        // GET STATISTICS FROM GIVEN FILTERS AND STATUS
        getStatistics() {
          let statistics = [0, 0, 0];
          // THE IF ELSE BELOW SWITCHES BETWEEN showStatus AND FILTER INPUT
          if (
            this.filterCompany === "" &&
            this.filterLocation === "" &&
            this.filterJobCategory === ""
          ) {
            for (let index = 0; index < this.adsToShowList.length; index++) {
              statistics[0] += this.adsToShowList[index].applies;
              statistics[1] += this.adsToShowList[index].clicks;
              statistics[2] += this.adsToShowList[index].views;
            }
          } else {
            let company = "";
            let location = "";
            let jobCategory = "";
            if (this.filterCompany !== "") {
              company = this.filterCompany;
            }
            if (this.filterLocation !== "") {
              location = this.filterLocation;
              if (this.filterCompany !== "") {
                company += ", ";
              }
            }
            if (this.filterJobCategory !== "") {
              jobCategory = this.filterJobCategory;
              if (this.filterLocation !== "") {
                location += ", ";
              }
            }
            this.chartTitle = company + location + jobCategory;
            let chartFilterList = this.adsToShowList;

            //THE IF STATEMENTS BELOW FILTERS THE INPUT TO USEFUL DATA THAT CAN BE SENT TO THE CHART
            if (
              this.filterCompany !== "" &&
              this.filterCompany !== "Ej angett"
            ) {
              chartFilterList = chartFilterList.filter(
                ads => ads.company === this.filterCompany
              );
            }
            if (this.filterCompany === "Ej angett") {
              chartFilterList = chartFilterList.filter(
                ads => ads.company === null
              );
            }
            if (
              this.filterLocation !== "" &&
              this.filterLocation !== "Ej angett"
            ) {
              chartFilterList = chartFilterList.filter(
                ads => ads.city === this.filterLocation
              );
            }
            if (this.filterLocation === "Ej angett") {
              chartFilterList = chartFilterList.filter(
                ads => ads.city === null
              );
            }
            if (
              this.filterJobCategory !== "" &&
              this.filterJobCategory !== "Ej angett"
            ) {
              chartFilterList = chartFilterList.filter(
                ads => ads.job_category === this.filterJobCategory
              );
            }
            if (this.filterJobCategory === "Ej angett") {
              chartFilterList = chartFilterList.filter(
                ads => ads.job_category === null
              );
            }

            for (let index = 0; index < chartFilterList.length; index++) {
              statistics[0] += chartFilterList[index].applies;
              statistics[1] += chartFilterList[index].clicks;
              statistics[2] += chartFilterList[index].views;
            }
          }
          this.statistics = statistics;
        },

        // CHANGE TEXT UNDER STATISTICS TO DESCRIBE WHAT IS SHOWN IN CHART
        changeChartTitle(value) {
          let currentTitle;
          switch (value) {
            case "ongoing":
              currentTitle = "Pågående annonser";
              break;
            case "finished":
              currentTitle = "Avslutade annonser";
              break;
            case "all":
              currentTitle = "Alla annonser";
              break;
            default:
              currentTitle = value;
          }

          this.chartTitle = currentTitle;
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
                  data: this.statistics,
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
  .catch(error => {
    // ===================== Pop UP ===================== //
    // Swal fires a pop up. User able to make a new fetch to fetch ads.
    Swal.fire({
      imageUrl: "/interface/assets/error-dog.png",
      title: "Something went wrong with the fetch!",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Fetch again!"
    }).then(result => {
      const hurl = "allAds";
      fetch(hurl)
        .then(res => res.json())
        .then(data => {
          this.allAds = data;
          location.reload();
          return data;
        });
    });
  });
