setTimeout(function () {
  window.scrollTo(0, 1);
}, 1000);
$(document).ready(function() {
  document.addEventListener("touchstart", function() {}, false);

  //set variables
  var playerTouchesThisRound = [],
    patternToMatch = [],
    round = 0,
    colorObject = ["green", "red", "yellow", "blue"]


  //cue up sounds
  var beep1 = new Audio('audio/beep1.wav');
  var beep2 = new Audio('audio/beep2.wav');
  var beep3 = new Audio('audio/beep3.wav');
  var beep4 = new Audio('audio/beep4.wav');
  var endbuzzer = new Audio('audio/wrong.wav');
  var startup = new Audio('audio/startup.wav');
  var active = {
    "status": false,
    "gameover": false
  };

  //check for player mistakes
  var didTheyLose = function(thesequence) {
    for (i = 0; i < thesequence.length; i++) {
      if (thesequence[i] != patternToMatch[i]) {
        window.navigator.vibrate(300);
        $("#green").unbind();
        $("#yellow").unbind();
        $("#red").unbind();
        $("#blue").unbind();
        lightUp('green');
        lightUp('blue');
        lightUp('yellow');
        lightUp('red');
        endbuzzer.play();
        active.gameover = true;
      }
    }
    if (thesequence.length == patternToMatch.length && active.gameover == false) {
      active.status = false;
      nextRound();
    }
  };

  //click listeners during player turn
  var playerTurn = function() {
    $('#green').unbind("click").click(function() {
      window.navigator.vibrate(20);
      lightUp('green')
      beep1.currentTime = 0;
      beep1.play();
      playerTouchesThisRound.push("green");
      didTheyLose(playerTouchesThisRound);
    });
    $('#red').unbind("click").click(function() {
      window.navigator.vibrate(20);
      lightUp('red')
      beep2.currentTime = 0;
      beep2.play();
      playerTouchesThisRound.push("red");
      didTheyLose(playerTouchesThisRound);
    });
    $('#yellow').unbind("click").click(function() {
      window.navigator.vibrate(20);
      lightUp('yellow');
      beep3.currentTime = 0;
      beep3.play();
      playerTouchesThisRound.push("yellow");
      didTheyLose(playerTouchesThisRound);
    });
    $('#blue').unbind("click").click(function() {
      window.navigator.vibrate(20);
      lightUp('blue');
      beep4.currentTime = 0;
      beep4.play();
      playerTouchesThisRound.push("blue");
      didTheyLose(playerTouchesThisRound);
    });

  };

  //make tile flash when pressed or when played by CPU
  var lightUp = function(tile) {
    $('#' + tile).addClass('flash' + tile);
    window.setTimeout(function() {
      $('#' + tile).removeClass('flash' + tile);
    }, 300);

    //sounds play at tile press or play
  };
  var playSound = function(color) {
    beep1.pause();
    beep1.currentTime = 0;
    beep2.pause();
    beep2.currentTime = 0;
    beep3.pause();
    beep3.currentTime = 0;
    beep4.pause();
    beep4.currentTime = 0;
    if (color == "green") {
      beep1.play();
    } else if (color == "red") {
      beep2.play();
    } else if (color == "yellow") {
      beep3.play();
    } else if (color == "blue") {
      beep4.play();
    }
  };

  //have cpu show player pattern to follow
  var showPattern = function(sequence) {
    //make player unable to click when it's not their turn
    $("#green").unbind();
    $("#yellow").unbind();
    $("#red").unbind();
    $("#blue").unbind();

    setTimeout(function() {
      round++;
      $('#scoreboard').html(round);
    }, 600);
    var i = 0;
    var interval = setInterval(function() {
      playSound(sequence[i]);
      lightUp(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 600);
    playerTouchesThisRound = [];

    //delays player turn until all tiles are flashed
    wait = (round + 1) * 600
    setTimeout(function() {
      playerTurn();
    }, wait);
  };

  //starts next round; adds one more tile to sequence
  var nextRound = function() {
    var nextColor = colorObject[Math.floor(Math.random() * 4)];
    if (nextColor == "green") {
      patternToMatch.push("green");
    }
    if (nextColor == "red") {
      patternToMatch.push("red");
    }
    if (nextColor == "yellow") {
      patternToMatch.push("yellow");
    }
    if (nextColor == "blue") {
      patternToMatch.push("blue");
    }
    showPattern(patternToMatch);
  };

  //starts the game
  var flashIt = function(tile) {
    $('#' + tile).addClass('flash' + tile);
    window.setTimeout(function() {
      $('#' + tile).removeClass('flash' + tile);
    }, 70);
  }
  //opening animation
  var animate = function(sequence) {
    var i = 0;
    var interval = setInterval(function() {
      flashIt(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 100);
  }

  function newRound() {
    startup.play();
    window.navigator.vibrate(2500);
    var sequence = ["green", "red", "blue", "yellow", "green", "red", "blue",
      "yellow", "green", "red", "blue", "yellow", "green", "red", "blue", "yellow",
      "green", "red", "blue", "yellow"
    ];
    animate(sequence);
  }


//start button functionalty
  $('#start-button').click(function() {
    playerTouchesThisRound = [],
      patternToMatch = [],
      round = 0,
      $('#scoreboard').html('-');
    newRound();
    active.gameover = false;
    setTimeout(function() {
      nextRound();
    }, 2500);
  });

});
