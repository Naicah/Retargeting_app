let bananansokning = 22;
let bananclicks = 11;
let bananvisningar = 1;

let banandata = [bananansokning, bananclicks, bananvisningar];

Vue.component("bar-chart", {
  extends: VueChartJs.Bar,
  mounted() {
    this.renderChart(
      {
        labels: ["Ansökningar", "Visningar", "Klick"],
        datasets: [
          {
            label: "Antal:",
            backgroundColor: [
              "rgba(45, 125, 210, 1)",
              "rgba(34, 95, 160, 1)",
              "rgba(14, 38, 63, 1)"
            ],
            data: banandata
            //data: [adLength]
          }
        ],
        // options: {
        //   legend: {
        //     display: false
        //   }
        // }
      },
      
      { 
        responsive: true, 
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        // scaleLabel: {
        //   display: false
        // }
        // gridLines: {
        //   display: false
        // }

      }
    );
  }
});


