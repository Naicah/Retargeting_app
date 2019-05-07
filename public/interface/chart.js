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

