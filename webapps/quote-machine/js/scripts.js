  //generate the random number to pick a quote
function randomizer()
{
    var randomNum = Math.floor(Math.random() * 10);
  return randomNum;
}

function randomQuote() {
  var num = randomizer();

  //these two arrays store the possible quotes
  var quotes = [
    "If people could put rainbows in zoos, they'd do it.",
    "Look! A trickle of water running through some dirt! I'd say our afternoon just got booked solid!",
    "Getting an inch of snow is like winning 10 cents in the lottery.",
    "God put me on this earth to accomplish a certain number of things. Right now I am so far behind that I will never die.",
    "You know, Hobbes, some days even my lucky rocket ship underpants don't help.",
    "So the secret to good self-esteem is to lower your expectations to the point where they're already met?",
    "It's a magical world, Hobbes, ol' buddy... Let's go exploring!",
    "Sometimes I think the surest sign  that intelligent life exists elsewhere in the universe is that none of  it has tried to contact us.",
    "Van Gogh would've sold more than one painting if he'd put tigers in them.",
    "I'm not dumb. I just have a command of thoroughly useless information."
  ];


  var person = ['- Hobbes, "Calvin and Hobbes"',
    '- Calvin, "Calvin and Hobbes"',
    '- Calvin, "Calvin and Hobbes"',
    '- Calvin, "Calvin and Hobbes"',
    '- Calvin, "Calvin and Hobbes"',
    '- Hobbes, "Calvin and Hobbes"',
    '- Calvin, "Calvin and Hobbes"',
    '- Calvin, "Calvin and Hobbes"',
    '- Hobbes, "Calvin and Hobbes"',
    '- Calvin, "Calvin and Hobbes"'
  ];

  $("#quote-content").text(quotes[num]); //push to content div
  $("#quote-source").text(person[num]); //push to author div
  quoteStore = quotes[num] //for twitter, global
  quoteSource = person[num] //for twitter, global
}

$(document).ready(function() {
  randomQuote(); //makes a quote load on page load
  $("#get-another-quote-button").click(function() { //another quote button
    randomQuote();
  });
});


function tquote() { //link to share on twitter
  window.open("https://twitter.com/home/?status=" + quoteStore + "-" + quoteSource)
}
