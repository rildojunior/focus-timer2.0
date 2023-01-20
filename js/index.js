import { CoffeAudio, RainAudio, ForestAudio, CampFireAudio } from './sounds.js'

import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonPlus,
  buttonMinus,
  minutesDisplay,
  secondsDisplay,
  buttonTree,
  buttonCloud,
  buttonMarket,
  buttonFire
} from './elements.js'

let minutes = Number(minutesDisplay.textContent)
let timerTimeOut

function resetControls() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  resetTimer()
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer() {
  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds == 0

    updateTimerDisplay(minutes, 0)

    if (isFinished) {
      resetControls()
      return
    }

    if (seconds <= 0) {
      seconds = 2
      --minutes
    }

    updateTimerDisplay(minutes, String(seconds - 1))

    countdown()
  }, 1000)
}

function togglePlay(audio) {
  return audio.paused ? audio.play() : audio.pause()
}

function toggleButtonState(button) {
  if (button.value == 'on') {
    button.value = 'off'
    button.style.backgroundColor = '#e1e1e6'
  } else if (button.value == 'off') {
    button.value = 'on'
    button.style.backgroundColor = '#02799d'
  }
}

buttonPlay.addEventListener('click', () => {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')

  countdown()
})

buttonPause.addEventListener('click', () => {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  clearTimeout(timerTimeOut)
})

buttonStop.addEventListener('click', () => {
  resetControls()
  resetTimer()
})

buttonPlus.addEventListener('click', () => {
  minutes = minutes + 5
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
})

buttonMinus.addEventListener('click', () => {
  let newMinutes = minutes - 5
  if (newMinutes < 0) {
    resetTimer()
    return
  }

  minutes = newMinutes
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
})

buttonTree.addEventListener('click', () => {
  toggleButtonState(buttonTree)
  togglePlay(ForestAudio)
})

buttonCloud.addEventListener('click', () => {
  toggleButtonState(buttonCloud)
  togglePlay(RainAudio)
})

buttonMarket.addEventListener('click', () => {
  toggleButtonState(buttonMarket)
  togglePlay(CoffeAudio)
})

buttonFire.addEventListener('click', () => {
  toggleButtonState(buttonFire)
  togglePlay(CampFireAudio)
})
