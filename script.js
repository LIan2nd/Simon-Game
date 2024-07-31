const buttonColours = ["red", "blue", "green", "yellow"];
const heading = $('#level-title');
const body = $('body');

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = true;

function nextSequence() {
  userClickedPattern = [];
  level++
  heading.text(`Level ${level}`)

  const randomNum = Math.floor((Math.random() * 4));

  gamePattern.push(buttonColours[randomNum]);

  $(`#${buttonColours[randomNum]}`).fadeOut(100).fadeIn(100);
  playSound(buttonColours[randomNum]);

  return gamePattern;
}

function checkAnswer(currentLevel) {
  let lastIndex = currentLevel.length - 1;
  const gameOverSound = new Audio('./sounds/wrong.mp3')

  if (currentLevel[lastIndex] === gamePattern[lastIndex]) {
    if (currentLevel.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOverSound.play();
    body.addClass('game-over');
    heading.text('Game Over, Press Any Key to Restart')

    setTimeout(() => {
      body.removeClass('game-over');
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}

$(document).on('keydown', function (e) {
  if (started) {
    nextSequence();
    started = false;
  }
})

$('.btn').on('click', function () {
  const userChosenColour = this.getAttribute('id');

  playSound(this.getAttribute('id'));
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern);

});

function playSound(soundColour) {
  const sound = new Audio(`./sounds/${soundColour}.mp3`);
  sound.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColour}`).removeClass('pressed');
  }, 100);
}