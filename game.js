alert("ATTENTION! You need to click colored square each time from first to level up. Press any key from keyboard to begin.");

// Array with button colors sequence
var buttonColors = ["red", "blue", "green", "yellow"];
// Empty array game pattern
var gamePattern = [];
// Empty array user clicked gamePattern
var userClickedPattern = [];
//Keep track wheather if game started
var started = false;
//Level variable start 0
var level = 0;

//jQuery detect when keyboard key has benn pushed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detect when any of buttons are clicked

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // When user clicks on button play sound
  playSound(userChosenColor);
  // Animated pressed
  animatePress(userChosenColor);
  //Call check ansewer after click
  checkAnswer(userClickedPattern.length - 1);
});

// Check answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    //Play sound Wrong
    playSound("wrong");
    //Add class on Game over
    $("body").addClass("game-over");
    // Change title text (h1)
    $("#level-title").text("Game over! Press any key to restart.");
    //Remove class after screened
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Start over - call function if user have wrong input
    startOver();
  }
}

// Sequence with random number
function nextSequence() {
  // Register picked color
  userClickedPattern = [];
  // Go level up than current
  level++;
  // Change text when level up
  $("#level-title").text("Level " + level);
  // Get random number
  var randomNumber = Math.floor(Math.random() * 4);
  // Select a random color from array with random number from above
  var randomChosenColor = buttonColors[randomNumber];
  // Push into array returned number
  gamePattern.push(randomChosenColor);
  // jQuery select buttons
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play sound in accordance with clicked number
  playSound(randomChosenColor);
}

//Function for play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animated press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  //remove animated press
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Start over function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
