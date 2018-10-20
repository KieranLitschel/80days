<template>
  <div>
    <p>{{weekday}} {{date}}</p>
    <div class=\"timeline\">
    <span v-for="for f in flights">
      <flight></flight>
    </span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
    return {
      "weekday" : "Monday",
      "date": "02/10/18",
      "flights": ['1']
      }
    }
  }
</script>
