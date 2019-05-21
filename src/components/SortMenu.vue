<!-- ================================================================ -->
    <!--                              SORT                                -->
    <!-- ================================================================ -->
    <template>

    <div class="sortContainer">
      <h3>Sortering</h3>
      <div class="sortButtonContainer">
        <div class="sortButton" @click="sort('title','string')">
          <p>Jobbtitel</p>
        </div>
        <div class="sortButton" @click="sort('company','string')">
          <p>Företagsnamn</p>
        </div>
        <div class="sortButton" @click="sort('city','string')">
          <p>Plats</p>
        </div>
        <div class="sortButton" @click="sort('job_category','string')">
          <p>Kategori</p>
        </div>
        <div class="sortButton" @click="sort('applies','integer')">
          <p>Antal ansökningar</p>
        </div>
        <div class="sortButton" @click="sort('views','integer')">
          <p>Antal visningar</p>
        </div>
        <div class="sortButton" @click="sort('clicks','integer')">
          <p>Antal Klick</p>
        </div>
        <div class="sortButton" @click="sort('last_application_timestamp','string')">
          <p>Antal dagar kvar</p>
        </div>
      </div>
    </div>

  </template>

  <script>
export default {
  name: 'SortMenu',
  props: {
    msg: String
  },

}
</script>