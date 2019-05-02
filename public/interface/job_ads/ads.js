$.getJSON("/allAds", function(data) {
  console.log(data);
  var ad = new Vue({
    el: "#ads",
    data: {
      adsList: data,
      title: "Workbuster"
    },
    methods: {
      calDaysLeft: function(date) {
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
      ifJobCategory: function(ad) {
        // if (ad.job_category === null || ad.job_category === "") {
        if (ad.job_category) {
          return ",";
        } else {
          return "";
        }
      }
    }
  });
});

// const app = new Vue({
//   el: '#media-list',
//   data: {
//     title: 'Treehouse Public Library',
//     mediaList: media,
//     type: ''
//   },
//   methods: {
//     toggleDetails: function(media){
//       media.showDetail = !media.showDetail
//     },
//     filterList: function(){
//       this.type = event.target.value;
//     }
//   },
//   computed: {
//     uniqueItemsList: function(){
//       const types = [];
//       this.mediaList.forEach((item)=>{
//         if(!types.includes(item.type)){
//           types.push(item.type);
//         }
//       });
//       return types;
//     }
//   }
// });
