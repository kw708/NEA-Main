/*let [ seconds, minutes , hours ]= [ 0,0,0];
let timeRef = document.querySelector("#timer-display");
let int = null;


document.getElementById("start-timer").addEventListener("click",() =>{
    if (int !== null){
        clearInterval(int);
    }
    int = setInterval(displayTimer, 1000);
    
});
   

document.getElementById("pause-timer").addEventListener("click", ()=> {
        clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click",() =>{
    clearInterval(int);
    [seconds,minutes,hours] = [0,0,0];
    timeRef.innerHTML = "00 : 00: 00"
});


function displayTimer(){
    seconds++;
    if(seconds == 60){
        seconds = 0;
        minutes++;
        if (minutes == 60){
            hours++;
        }
    }
    let h = hours < 10 ? "0" + hours: hours;
    let m = minutes < 10 ? "0" + minutes: minutes;
    let s = seconds < 10 ? "0" + seconds: seconds;

    timeRef.innerHTML = `${h}  : ${m} : ${s}`;
}*/

/*Collects user data and starts the timer*/
let countdowntime;
let x;

function startTimer(){
    const userInput = document.getElementById("time").value;

    if (!userInput) {
        alert("Please ennter a time");
        return;
    }
    countdowntime = new Date().getTime();
    if (x) {
        clearInterval(x);
    }
/*starts the timer and updates the webpage*/
    x = setInterval(function(){

        const now = new Date().getTime();
        const distance = countdowntime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);


        document.getElementById("hours").innerHTML = hours ;
        document.getElementById("minutes").innerHTML = minutes ;
        document.getElementById("seconds").innerHTML = seconds ;

/*Checks that the timer ends and resets the timer*/
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
        }
    }, 1000);
}
/*actual pomodoro timer*/
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
/*sets defualt time at 25 minutes*/
let startTime = 25 * 60; // 25 minutes in seconds
let timerInterval;
let isRunning = false;

function updateDisplay() {
  const hours = Math.floor(startTime / 3600);
  const minutes = Math.floor((startTime % 3600) / 60);
  const seconds = startTime % 60;

  timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
/*It checks that timer has ended and sends an alert*/
function startTimer() {
  if (!isRunning) {
    timerInterval = setInterval(() => {
      startTime--;
      updateDisplay();
      if (startTime < 0) {
        clearInterval(timerInterval);
        alert("Time's up!");
      }
    }, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 25 * 60; // Reset to 25 minutes
  updateDisplay();
  isRunning = false;
}

updateDisplay(); // Initial display
/*Listens for when the buttons are clicked*/
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);