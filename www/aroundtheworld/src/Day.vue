<template>
  <div>
    <p>{{weekday}} {{date}}</p>
    <div class="timeline">
      <flight></flight>
      <accomodation></accomodation>
      <visit></visit>
    </div>
  </div>
</template>

<script>
import Flight from './Flight.vue'
import Accomodation from './Accomodation.vue'
import Visit from './Visit.vue'

  export default {
    components : {
      'flight':Flight,
      'accomodation':Accomodation,
      'visit':Visit
    },
    data() {
      return {
      'weekday': 'Monday',
      'date': '01/10/18'
        }
      }
  }
</script>

<style>
/* The actual timeline (the vertical ruler) */
.timeline {
  border-left: 3px dotted #707070;
}

</style>
