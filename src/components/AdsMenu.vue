<template>

 <!-- ================================================================ -->
    <!--                              ADS                                 -->
    <!-- ================================================================ -->
    <div class="adsContainer">
      <div class="adCardsContainer"
      @click="getAdStatistics(ad)"
      v-show="
            (filterLocation === '' || filterLocation === ad.city || (filterLocation === 'Ej angett' && ad.city === null))
              && (filterJobCategory === '' || filterJobCategory === ad.job_category || (filterJobCategory === 'Ej angett' && ad.job_category === null))
              && (filterCompany === '' || filterCompany === ad.company || (filterCompany === 'Ej angett' && ad.company === null))"
              v-for="ad in filterSearchList">
        <div>
          <h3 class="highlightOnHover">{{ ad.company }}</h3>
          <h4>{{ ad.title }}</h4>
          <p class="adJobDetail">
            <span class="highlightOnHover">{{ ad.city }}{{ ifJobCategory(ad) }}</span>
            <span class="highlightOnHover">{{ ad.job_category }}</span>
          </p>
        </div>
        <p class="adTimeLeft">
          {{ getStatus(ad.last_application_timestamp) }}
        </p>
        <!-- ====================== AD STATISCICS ======================= -->
        <div>
          <!-- ============= AD STATISCICS HEADERS ================= -->
          <div class="adStatisticsHeaderContainer">
            <div>
              ANSÖKNINGAR
            </div>
            <div>
              KLICK
            </div>
            <div>
              VISNINGAR
            </div>
          </div>
          <!-- ============= AD STATISCICS NUMBERS ================ -->
          <div class="adStatisticsNumberContainer">
            <div>
              {{ ad.applies }}
            </div>
            <div>
              {{ ad.clicks }}

            </div>
            <div>
              {{ ad.views }}
            </div>
          </div>
        </div>
        <!-- END STATISTICS-->
      </div>
      <!-- END AD -->
    </div>
    <!-- END ADS-->

</template>

<script>
export default {
  name: 'AdsMenu',

  data: function() {
    return {
      filterLocation: "",
      
      adStatistics: [0, 0, 0],
    }
  },
  methods:{
    // ====================== STATISTICS ==================== //
        // GET STATISTICS FOR GIVEN ADD
        getAdStatistics(ad) {
          this.adStatistics.length < 3
            ? this.adStatistics.push(ad.applies, ad.clicks, ad.views)
            : this.adStatistics.splice(0, 3, ad.applies, ad.clicks, ad.views);

          return this.adStatistics;
        },
  }


}
</script>