$(document).ready(function() {
  var gameOver = false,
    player1 = null,
    player2 = null,
    winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ],
    xTiles = [],
    oTiles = [],
    tilesClicked = [],
    cpuIsCurrentTurn = false,
    playerTurn = null,
    difficultyLevel = null;



  $('body').on('click touchstart', '.towel', function() {
    window.navigator.vibrate(10);
    $("#board").empty();
    $("#board").append('<div class="done"><br /> Well, we had a <br />good run</div>');
  });

  $('body').on('click ', '.another-round', function() {
    window.navigator.vibrate(10);
    location.reload();
  });

  $('body').on('click touchstart', '.beginner', function() {
    window.navigator.vibrate(10);
    difficultyLevel = "beginner";
    $("#board").empty();
    $("#board").append('<div class="game-tile" id="tile-1"></div><div class="game-tile" id="tile-2"></div><div class="game-tile" id="tile-3"></div><div class="game-tile" id="tile-4"></div><div class="game-tile" id="tile-5"></div><div class="game-tile" id="tile-6"></div><div class="game-tile" id="tile-7"></div><div class="game-tile" id="tile-8"></div><div class="game-tile" id="tile-9"></div>');
    $('#board').addClass('chalk-lines');
  });
  $('body').on('click touchstart', '.pro', function() {
    window.navigator.vibrate(10);
    difficultyLevel = "pro";
    $("#board").empty();
    $("#board").append('<div class="game-tile" id="tile-1"></div><div class="game-tile" id="tile-2"></div><div class="game-tile" id="tile-3"></div><div class="game-tile" id="tile-4"></div><div class="game-tile" id="tile-5"></div><div class="game-tile" id="tile-6"></div><div class="game-tile" id="tile-7"></div><div class="game-tile" id="tile-8"></div><div class="game-tile" id="tile-9"></div>');
    $('#board').addClass('chalk-lines');
  });
  $('body').on('click touchstart', '.pointless', function() {
    window.navigator.vibrate(10);
    difficultyLevel = "pointless";
    $("#board").empty();
    $("#board").append('<div class="game-tile" id="tile-1"></div><div class="game-tile" id="tile-2"></div><div class="game-tile" id="tile-3"></div><div class="game-tile" id="tile-4"></div><div class="game-tile" id="tile-5"></div><div class="game-tile" id="tile-6"></div><div class="game-tile" id="tile-7"></div><div class="game-tile" id="tile-8"></div><div class="game-tile" id="tile-9"></div>');
    $('#board').addClass('chalk-lines');
  });

  $('.x').on('click touchstart', function() {
    window.navigator.vibrate(10);
    playerTurn = "X";
    player1 = "X";
    $("#board").empty();
    $("#board").append('<div class ="choose-opponent"><br />Choose your <br />opponent <br /><br/></br/><span class="cpu">CPU</span><span class ="human">Human</span></div>');
  });
  $('.o').on('click touchstart', function() {
    playerTurn = "O";
    player1 = "O";
    window.navigator.vibrate(10);
    $("#board").empty();
    $("#board").append('<div class ="choose-opponent"><br />Choose your <br />opponent <br /><br/></br/><span class="cpu">CPU</span><span class ="human">Human</span></div>');
  });
  $('body').on('click touchstart', '.cpu', function() {
    player2 = "CPU";
    window.navigator.vibrate(10);
    $("#board").empty();
    $("#board").append('<div class="choose-team"><br /> Choose your <br />difficulty <br /><br/><span class="beginner">Beginner</span><br/><span class="pro">Pro</span><br/><span class="pointless">Pointless</span></div></div>');
  });
  $('body').on('click touchstart', '.human', function() {
    window.navigator.vibrate(10);
    $("#board").empty();
    $("#board").append('<div class="game-tile" id="tile-1"></div><div class="game-tile" id="tile-2"></div><div class="game-tile" id="tile-3"></div><div class="game-tile" id="tile-4"></div><div class="game-tile" id="tile-5"></div><div class="game-tile" id="tile-6"></div><div class="game-tile" id="tile-7"></div><div class="game-tile" id="tile-8"></div><div class="game-tile" id="tile-9"></div>');
    $('#board').addClass('chalk-lines');
  });

  $('body').on('click touchstart', '#tile-1', function() {
    tileClickFunction(1);
  });
  $('body').on('click touchstart', '#tile-2', function() {
    tileClickFunction(2);
  });
  $('body').on('click touchstart', '#tile-3', function() {
    tileClickFunction(3);
  });
  $('body').on('click touchstart', '#tile-4', function() {
    tileClickFunction(4);
  });
  $('body').on('click touchstart', '#tile-5', function() {
    tileClickFunction(5);
  });
  $('body').on('click touchstart', '#tile-6', function() {
    tileClickFunction(6);
  });
  $('body').on('click touchstart', '#tile-7', function() {
    tileClickFunction(7);
  });
  $('body').on('click touchstart', '#tile-8', function() {
    tileClickFunction(8);
  });
  $('body').on('click touchstart', '#tile-9', function() {
    tileClickFunction(9);
  });

  var tileClickFunction = function(tileNumber) {
if (!gameOver){
    if (tilesClicked.indexOf(tileNumber) == -1) { //make sure its not checked
      window.navigator.vibrate(10);
      if (playerTurn == "X") {
        $('<span>X</span>').appendTo("#tile-" + tileNumber).hide().fadeIn('fast'); //check it
        tilesClicked.push(tileNumber); //mark it
        xTiles.push(tileNumber);
        setTimeout(function() {
          didTheyWin(xTiles);
          //check for win/tie
          if (!gameOver) {
            if (cpuIsCurrentTurn == false) {
              if (player2 == "CPU" && player1 == "X") {
                cpuIsCurrentTurn = true;
                cpuTurn("O");
              } else {
                playerTurn = "O";
              }
            } else {
              playerTurn = "O";
              cpuIsCurrentTurn = false;
            } //next player turn
          }

        }, 200);
      } else {
        $('<span>O</span>').appendTo("#tile-" + tileNumber).hide().fadeIn('fast'); //check it
        tilesClicked.push(tileNumber); //mark it
        oTiles.push(tileNumber); //add to playerTiles
        setTimeout(function() {
          didTheyWin(oTiles); //check for win/tie
          if (!gameOver) {

            if (cpuIsCurrentTurn == false) {

              if (player2 == "CPU" && player1 == "O") {

                cpuIsCurrentTurn = true;
                cpuTurn("X");
              } else {
                playerTurn = "X";
              }
            } else {
              playerTurn = "X";
              cpuIsCurrentTurn = false;
              //next player turn
            }
          }
        }, 200);
      }
    }
}
  };



  var didTheyWin = function(playerTiles) {

    for (i = 0; i < winningCombinations.length; i++) {
      if (playerTiles.indexOf(winningCombinations[i][0]) >= 0 &&
        playerTiles.indexOf(winningCombinations[i][1]) >= 0 &&
        playerTiles.indexOf(winningCombinations[i][2]) >= 0) {
        gameOver = true;
        setTimeout(function() {
          $("#board").empty();
          $('#board').removeClass('chalk-lines');
          if (cpuIsCurrentTurn == true) {
            $("#board").append('<div class="game-over"><br/>You fought the machine<br/>and the machine won. </br/></br/><span class="another-round">Another Round</span></br/><span class="towel">Throw in the Towel</span></div>');
            return;
          } else {
            $("#board").append('<div class="game-over"><br/>Team ' + playerTurn + '<br/>wins!<br /></br/><span class="another-round">Another Round</span></br/><span class="towel">Throw in the Towel</span></div>');
            return;
          }
        }, 1500)
      }
    }
    if (tilesClicked.length == 9 && gameOver == false) {
      gameOver = true;
      setTimeout(function() {
        $("#board").empty();
        $('#board').removeClass('chalk-lines');
        $("#board").append('<div class="game-over"><br/>It comes out<br/>to a draw<br /></br/><span class="another-round">Another Round</span></br/><span class="towel">Throw in the Towel</span></div>');
        return;
      }, 1500)
    }


  };

  var cpuTurn = function(cpuSide) {

    if (cpuSide == "X") {
      cpuTiles = xTiles;
      playerTiles = oTiles;
      playerTurn = "X";
    } else {
      cpuTiles = oTiles;
      playerTiles = xTiles;
      playerTurn = "O";
    }


    switch (difficultyLevel) {
      case "beginner":
        for (i = 1; i < 10; i++) {
          if (tilesClicked.indexOf(i) == -1) {

            $('body').find('#tile-' + i).trigger('click touchstart');
            return;
          }
        }
        break;
      case "pro":
        for (i = 0; i < 8; i++) {
          if (cpuTiles.indexOf(winningCombinations[i][0]) != -1 &&
            cpuTiles.indexOf(winningCombinations[i][1]) != -1 &&
            tilesClicked.indexOf(winningCombinations[i][2]) == -1) {
            $('body').find('#tile-' + winningCombinations[i][2]).trigger('click touchstart');
            return;
          }
        }
        for (i = 0; i < 8; i++) {
          if (cpuTiles.indexOf(winningCombinations[i][0]) != -1 &&
            cpuTiles.indexOf(winningCombinations[i][2]) != -1 &&
            tilesClicked.indexOf(winningCombinations[i][1]) == -1) {
            $('body').find('#tile-' + winningCombinations[i][1]).trigger('click touchstart');
            return;
          }
        }
        for (i = 0; i < 8; i++) {
          if (cpuTiles.indexOf(winningCombinations[i][1]) != -1 &&
            cpuTiles.indexOf(winningCombinations[i][2]) != -1 &&
            tilesClicked.indexOf(winningCombinations[i][0]) == -1) {
            $('body').find('#tile-' + winningCombinations[i][0]).trigger('click touchstart');
            return;
          }
        }
        for (i = 0; i < 8; i++) {
          if (playerTiles.indexOf(winningCombinations[i][0]) != -1 &&
            playerTiles.indexOf(winningCombinations[i][1]) != -1 &&
            tilesClicked.indexOf(winningCombinations[i][2]) == -1) {
            $('body').find('#tile-' + winningCombinations[i][2]).trigger('click touchstart');
            return;
          }
        }
        for (i = 0; i < 8; i++) {
          if (playerTiles.indexOf(winningCombinations[i][0]) != -1 &&
            playerTiles.indexOf(winningCombinations[i][2]) != -1 &&
            tilesClicked.indexOf(winningCombinations[i][1]) == -1) {
            $('body').find('#tile-' + winningCombinations[i][1]).trigger('click touchstart');
            return;
          }
        }
        for (i = 0; i < 8; i++) {
          if (playerTiles.indexOf(winningCombinations[i][1]) != -1 &&
            playerTiles.indexOf(winningCombinations[i][2]) != -1 &&
            tilesClicked.indexOf(winningCombinations[i][0]) == -1) {
            $('body').find('#tile-' + winningCombinations[i][0]).trigger('click touchstart');
            return;
          }
        }
        for (i = 1; i < 10; i++) {
          if (tilesClicked.indexOf(i) == -1) {

            $('body').find('#tile-' + i).trigger('click touchstart');
            return;
          }
        }
        break;
      default:

    }
    for (i = 0; i < 8; i++) {
      if (cpuTiles.indexOf(winningCombinations[i][0]) != -1 &&
        cpuTiles.indexOf(winningCombinations[i][1]) != -1 &&
        tilesClicked.indexOf(winningCombinations[i][2]) == -1) {
        $('body').find('#tile-' + winningCombinations[i][2]).trigger('click touchstart');
        return;
      }
    }
    for (i = 0; i < 8; i++) {
      if (cpuTiles.indexOf(winningCombinations[i][0]) != -1 &&
        cpuTiles.indexOf(winningCombinations[i][2]) != -1 &&
        tilesClicked.indexOf(winningCombinations[i][1]) == -1) {
        $('body').find('#tile-' + winningCombinations[i][1]).trigger('click touchstart');
        return;
      }
    }
    for (i = 0; i < 8; i++) {
      if (cpuTiles.indexOf(winningCombinations[i][1]) != -1 &&
        cpuTiles.indexOf(winningCombinations[i][2]) != -1 &&
        tilesClicked.indexOf(winningCombinations[i][0]) == -1) {
        $('body').find('#tile-' + winningCombinations[i][0]).trigger('click touchstart');
        return;
      }
    }
    for (i = 0; i < 8; i++) {
      if (playerTiles.indexOf(winningCombinations[i][0]) != -1 &&
        playerTiles.indexOf(winningCombinations[i][1]) != -1 &&
        tilesClicked.indexOf(winningCombinations[i][2]) == -1) {
        $('body').find('#tile-' + winningCombinations[i][2]).trigger('click touchstart');
        return;
      }
    }
    for (i = 0; i < 8; i++) {
      if (playerTiles.indexOf(winningCombinations[i][0]) != -1 &&
        playerTiles.indexOf(winningCombinations[i][2]) != -1 &&
        tilesClicked.indexOf(winningCombinations[i][1]) == -1) {
        $('body').find('#tile-' + winningCombinations[i][1]).trigger('click touchstart');
        return;
      }
    }
    for (i = 0; i < 8; i++) {
      if (playerTiles.indexOf(winningCombinations[i][1]) != -1 &&
        playerTiles.indexOf(winningCombinations[i][2]) != -1 &&
        tilesClicked.indexOf(winningCombinations[i][0]) == -1) {
        $('body').find('#tile-' + winningCombinations[i][0]).trigger('click touchstart');
        return;
      }
    }
    if (playerTiles.length == 1 && [1, 2, 3, 4, 6, 7, 8, 9].indexOf(playerTiles[0]) > -1) {
      $('body').find('#tile-5').trigger('click touchstart');
      return;
    }
    if (playerTiles.length == 2 && [1, 9].indexOf(playerTiles[0]) > -1 && [1, 9].indexOf(playerTiles[1]) > -1) {
      $('body').find('#tile-4').trigger('click touchstart');
      return;
    }
    if (playerTiles.length == 2 && [3, 8].indexOf(playerTiles[0]) > -1 && [3, 8].indexOf(playerTiles[1]) > -1) {
      $('body').find('#tile-9').trigger('click touchstart');
      return;
    }
    if (playerTiles.length == 2 && [4, 9].indexOf(playerTiles[0]) > -1 && [4, 9].indexOf(playerTiles[1]) > -1) {
      $('body').find('#tile-7').trigger('click touchstart');
      return;
    }
    if (playerTiles.length == 2 && [1, 6].indexOf(playerTiles[0]) > -1 && [1, 6].indexOf(playerTiles[1]) > -1) {
      $('body').find('#tile-3').trigger('click touchstart');
      return;
    }
    if (playerTiles.length == 2 && [1, 8].indexOf(playerTiles[0]) > -1 && [1, 8].indexOf(playerTiles[1]) > -1) {
      $('body').find('#tile-7').trigger('click touchstart');
      return;
    }
    if (playerTiles.length == 2 && [6, 7].indexOf(playerTiles[0]) > -1 && [6, 7].indexOf(playerTiles[1]) > -1) {
      $('body').find('#tile-9').trigger('click touchstart');
      return;
    }
    if (playerTiles.length == 2 && [2, 9].indexOf(playerTiles[0]) > -1 && [2, 9].indexOf(playerTiles[1]) > -1) {
      $('body').find('#tile-3').trigger('click touchstart');
      return;
    }

    if (playerTiles.length == 2 && [3, 7].indexOf(playerTiles[0]) > -1 && [3, 7].indexOf(playerTiles[1]) > -1) {
      $('body').find('#tile-2').trigger('click touchstart');
      return;
    }


    for (i = 1; i < 10; i++) {
      if (tilesClicked.indexOf(i) == -1) {

        $('body').find('#tile-' + i).trigger('click touchstart');
        return;
      }
    }



  };

});
