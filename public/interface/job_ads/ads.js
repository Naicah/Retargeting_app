$.getJSON("/allAds", function(data) {
  console.log(data);
  var ad = new Vue({
    el: "#ads",
    data: {
      adsList: data,
      title: "Workbuster"
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