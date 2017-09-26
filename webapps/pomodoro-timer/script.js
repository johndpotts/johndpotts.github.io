window.scrollTo(0,1);
var secondsLabel = document.getElementById('seconds'),
  minutesLabel = document.getElementById('minutes'),
  breakTimeLabel = document.getElementById('breakTime'),
  workTimeLabel = document.getElementById('workTime'),
  totalSeconds = 0,
  startWorkButton = document.getElementById('startWork'),
  startBreakButton = document.getElementById('startBreak'),
  pauseButton = document.getElementById('pause'),
  resetButton = document.getElementById('reset'),
  addWorkButton = document.getElementById('addWork'),
  addBreakButton = document.getElementById('addBreak'),
  subtractWorkButton = document.getElementById('subtractWork'),
  subtractBreakButton = document.getElementById('subtractBreak'),
  timer = null,
  workTime = 25,
  breakTime = 5,
  tic = new Audio('tic.mp3'),
  alarm = new Audio('alarm.mp3');

addWorkButton.onclick = function() {
  workTime += 1;
  workTimeLabel.innerHTML = workTime;
}
addBreakButton.onclick = function() {
  breakTime += 1;
  breakTimeLabel.innerHTML = breakTime;
}
subtractWorkButton.onclick = function() {
  if (workTime >1){
    workTime -= 1;
  workTimeLabel.innerHTML = workTime;}
}
subtractBreakButton.onclick = function() {
if (breakTime > 1){
    breakTime -= 1;
  breakTimeLabel.innerHTML = breakTime;}
}


startWorkButton.onclick = function() {
  if (!timer) {
    timer = setInterval(setWorkTime, 1000);
  }
};

startBreakButton.onclick = function() {
  if (!timer) {
    timer = setInterval(setBreakTime, 1000);
  }
};

pauseButton.onclick = function() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

resetButton.onclick = function() {
  totalSeconds = 0;
  clearInterval(timer);
  timer = null;
  secondsLabel.innerHTML = "00";
  minutesLabel.innerHTML = "00:";
};

function setWorkTime() {
  var timerOne;
  totalSeconds++;
  tic.play()
  if (totalSeconds % 60 === 0) {
    timerOne = pad(0)
  } else {
    timerOne = pad(60 - (totalSeconds % 60));
  };
  var timerTwo = pad(parseInt(workTime - (totalSeconds / 60)));

  secondsLabel.innerHTML = timerOne;
  minutesLabel.innerHTML = timerTwo + ":";
  if (timerOne == "00" && timerTwo == "00") {
    totalSeconds = 0;
    clearInterval(timer);
    timer = null;
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00:";
    alarm.play();
  }

}

function setBreakTime() {
  var timerOne;
  totalSeconds++;
  tic.play();
  if (totalSeconds % 60 === 0) {
    timerOne = pad(0)
  } else {
    timerOne = pad(60 - (totalSeconds % 60));
  };
  var timerTwo = pad(parseInt(breakTime - (totalSeconds / 60)));
  secondsLabel.innerHTML = timerOne;
  minutesLabel.innerHTML = timerTwo + ":";
  if (timerOne == "00" && timerTwo == "00") {
    totalSeconds = 0;
    clearInterval(timer);
    timer = null;
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00:";
    alarm.play();
  }
}

function pad(val) {
  var valString = String(val);
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
};
