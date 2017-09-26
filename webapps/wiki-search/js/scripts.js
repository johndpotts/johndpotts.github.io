$(document).ready(function() {
  var $wikiElem = $('#wikiElem');
  
  //make search box respond on enter
  $("#searchBox").keypress(function(e) {
    if (e.which == 13) {
      $wikiElem.text("");
      var searchInput = $("#searchBox").val();
      var wikiAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
        searchInput + '&format=json&callback=wikiCallback';

//makes ajax call to wikipedia
$.ajax({
        url: wikiAPI,
        dataType: "jsonp",
        success: function(data) {
          for (i = 0; i < 6; i++) {
            var title = data[1][i];
            var contents = data[2][i];
            var link = data[3][i];
            var url = link;
            $wikiElem.append(
              '<div class="container wiki">' + "<h2><a href='" + url + "'>" + title + "</a></h2>" + "<br/>" + contents + " ..." + "<br/>" + '</div> <br/><br/>'
            );
          }
        }
      });
    }
  });
})
