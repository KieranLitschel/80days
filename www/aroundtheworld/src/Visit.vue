<template>
  <div class="flight">
    <div class="timeline-dot"></div>
    <div class="flight-info">
      <p>Visit </p>
      <p>{{location}}</p>
      <p class="times">Time: {{time}}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
  return {
    'location':'Segrada de Familia',
    'time':'1200'
    }
  }
}
</script>

<style>
.flight {
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  line-height: 0.4em;
}
.flight p:nth-child(1) {
  font-size: 1.2em;
}
.times {
  font-size: 0.8em;
}

.flight-info {
  margin-left: 10px;
}
.timeline-dot {
  height: 15px;
  width: 15px;
  background-color: #1F7A8C;
  border-radius: 50%;
  display: inline;
  margin-left: -19px;
  margin-top: 0.9em;
  box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.3);

}

</style>
