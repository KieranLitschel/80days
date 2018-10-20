<template>
  <div class="overview">
    <div class="overview-header">
      <p class="overview-title">{{title}}</p>
      <p>{{members}}</p>
      <p>Overview</p>
    </div>
    <div class='overview-wrapper'>
        <day></day>
        <day></day>
        <day></day>
    </div>
    <div class="fab-wrapper">
      <fab :actions="fabActions"
       @addFlight="addFlight"
       @addHotel="addHotel"
       @addVisit="addVisit"
       @addMeal="addMeal"
       :position-type="positiontype"
       :bg-color="bgColor"
       :icon-size="iconsize"
        ></fab>
    </div>
  </div>
</template>

<script>
import Day from './Day.vue'
import fab from 'vue-fab'
export default {
  components : {
    "day" : Day,
    'fab': fab
  },
  data() {
  return {
    bgColor: '#DB222A',
    positiontype: "fixed",
    iconsize: "small",
          fabActions: [
              {
                  name: 'addFlight',
                  icon: 'flight',
                  tooltip: 'Add Flight'
              },
              {
                  name: 'addHotel',
                  icon: 'hotel',
                  tooltip: 'Add Hotel'
              },
              {
                  name: 'addVisit',
                  icon: 'account_balance',
                  tooltip: 'Add Visit'

              },
              {
                  name: 'addMeal',
                  icon: 'restaurant',
                  tooltip: 'Add Meal'
              }
          ],
    "title": "Squad Trip",
    "members": "ajdoas"
    }
  },
  methods:{
     addFlight(){
         alert('Added Flight');
     },
     alert(){
         alert('Clicked on alert icon');
     }
 }
}
</script>

<style>
.detail {
  font-family: "Roboto", sans-serif;
  background-color: white;
  z-index: 1;
  right: 0;
  align-self: flex-end;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 50px;
  min-width: 300px;
  max-height: 500px;
  box-shadow:  0px 0px 50px 10px rgba(0,0,0,0.06);
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

}
.overview-header{
  background-color: none;
  width:100%;
  margin-left: -20px;
  padding-left: 20px;
  box-shadow: 10px 0 0px -2px #888;
}
.overview {
  margin: 0;
  line-height: 0;
  padding-left: 10px
}
.overview-title {
  font-size: 1.5em;
  color: red;
  padding-left: 10px
}
.overview p:nth-child(2) {
  font-size: 0.8em;
  line-height: 1em;
  padding-left: 10px
}
.overview p:nth-child(3) {
  font-size: 0.8em;
  line-height: 1em;
  padding-left: 10px
}
.fab-wrapper {
  background-color: none;
  position: absolute;
  padding-bottom: 10px;
  margin-bottom: 30px;
  right: 0px;
  font-family: "Roboto",sans-serif;
}
.overview-wrapper {
  overflow: scroll;
  max-height: 500px;
  padding-left: 10px
}




</style>
