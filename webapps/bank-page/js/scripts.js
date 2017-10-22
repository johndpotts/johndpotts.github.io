$(document).ready(function() {

//triggers nav links on smaller screens
  responsive_menu = $('.navbar_ul');
  var get_width = $(this).width();
  $('#menu').on('click', function(e) {

    e.preventDefault;
    responsive_menu.slideToggle("500");
  });
  $(window).resize(function() {
    var get_width = $(this).width();
    if (get_width > 480 && responsive_menu.is(':hidden')) {
      responsive_menu.removeAttr('style');
    }
  });


//populates table with json data
  $.getJSON("js/data.json", function(data) {
    var arrItems = [];
    $.each(data, function(index, value) {
      arrItems.push(value);
    });
    arrItems.sort(function(a, b) {
      return b.earnings - a.earnings;
    })
    var col = [];
    for (var i = 0; i < arrItems.length; i++) {
      for (var key in arrItems[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

  //create table
    var table = document.createElement("table");

    // create header row

    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");
//slightly hackish method to get the right titles in...
      if (col[i] == "apy") {
        th.innerHTML = "Annual Percentage Yield";
      } else if (col[i] == "earnings") {
        th.innerHTML = "Est. Earnings for 1 Year*";
      } else {
        th.innerHTML = ""
      }
      tr.appendChild(th);

    }

    // add data to table
    for (var i = 0; i < arrItems.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        if (j != 0) {
          //make sure exact dollar amounts have zeros
          tabCell.innerHTML = parseFloat(Math.round(arrItems[i][col[j]] * 100) / 100).toFixed(2);
        } else {
          tabCell.innerHTML = arrItems[i][col[j]];
        }
      }
    }

//put the table in the right div
    var divContainer = document.getElementById("js-rates");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  });


// open popup
  $('[data-popup-open]').on('click', function(e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-open');
    $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

    e.preventDefault();
  });

  //close popup
  $('[data-popup-close]').on('click', function(e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-close');
    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

    e.preventDefault();
  });



//flips through tabs on news/archives section
  $('ul.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  });

  //keep copyright year updated automatically
  document.getElementById("js-copyright").innerHTML = "© " + (new Date().getFullYear()) + " URBank";



});
