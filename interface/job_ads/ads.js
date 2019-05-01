const ads = [
  {
    id: "2168",
    company: "Kungliga Operan",
    title: "Solist balett",
    last_application_timestamp: "18 dagar kvar",
    department: "Dansare",
    city: "Stockholm",
    views: 15,
    clicks: 12,
    applies: 25
  },
  {
    id: "2978",
    company: "KYH",
    title: "Lärare Front End",
    last_application_timestamp: "72 dagar kvar",
    department: "Lärare",
    city: "Nacka",
    views: 5,
    clicks: 2,
    applies: 11
  },
  {
    id: "12312",
    company: "Kumla Anstalt",
    title: "Kåkfarare sökes",
    last_application_timestamp: "18 dagar kvar",
    department: "Kriminell",
    city: "Kumla",
    views: 12,
    clicks: 16,
    applies: 78
  },
  {
    id: "97268",
    company: "Försäkringskassan",
    title: "Handläggare",
    last_application_timestamp: "3 dagar kvar",
    department: "Handläggare",
    city: "Stockholm",
    views: 72,
    clicks: 51,
    applies: 63
  },
  {
    id: "23523",
    company: "Kungliga Kadettakademin",
    title: "Krypskytt",
    last_application_timestamp: "14 dagar kvar",
    department: "Gävershanterare",
    city: "Jönköping",
    views: 12,
    clicks: 16,
    applies: 31
  }
];

var ad = new Vue({
  el: "#ads",
  data: {
    adsList: ads,
    title: "Workbuster"
  }
});
