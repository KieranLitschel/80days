<template>
  <div>
    <span> Add Visit </span>
    <form>
      <label for="start">Where are you visiting?  </label>
        <input type="text" id="place"/><br>
       <label for="end">Date</label>
           <input type="date" id="date" name="trip"
                  value="2018-07-29"
                  min="2018-01-01" max="2018-12-31"/> <br>
        <label for="time">Time</label>
        <input id='time' type="time"></input><br>
        <div id="add-visit" href="#">Add</div>
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
#add-visit {
  padding: 1.5em;
  background-color: #1F7A8C;
  
}
</style>
