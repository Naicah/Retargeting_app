<template>
    <div id="mainContainer">
    <header>
      <img src="./assets/workbuster.png">
      <div class="talk-bubble tri-right left-in">
        <div class="talktext">
            <p>Hej {{loggedInUser}}!</p>
        </div>
      </div>
        </header>
        <SortFilterMenu/>
        <!-- <AdsMenu/> -->
        <!-- <FilterMenu/> -->
        <!-- <SortMenu/> -->
    </div>

</template>

<script>
import SortFilterMenu from './components/SortFilterMenu.vue'
// import FilterMenu from './components/FilterMenu.vue'
//  import AdsMenu from './components/AdsMenu.vue'



export default {
  name: 'app',

  components: {
     SortFilterMenu,
    //  AdsMenu
    // SortMenu
  },

}
</script>

<style>

@import './style.css';
@import './styles/header.css';
@import './styles/filter.css';
@import './styles/filter_sort.css';
@import './styles/job_ads.css';
@import './styles/sort.css';
@import './styles/statistics.css';

</style>
