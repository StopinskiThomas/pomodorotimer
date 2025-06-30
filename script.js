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
const startSound = document.getElementById("startSound");
const endSound = document.getElementById("endSound");

function updateDisplay() {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  minutesEl.textContent = mins;
  secondsEl.textContent = secs;
}

function playSound(audioEl) {
  audioEl.currentTime = 0;
  audioEl.play();
}

function startTimer() {
  playSound(startSound);
  updateDisplay();

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
  isWorkSession = true;
  timeLeft = workDuration;
  updateDisplay();
  startTimer();
});
