<template>
 <!-- ================================================================ -->
    <!--                      FILTER & SORTING                            -->
    <!-- ================================================================ -->
  <div class="stickyContainer">
    <div v-if="allAdsList" class="filterAndSortContainer">
      <ul class="statusContainer">
        <li class="statusOngoing" @click="showAdsByStatus('ongoing')" :class="{ active : showStatus === 'ongoing'}">
          <h3>{{ totalOngoing()  }}</h3>
          <p>Pågående</p>
        </li>
        <li class="statusFinished" @click="showAdsByStatus('finished')" :class="{ active : showStatus === 'finished' }">
          <h3>{{ totalFinished() }}</h3>
          <p>Avlsutade</p>
        </li>
        <li class="statusAll" @click="showAdsByStatus('all')" :class="{ active : showStatus === 'all' }">
          <h3>{{ totalAll() }}</h3>
          <p>Alla</p>
        </li>
      </ul>
      <div class="filterAndSortIconsContainer">
        <div class="filterIcon" @click="toggle('filterContainerHidden')">
          <h3>FILTER</h3>
          <i class="fas fa-filter"></i>
        </div>
        <div class="sortIcon" @click="toggle('sortContainerHidden')">
          <h3>SORTERING</h3>
          <i class="fas fa-sort-amount-down"></i>
        </div>
      </div>
    </div>
    <FilterMenu  v-show="!filterContainerHidden"/>
    <SortMenu   v-show="!sortContainerHidden"/>

  </div>
</template>

<script>
import FilterMenu from './FilterMenu.vue'
import SortMenu from './SortMenu.vue'
import allAds from '../../backend/database/update_database'

export default {
  name: 'SortFilterMenu',
  components: {
     FilterMenu,
     SortMenu,
  },
  props:['dataKey'],
  data: function() {
    return {
      
    sortContainerHidden: false,
        filterContainerHidden: false,
    allAdsList: "",
    showStatus:"",
    adsToShowList: [],



    // allAdsList: data,


    }
  },
  mounted() {
    console.log("Yo! mounted")
    this.fetchData();
        this.showStatus = "ongoing"; // Display ongoing ads

  },
    watch: {
        // SHOW ADS BASED ON STATUS
        // showStatus: function() {
        //   this.adsToShowList = this.getAdsByStatus(this.showStatus);
        //   this.getAdSetStatistics(this.adsToShowList)

        // },
  },

  methods: {
    fetchData: function () {
      console.log("fetchdata")
            var url = 'http://localhost:3000/allAds'
            fetch(url)
            .then(res => res.json())
            .then(data => {
              this.allAdsList = data;

            })
        },
     getAdsByStatus(status) {
       var ads;
       if (this.allAdsList) {
          if (status === "all") {
            ads = this.allAdsList;
          } else {
            ads = this.allAdsList.filter(ad => ad.status === status );
            console.log('status',allAds)
          }

          return ads;
          } else return [];
        },

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
                // TOGGLE VALUE (BOOLEAN) FOR GIVEN DATAKEY
         toggle: function(dataKey) {

          this[dataKey] = !this[dataKey];
        },
    // ===================== STATUS ================== //
        // TOGGLE WHICH ADS THATS ARE SHOWED BASED ON STATUS
        showAdsByStatus(status) {

          //todo refactor so that this filters adstoshow(?) according to status
          this.showStatus = status;
        },
        // GET ARRAY OF ADS WITH THE GIVEN STATUS
        // getAdsByStatus(status) {
        //   if (status === "all") {
        //     ads = this.allAdsList;
        //   } else {
        //     ads = this.allAdsList.filter(ad => ad.status === status);
        //   }
        //   return ads;
        // },

  },
  computed: {
        // ===================== STATUS ==================== //
        // CALCULATE TOTAL ADS WITH STATUS ONGOING
        // totalOngoing: function() {
        //   return this.getAdsByStatus("ongoing").length;
        // },
        // // CALCULATE TOTAL ADS WITH STATUS FINISHED
        // totalFinished: function() {
        //   return this.getAdsByStatus("finished").length;
        // },
        // // CALCULATE TOTAL ADS
        // totalAll: function() {
        //   return this.getAdsByStatus("all").length;
        // }
  }

}
</script>
