<template>
  <div id="app">
    <div class="container" id="app">
      <header>
        <div class='logo'>
          <img src='./assets/logo.png'/>
          <span> 80Days </span>
        </div>
        <a href="#" id="new_trip">
          <div class="profile">
            <img src="src/assets/create.png"/>
            <span>New</span>
          </div>
        </a>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  float: right;
  right: 50px;
  top: 5px;
  background-color: #E0E0E0;
  border: 1px solid #E0E0E0;
  border-radius: 2px;
  padding: 10px;
  text-decoration: none;
  color: black;
}
.logo {
  float: left;
  left: 0
}
.logo img {
  width: 40px;
  margin-left: 10px;
}
.logo span {
  position: absolute;
    padding: 10px;
  top: 5px;
  font-size: 24px;
}
.profile img {
  margin-right: 10px;
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
  box-shadow: 0px 5px 7px -3px rgba(0,0,0,0.42);
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
