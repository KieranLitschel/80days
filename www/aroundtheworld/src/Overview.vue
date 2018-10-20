<template>
  <div class="overview">
    <p class="overview-title">{{title}}</p>
    <p>{{members}}</p>
    <p>Overview</p>
    <day></day>
  </div>
</template>

<script>
import Day from './Day.vue'
export default {
  components : {
    "day" : Day
  },
  data() {
  return {
    "title": "Squad Trip",
    "members": "ajdoas"
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
  height: 100%;
  box-shadow:  0px 0px 50px 10px rgba(0,0,0,0.06);
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.overview {
  margin: 0;
  line-height: 0;
}
.overview-title {
  font-size: 1.5em;
  color: red;
}
.overview p:nth-child(2) {
  font-size: 0.8em;
  line-height: 1em;
}
</style>
