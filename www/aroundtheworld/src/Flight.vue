<template>
  <div class=\"flight\">
    <div class=\"timeline-dot\"></div>
    <div class=\"flight-info\">
      <p>Flight </p>
      <p>{{dest}} ({{desttime}})</p>
      <p>{{arr}}({{arrtime}})</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
  return {
    'dest' : 'Edinburgh',
    'desttime' : '0600',
    'arr' : 'Barcelona',
    'arrtime' : '0930'
    }
  }
}
</script>

<style>

</style>
