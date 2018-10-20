Vue.component('overview', {
  data: function () {
    return {
      "title": "Squad Trip",
      "members": "ajdoas"
    }
  },
  template: "<div class=\"overview\"><p class=\"overview-title\">{{title}}</p><p>{{members}}</p><p>Overview</p></div>"
});

Vue.component('flight', {
  data: function() {
    return {
      'dest' : 'Edinburgh',
      'desttime' : '0600',
      'arr' : 'Barcelona',
      'arrtime' : '0930'
    }
  },
    template: "  <div class=\"flight\"><div class=\"timeline-dot\"></div><div>"  +
    "class=\"flight-info\"><p>Flight </p><p>{{dest}} ({{desttime}})</p><p>{{arr}}({{arrtime}})</p></div></div>"
  });
