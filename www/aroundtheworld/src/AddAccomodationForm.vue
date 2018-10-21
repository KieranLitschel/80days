<template>
  <div>
    <span> Add Accomodation </span>
    <form>
      <label for="start">Where are you staying? </label>
        <input type="text" id="location"/><br>
       <label for="end">Date</label>
           <input type="date" id="date" name="trip"
                  value="2018-07-29"
                  min="2018-01-01" max="2018-12-31"/> <br>
        <label for="time">Check In</label>
        <input id='time' type="time"></input><br>
        <a id="add-accomodation" href="#">Add</a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
  return {

    }
  }
}
</script>
<style>
#add-accomodation {
  margin-top: 10px;
  padding: 10px;
  background-color: #1F7A8C;
  display: block;
  text-decoration: none;
  color: black;
  width: 50%;

}
</style>
