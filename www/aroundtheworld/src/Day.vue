<template>
  <div>
    <p>{{weekday}} {{date}}</p>
    <div class="timeline">
      <div v-for="add in to_add" v-if="">

      </div>
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
    props:
      ['events'],
    data() {
      return {
      'weekday': '',
      'to_add':to_sort
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
