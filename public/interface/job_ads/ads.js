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
