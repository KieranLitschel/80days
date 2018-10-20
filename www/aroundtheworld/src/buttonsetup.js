
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
    if (t.plan == null) {
      t.plan = []
    }

    var date = $('#date').val()

    if (t.plan == null) {
      t.plan = []
    }
    var place = $('#place').val();
    var time = $('#time').val();

    var new_visit = {
                      date.id:{
                              "type":"visit",
                              "place":place,
                              "time":time
                            }
                        }

    t.plan.push(new_visit)
    localStorage.setItem('trip',JSON.stringify(t))
    $('#visit-form').hide();
    $('#overview-wrapper').show();
  });
});
