<template>
  <div>
    <p>{{weekday}} {{date}}</p>
    <div class="timeline">
      <flight></flight>
    </div>
  </div>
</template>

<script>
import Flight from './Flight.vue'
  export default {
    components : {
      'flight':Flight
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
