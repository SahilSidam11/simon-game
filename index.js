var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).on("keypress", function (event) {
    if( started === true ) {
        return;
    }

    started = true;
    $("body").removeClass("game-over");
    nextSequence();
});

$(".btn").click(function (event) {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    pressAnimate(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

})

function nextSequence() {
    $("#level-title").text(`Level ${level}`);

    userClickedPattern = [];

    let next = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColours[next]);
    let randomChosenColor = buttonColours[next];

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);

    level++;
}

function playSound(usedAudio) {
    var audio = new Audio("./sounds/" + usedAudio + ".mp3");
    audio.play();
}

function pressAnimate(buttonPressed) {
    $( "#" + buttonPressed ).addClass("pressed");
    
    setTimeout(function () {
        $("#" + buttonPressed).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if( userClickedPattern[currentLevel] === gamePattern[currentLevel] ) {
        console.log("Success");
        if( userClickedPattern.length === gamePattern.length ) {
            setTimeout(nextSequence, 1000);
        }
    }

    else {
        console.log("Wrong answer");
        wrongAnswer();
    }
}

function wrongAnswer() {
    $("#level-title").text("Game over. Please press any key to Restart.");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout( function () {
        $("body").removeClass("game-over");
    }, 200 );
    
    started = false;
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}