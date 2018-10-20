<template>
  <div>
    <span> Add {{topic}} </span>
    <form>
      <label for="one-way">One Way?</label>
      <input type="checkbox"/><br>
      <label for="start">Start:  </label>
        <input type="date" id="start" name="trip"
               value="2018-07-22"
               min="2018-01-01" max="2018-12-31" /><br>
       <label for="end">End:</label>
           <input type="date" id="end" name="trip"
                  value="2018-07-29"
                  min="2018-01-01" max="2018-12-31"/> <br>
        <label for="startcity">From</label>
        <input id='startcity'></input><br>
        <label for="fromcity">To</label>
        <input id='startcity'/> <br>
        <button id="flight-search">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
  return {
    "topic":"Flights"
    }
  }
}
</script>
<style>
</style>
