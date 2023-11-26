const REDSOUND = new Audio("sounds/red.mp3");
const BLUESOUND = new Audio("sounds/blue.mp3");
const GREENSOUND = new Audio("sounds/green.mp3");
const YELLOWSOUND = new Audio("sounds/yellow.mp3");
const WRONGSOUND = new Audio("sounds/wrong.mp3")

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];



const playSound = (color) => {
  switch (color) {
    case "red":
      REDSOUND.play();
      break;
    case "blue":
      BLUESOUND.play();
      break;
    case "green":
      GREENSOUND.play();
      break;
    case "yellow":
      YELLOWSOUND.play();
      break;
    default:
      // If no matching color, play the "wrong" sound
      WRONGSOUND.play();
      break;
  }
};


const flashButton = (color) => {
  // Use jQuery to select the button by ID and toggle a class for flashing
  $("#" + color).addClass("flash");

  // After a short delay, remove the flashing class to stop the animation
  setTimeout(() => {
    $("#" + color).removeClass("flash");
  }, 400);
  playSound(color); // Call playSound when flashing the button
};


const nextSequence = () => {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Call the flashButton function to make the chosen color flash
  flashButton(randomChosenColor);

  return randomChosenColor;
};


const animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");

  // After a short delay, remove the pressed class to revert the animation
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
};


$(".btn").on("click", (event) => {
  let userChosenColor = $(event.target).attr("id");
  // Add user's chosen color to userClickedPattern array
  userClickedPattern.push(userChosenColor);
  // Play sound corresponding to the clicked color
  playSound(userChosenColor);
  // Call animation
  animatePress(userChosenColor);
  // Log the pattern to the console
  console.log(userClickedPattern);
});  
