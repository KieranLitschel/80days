<template>
  <div class="overview">
    <div class="overview-header">
      <p class="overview-title">{{title}}</p>
      <span v-for="member in members" class="overview-members">{{member}}</span>
      <nav class="detail-nav">
        <a id="overview" href='#'> Overview </a>
        <a id="prices" href='#'> Prices </a>
        <!-- add more -->
      </nav>
    </div>
    <div v-if="tripHasContent" class='overview-wrapper' id="overview-wrapper">
      <div v-for="d in dates">
        <day v-bind:events="d"></day>
      </div>
    </div>
    <div v-else class="warning-wrapper" id="no-content">
      Looks like you haven't added anything to the trip 🙈 <br>

      Start by clicking the button below.
    </div>
    <div class="form-wrapper" id="flight-form">
      <addflightform></addflightform>
    </div>
    <div class="form-wrapper" id="visit-form">
      <addvisitform></addvisitform>
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
import addflightform from './AddFlightForm.vue'
import addvisitform from './AddVisitForm.vue'

var t = JSON.parse(localStorage.getItem("trip"))
var t = JSON.parse(localStorage.getItem("trip"));
var hasContent = true;
if (t == null) {
    hasContent = false;
    //TODO: set the old trip data to user input
    localStorage.setItem('trip',JSON.stringify({"name":"Best Holiday","members":"Freddie","plan":[]}))
    t = JSON.parse(localStorage.getItem('trip'));
    var ds = []
  } else {
    var dates = localStorage.getItem('dates');
    if (dates == null || dates == []) {
      hasContent = false;
      var ds = []
    } else {
      var ds = t.plan
    }
  }
  console.log(hasContent)

export default {
  components : {
    "day" : Day,
    'fab': fab,
    "addflightform":addflightform,
    "addvisitform":addvisitform

  },
  data() {
    return {
      'tripHasContent' :hasContent,
      'title': t.name,
      'members':t.members,
      'dates':ds,
      'bgColor': '#DB222A',
      'positiontype': "fixed",
      'iconsize': "small",
            'fabActions': [
                {
                    'name': 'addFlight',
                    'icon': 'flight',
                    'tooltip': 'Add Flight'
                },
                {
                    'name': 'addHotel',
                    'icon': 'hotel',
                    'tooltip': 'Add Hotel'
                },
                {
                    'name': 'addVisit',
                    'icon': 'account_balance',
                    'tooltip': 'Add Visit'
                },
                {
                    'name': 'addMeal',
                    'icon': 'restaurant',
                    'tooltip': 'Add Meal'
                }
            ]
      }
  },
  methods:{
     addFlight(){
       $('#no-content').hide();
       $('#overview-wrapper').hide();
       $('#visit-form').hide();
       $('#flight-form').show();
     },
     addVisit(){
       $('#no-content').hide();
       $('#overview-wrapper').hide();
        $('#flight-form').hide();
       $('#visit-form').show();
     },
     addHotel(){

     },
     addMeal(){

     }
 }
}
</script>

<style>

.overview-header{
  background-color: #BFDBF7;
  width:100%;
  line-height: 0.5em;
  margin-left: -20px;
  padding-left: 20px;
  margin-top: -25px;
  padding-top: 20px;
  padding-bottom: 0.5em;
  box-shadow: 0px 5px 7px -3px rgba(0,0,0,0.42);
}
.overview {
  margin: 0;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.overview-title {
  font-size: 1.5em;
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
  padding-left: 10px;
}
.detail-nav {
  width: 100%;
  display: flex;
  background-color: none;
  justify-content: space-around;
  padding: 10px;
  margin-left: -20px;
  margin-top: 10px;
}
.detail-nav * {
  text-decoration: none;
  color: black;
}
.detail-nav *:hover {
  color: white;
}
.warning-wrapper {
  word-wrap: break-word;
  height: 100%;
  margin-left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: justify;
}
.overview-members {
  margin-left: 10px;
  line-height: 0.5em;
  font-size: 14px;
}
.form-wrapper {
  display: none;
  word-wrap: break-word;
  height: 100%;
  margin-left: -10px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: justify;
}
</style>
