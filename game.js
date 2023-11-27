const REDSOUND = new Audio("sounds/red.mp3");
const BLUESOUND = new Audio("sounds/blue.mp3");
const GREENSOUND = new Audio("sounds/green.mp3");
const YELLOWSOUND = new Audio("sounds/yellow.mp3");
const WRONGSOUND = new Audio("sounds/wrong.mp3")

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;


$(document).keypress(function() {
  if (!gameStarted) {
    // Change title on game start
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }  
});  


$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  // Add user's chosen color to userClickedPattern array
  userClickedPattern.push(userChosenColor);
  // Play sound corresponding to the clicked color
  playSound(userChosenColor);
  // Call animation
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound(WRONGSOUND);
    $("#level-title").text("Game Over 🤡 Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}


nextSequence = () => {
  userClickedPattern = [];
  // Increment the level
  level++;
  // Update the displayed level
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Call the flashButton function to make the chosen color flash
  flashButton(randomChosenColor);
  return randomChosenColor;
};    


startOver = () => {
  level = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}


flashButton = (color) => {
  // Select the button by ID and toggle a class for flashing
  $("#" + color).addClass("flash");

  // After a short delay, remove the flashing class to stop the animation
  setTimeout(() => {
    $("#" + color).removeClass("flash");
  }, 400);      
  playSound(color); // Call playSound when flashing the button
};      


animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");

  // After a short delay, remove the pressed class to revert the animation
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 200);    
};    

playSound = (color) => {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
  };