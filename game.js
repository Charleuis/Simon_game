let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function () {
  //this is for the single press by the user and it will store in an array userClickedPattern.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1); //This function is called every time the button is pressed because to check the answer is wrong or not, if yes on the spot to show game over
});

function nextSequence() {
  //This is a function which is for randomly creating patterns of color button press and store in an array called gamepattern
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}
function playSound(color) {
  //This function is used for the playing of the sound from the sounds folder
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentKey) {
  //This function is for the button press of the user animation
  let activeButoon = $("#" + currentKey);
  activeButoon.addClass("pressed");
  setTimeout(function () {
    activeButoon.removeClass("pressed");
  }, 100);
}

$(document).on("keypress", function () {
  //This is for the initial starting of the game on the press of any were on the keyboard
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  //This is the fucntion for checking the answer gamepattern and userclickedpattern on the basis currentLevel.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  //this is for restaring the game for the game over
  level = 0;
  gamePattern = [];
  started = false;
}
