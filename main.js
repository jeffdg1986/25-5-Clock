class TimerSet {
  constructor(sessionDuration, breakDuration, timeLeft){
    this.sessionDuration = sessionDuration;
    this.breakDuration = breakDuration;
    this.timeLeft = timeLeft;
    this.resetTimer();
    this.updateTimer();
  }

  resetTimer(){
    this.sessionDuration = 25;
    this.breakDuration = 5;
    sessionLength.innerText = 25;
    breakLength.innerText = 5;
    clearInterval(y);
    isTimerRunning = 'no';
    timerType=null
    document.getElementById('timer-label').innerText = "Session";
    document.getElementById('beep').load();
  }

  startTimer(){
    if(timerType == null || timerType == 'session'){
      timerType='session';
      document.getElementById('timer-label').innerText = "Session";
  }
    else if(timerType == 'snooze'){
      timerType = 'snooze'
      document.getElementById('timer-label').innerText = "Break";
  }
    let minutes = this.timeLeft.innerText.split(":")[0];
    let seconds = this.timeLeft.innerText.split(":")[1];
    y= setInterval(countdownSD,1000);
    function countdownSD(){
      if(minutes.toString().length <2){
        minutes = "0"+minutes;
      }
      if(seconds.toString().length <2){
        seconds = "0"+seconds;
      }
      if(seconds == "00" && minutes !=0){
        document.getElementById('time-left').innerText = `${minutes}:${seconds}`;
        minutes--;
        seconds = 59;
      }
      else if(seconds > '00'){
        document.getElementById('time-left').innerText = `${minutes}:${seconds}`;
        seconds--;
      }
      else if(seconds == '00' && minutes == '00'){
        document.getElementById('time-left').innerText = `${minutes}:${seconds}`
        document.getElementById('beep').play();
          if(timerType == 'session'){
            minutes = lazyClock.breakDuration;
            seconds = '00';
            timerType = 'snooze';
            document.getElementById('timer-label').innerText = "Break";
          }
          else if (timerType == 'snooze'){
            minutes = lazyClock.sessionDuration;
            seconds = '00';
            timerType = 'session';
            document.getElementById('timer-label').innerText = "Session";
          }
      }
    }
  }
  incrementSessionDuration(){
    if(this.sessionDuration == 60){return}
    this.sessionDuration = this.sessionDuration +1;
    sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
  }

  incrementBreakDuration(){
    if(this.breakDuration == 60){return}
    this.breakDuration = this.breakDuration +1;
    breakLength.innerText = parseInt(breakLength.innerText) +1;
  }

  decrementSessionDuration(){
    if(this.sessionDuration == 1){return}
    this.sessionDuration = this.sessionDuration -1;
    sessionLength.innerText = parseInt(sessionLength.innerText) -1;
  }

  decrementBreakDuration(){
    if(this.breakDuration == 1){return}
    this.breakDuration = this.breakDuration -1;
    breakLength.innerText = parseInt(breakLength.innerText) -1;
  }

  updateTimer(){
    let minutes = parseInt(this.sessionDuration);
    if(minutes.toString().length <2){
      minutes = "0"+minutes;
    }
    this.timeLeft.innerText = `${minutes}:${'00'}`
  }

}

var timerType=null;
var y;
var isTimerRunning = 'no';
const audio = document.querySelector('audio');
const sessionLength = document.getElementById('session-length');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');
const breakLength = document.getElementById('break-length');
const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const reset = document.getElementById('reset');
const timeLeft = document.getElementById('time-left');
const start = document.getElementById('start_stop');
const lazyClock = new TimerSet(sessionLength, breakLength, timeLeft);

start.addEventListener('click', () => {
    if(isTimerRunning == 'no'){
      lazyClock.startTimer();
      isTimerRunning = 'yes';
//  console.log("is the timer running?",isTimerRunning);
  }
  else if(isTimerRunning == 'yes'){
    clearInterval(y);
    isTimerRunning = 'no';
//  console.log("is the timer running?",isTimerRunning);
  }
})

sessionDecrement.addEventListener('click', () => {
//  console.log("session decrement pressed")
  if(isTimerRunning =='no'){
    lazyClock.decrementSessionDuration();
    lazyClock.updateTimer();
  }
else return
})
sessionIncrement.addEventListener('click', () => {
//  console.log("session increment pressed")
  if(isTimerRunning =='no'){
  lazyClock.incrementSessionDuration();
  lazyClock.updateTimer();
  }
  else return
})
breakDecrement.addEventListener('click', () => {
//  console.log("break decrement pressed")
  if(isTimerRunning =='no'){
  lazyClock.decrementBreakDuration();
  // don't need to update break timer in timeLeft. It updates in breakDuration
}
else return
})
breakIncrement.addEventListener('click', () => {
//  console.log("break increment pressed")
  if(isTimerRunning == 'no'){
  lazyClock.incrementBreakDuration();
}
})

reset.addEventListener('click', () => {
//  console.log("reset button pressed");
  lazyClock.resetTimer();
  lazyClock.updateTimer();
})
