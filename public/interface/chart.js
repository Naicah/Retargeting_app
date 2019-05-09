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
            label: "",
            backgroundColor: "blue",
            data: banandata
            //data: [adLength]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
});

// var vm = new Vue({
//   el: "#chart",
//   data: {
//     message: ""
//   }
// });

/* var annons = document.getElementsByClassName("ad");

function initChart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",
    // The data for our dataset
    data: {
      labels: ["Notes"],
      datasets: [
        {
          label: "NOTES",
          backgroundColor: "blue",
          data: [notesLength]
        }
      ]
    },
    // Configuration options go here
    options: {
      scales: {
        xAxes: [
          {
            barPercentage: 0.3
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    }
  });
}
function updateChart(adLength) {
  chart.data.datasets[0].data = ad.adLength;
  chart.update();
}
 */
