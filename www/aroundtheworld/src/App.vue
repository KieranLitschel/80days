<template>
  <div id="app">
    <div class="container" id="app">
      <header>
        <div class='logo'>
          <img src='./assets/logo.png'/>
          <span> Around The World </span>
        </div>
        <div class='profile'>
          <span>{{username}}</span>
          <button id="signin"> Sign In! </button>
        </div>
       </header>
      <div class="map-wrapper">
        <div class="detail">
          <overview> </overview>
          </div>
        </div>
        <div class='mapbox' id='map' style='width: 400px; height: 300px;'></div>
      </div>
  </div>
</template>

<script>
import Overview from './Overview.vue'
export default {
  components: {
    'overview':Overview
  },
  data() {
  return {
    'username' : 'Breddie Fawden'
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.profile {
  position: absolute;
  float: right;
  right: 0
}
.logo {
  float: left;
  left: 0
}
.logo img {
  width: 40px;
  margin-left: 10px;
}
.profile img {
  width: 30px;
}

header {
  width: 100%;
  height: 70px;
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
#map {
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
  z-index: 0;
}
#app {
  font-family: "Roboto",sans-serif;
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
  z-index: 0;
  height: 100%;
}
.map-wrapper {
  height: 100%;
}
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
  max-width: 300px;
  height: 500px;
  box-shadow:  -10px 10px 7px -4px rgba(0,0,0,0.42);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
</style>
