<template>
  <div>
    <span> Create a new trip </span>
    <form>
      <label for="start">What is the name of the trip?</label>
      <input type="text" id="trip-name"/><br>
      <label for="end">Who is on the trip?</label>
      <input type="text" id="trip-members"/><br>

        <div id="create-new-trip" href="#">Create</div>
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
form {
  margin-top: 20px;
}
form label{
  margin-top: 20px;
}
label {
  text-align: left;
}
#create-new-trip {
  margin-top: 1em;
  padding: 1.5em;
  background-color: #1F7A8C;

}
</style>
