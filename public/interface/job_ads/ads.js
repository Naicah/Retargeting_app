$.getJSON("/allAds", function(data) {
  console.log(data);
  var ad = new Vue({
    el: "#ads",
    data: {
      adsList: data,
      title: "Workbuster"
      
    },

    computed: {
    adLocationList: function(){

      const adLocations = [];
      this.adsList.forEach((ad)=>{
        if(!adLocations.includes(ad.city)){
          adLocations.push(ad.city);
        }
        console.log('adcity', ad.city)

      });

      return adLocations;
      }
      }

    });
    console.log('adcity', data[0].city)

  });




// const app = new Vue({
//   el: '#adJobLocation',
//   data: {
//     title: 'Treehouse Public Library',
//     mediaList: media,
//     adLocationType: ''
//   },
//   methods: {
//     toggleDetails: function(media){
//       media.showDetail = !media.showDetail
//     },
//     filterList: function(){
//       this.location = event.target.value;
//     }
//   },
//   computed: {
//     adLocationList: function(){
//       const location = [];
//       this.mediaList.forEach((adLocation)=>{
//         if(!location.includes(adLocation.adLocationType)){
//           location.push(adLocation.adLocationtype);
//         }
//       });
//       return types;
//     }
//   }
// });