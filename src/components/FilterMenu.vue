<template>
<!-- ================================================================ -->
    <!--                            FILTERS                               -->
    <!-- ================================================================ -->

    <div class="filterContainer">
      <h3>Filter </h3>
          <div class="filterHeaderContainer">
            <ul class="searchTitleContainer">
              <li>JOBBTITEL</li>
              <li>FÖRETAG</li>
              <li>PLATS</li>
              <li>JOBBKATEGORI</li>
            </ul>
          </div>
          <div>
            <div class="filterInputContainer">
              <div>
                <input type="text" value="" placeholder="Sök.." v-model="filterSearch" />
              </div>
              <div>
                <select class="filterInputSelect" v-on:change="getFilterInput('Company'), getAdSetStatistics('company', 'Company')">
                  <option value="">Välj företag...</option>
                  <option  v-for="ad in adCompaniesList " >{{ ad }}</option>
                </select>
              </div>
              <div>
                <select class="filterInputSelect" v-on:change="getFilterInput('Location'), getAdSetStatistics('city', 'Location')">
                  <option value="">Välj plats...</option>
                  <option v-for="ad in adLocationList">{{ ad }}</option>
                </select>
              </div>
              <div>
                <select class="filterInputSelect" v-on:change="getFilterInput('JobCategory'), getAdSetStatistics('job_category', 'JobCategory')">
                  <option value="">Välj jobbkategori...</option>
                  <option v-for="ad in adJobCategoryList">{{ ad }}</option>
                </select>
              </div>
            </div>
          </div>

    </div>

</template>

<script>
export default {
  name: 'FilterMenu',
//   props: {
//     msg: String
//   },


}
</script>