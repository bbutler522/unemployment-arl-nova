$.getJSON(
  "https://api.data.arlingtonva.us/api/v2/datastreams/UNEMP-RATE/data.json?auth_key=3853456938efc09269c3d1d2fd12726ca2e11f36",
  function(data) {
    var items = [];
    var i = 0;

    // Pulls appropriate data into an array
    while (data.result.fArray[i]) {
      $.each(data.result.fArray[i], function(key, val) {
        if (key === "fStr") {
          items.push(val);
        }
      });

      i++;
    }

    // Split array into array of threes
    var list = [];
    while (items.length) {
      list.push(items.splice(0, 3));
    }

    function makeTable(container, data) {
      var table = $("<table/>").addClass("table table-hover table-sm");
      $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
          row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
        });
        table.append(row);
      });
      return container.append(table);
    }

    $(document).ready(function() {
      var cityTable = makeTable($("#unemployment"), list);
    });

    // End JSON
  }
);

// ===== Scroll to Top ====
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {
    // If page is scrolled more than 50px
    $("#return-to-top").fadeIn(200); // Fade in the arrow
  } else {
    $("#return-to-top").fadeOut(200); // Else fade out the arrow
  }
});
$("#return-to-top").click(function() {
  // When arrow is clicked
  $("body,html").animate(
    {
      scrollTop: 0 // Scroll to top of body
    },
    500
  );
});
