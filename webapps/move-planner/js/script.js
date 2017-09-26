
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
	var $wikiHeaderElem = $('#wikipedia-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
	var streetName = $('#street').val();
	var cityName = $('#city').val();
	$greeting.text('So, you want to live at ' + streetName +", " + cityName + '?');
	 $('.nytimes-container').append("<img class='bgimg' src='http://maps.googleapis.com/maps/api/streetview?size=600x400&location="+streetName+","+cityName+"'>");

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview 
	
    // YOUR CODE GOES HERE!
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "e8460968c4db4eee8cfc4f29dd1d4269",
  'q': cityName,
  'sort': "newest"
});
$.getJSON(url, function(data) {
    $nytHeaderElem.text('Latest New York Times articles about '+cityName+': ');
	$wikiHeaderElem.text("More About " + cityName + " on Wikipedia" +': ');	
    results = data.response.docs;

    for (var i in results) {
        var result = results[i];
        $('.article-list').append('<li class="article">'+'<a href="'+result.web_url+'">'
        +result.headline.main+'</a>'+'<p>'+result.snippet+'</p>'+'</li>');
    };

}).fail($nytHeaderElem.text("Ain't Happenin, Bruh!"));

		  var wikiAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityName + '&format=json&callback=wikiCallback';
					
		var wikiRequestTimeout = setTimeout(function(){
			$wikiElem.text("failed to get wikipedia resources");
		}, 8000);
    $.ajax({
        url: wikiAPI,
         dataType: "jsonp",
         success: function(data) {
                          var articleList = data[1];
             articleList.forEach(function(article) {
                 var url = 'http://en.wikipedia.org/wiki/' + article;
                 $wikiElem.append(
                     '<li>' +
                    '<a href="' + url + '">' + article + '</a>' +
                    '</li>'
                 );
				 clearTimeout(wikiRequestTimeout);
             });
	}});
  return false;  

};
$('#form-container').submit(loadData);



