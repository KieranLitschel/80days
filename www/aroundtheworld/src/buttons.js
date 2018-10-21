$(document).ready(function() {



  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false
    });
  });
  $('#search-flights').click(function() {
    //TODO: Call K's API
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
  $('#flight-search').click(function() {
    console.log("searching")
    var origin = $("#origin").val();
    var currency = 'USD'
    var locale = 'en-GG'

    var outboundDate = $('#outbound-date').val();
    var returnDate = $('#return-date').val();

    var originCity = $('#origin-airport').val();
    var destCity = $('#dest-airport').val();
    // parse airports
    var api = $('input[name=flightfinder]:checked').val();


      console.log("In")
      url = "http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/EUR/en-GB/" +
            originCity + '/' + destCity + "/" + outboundDate + "/''/AIzaSyCXt5F8NADgIJz_f33VlUb3WBI8o1WwgWM"
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.status == 200 && xhttp.readyState == 4) {
          alert("RESP: " + xhttp.responseText);
        } else {
          alert("STATUS: " + xhttp.status)
        }
      };
      xhttp.open("GET",url,true);
      xhttp.setRequestHeader('Access-Control-Allow-Origin', '*')

      xhttp.send();

  });
});
