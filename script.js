const workDuration = 25 * 60;  // 25 Minuten
const breakDuration = 5 * 60;  // 5 Minuten
let timeLeft = workDuration;
let isWorkSession = true;
let timerInterval = null;
let sessionCount = 0;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const sessionCounterEl = document.getElementById("sessionCounter");
const startButton = document.getElementById("startButton");

// Sounds dynamisch erzeugen
const startSound = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
const endSound = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");

function updateDisplay() {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  minutesEl.textContent = mins;
  secondsEl.textContent = secs;
}

function playSound(audioObj) {
  audioObj.currentTime = 0;
  audioObj.play().catch(e => {
    console.warn("Audio konnte nicht abgespielt werden:", e);
  });
}

function startTimer() {
  updateDisplay();
  playSound(startSound);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      playSound(endSound);

      if (isWorkSession) {
        sessionCount++;
        sessionCounterEl.textContent = sessionCount;
        isWorkSession = false;
        timeLeft = breakDuration;
      } else {
        isWorkSession = true;
        timeLeft = workDuration;
      }

      // Automatisch nächste Phase starten
      startTimer();
    }
  }, 1000);
}

startButton.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Sounds freischalten: kurz abspielen + sofort pausieren
  startSound.play().then(() => startSound.pause());
  endSound.play().then(() => endSound.pause());

  isWorkSession = true;
  timeLeft = workDuration;
  updateDisplay();
  startTimer();
});
