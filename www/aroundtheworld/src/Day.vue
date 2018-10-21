<template>
  <div>
    <p>{{events[0].date}}</p>
    <div class="timeline">
      <div v-for="d in events">
        <visit v-if="d.type == 'visit'"
          :location=d.place
          :time=d.time
          >
        </visit>
        <accomodation v-if="d.type == 'accomodation'"
          :location=d.place
          :checkin=d.time
          >
        </accomodation>
        <flight v-if="d.type == 'flight'"
          :flightnum=d.flightnum
          :dest=d.dest
          :desttime=d.desttime
          :arr=d.arr
          :arrtime=d.arrtime
          >
        </flight>
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
      'visit':Visit,
    },
    props:
      ['events'],
    data() {
      return {
        'weekday': 'BANGO',

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
