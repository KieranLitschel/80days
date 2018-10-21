$(document).ready(function() {



  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false
    });
  });
  $('#flight-search').click(function() {
    var t = JSON.parse(localStorage.getItem('trip'))
    var origin = $("#origin-airport").val();
    var dest = $("#dest-airport").val();
    var date = $('#outbound-date').val();
    $.getJSON("assets/airports.json", function(json) {
      json.forEach(function(x) {
        if (x.name == origin) {
          orCode = x.code;
        } else if (x.name == dest) {
          deCode = x.code
        }
      })
      var new_flight = {"type":"flight","origin":orCode,"dest":deCode,"date":date}
      if (t.plan == null) {
        t.plan ={}
      }
      if (t.plan[date] == null)  {
        t.plan[date] = [new_flight]
      } else {
        t.plan[date].push(new_flight)
      }
      localStorage.setItem('trip',JSON.stringify(t))
      $('#flight-form').hide();
      $('#overview-wrapper').show();
      location.reload(); // this will show the info it in firebug console
    });




  });
  $('#add-visit').click(function() {
    console.log("visit pressed")
    var t = JSON.parse(localStorage.getItem('trip'))
    console.log(t)

    var date = $('#date').val()

    if (t.plan == null) {
      t.plan = {}
    }
    var place = $('#place').val();
    var time = $('#time').val();
    var new_visit = {"type":"visit","place":place,"time":time,"date":date}
    if (t.plan[date] == null) {
      t.plan[date] = [new_visit]
    } else {
      t.plan[date].push(new_visit)
    }
    localStorage.setItem('trip',JSON.stringify(t))
    $('#visit-form').hide();
    $('#overview-wrapper').show();
    console.log(vm)
    location.reload();
  });
  $('#add-accomodation').click(function() {
    console.log("accomodation pressed")
    var t = JSON.parse(localStorage.getItem('trip'))
    console.log(t)

    var date = $('#date').val()

    if (t.plan == null) {
      t.plan = {}
    }
    var place = $('#location').val();
    var time = $('#time').val();
    var new_visit = {"type":"accomodation","place":place,"time":time,"date":date}
    if (t.plan[date] == null) {
      t.plan[date] = [new_visit]
    } else {
      t.plan[date].push(new_visit)
    }
    localStorage.setItem('trip',JSON.stringify(t))
    $('#accomodation-form').hide();
    $('#overview-wrapper').show();
    location.reload(false);
  });

  $('#new_trip').click(function() {
    $('#no-content').hide();
    $('#overview-wrapper').hide();
    $('#flight-form').hide();
    $('#visit-form').hide();
    $('#hotel-form').hide();
    $("#new-trip-form").show();
  });

  $('#create-new-trip').click(function() {
    var name = $("#trip-name").val();
    console.log(name);
    var members = $("#trip-members").val();
    localStorage.setItem('trip',JSON.stringify(
                              {
                                "name":name,
                                "members":members,
                                "plan":{}
                              }));
    $('#new-trip-form').hide();
    $('#no-content').show();
    location.reload(false);

  });
});
