var winCountElement = document.getElementById("win-count");
var currentWordElement = document.getElementById("current-word");
var guessCountElement = document.getElementById("guess-count");
var lettersGuessedElement = document.getElementById("failed-guesses");
var wrongLetterAudioElement = document.getElementById("wrong-letter");
var correctWordAudioElement = document.getElementById("correct-word");

var wordsArray = [
	"Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"
];

var randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
var allLettersGuessed = [];
const maxAttempts = 5;
var guessCount = 0;
var guessesRemaining = maxAttempts - guessCount;
var wordComplete = false;
var winCount = 0;
var prompt = "Press any key to get started!";

function renderWord() {
	var html = "";
	for(var i = 0; i < randomWord.length; i++) {
		if(allLettersGuessed.indexOf(randomWord[i]) !== -1 || randomWord[i] === " ") {
			html += randomWord[i].toUpperCase();
		} else {
			html += "_";
		}
	}
	currentWordElement.innerHTML = html;
}

function clearWordAndGuesses() {
	guessCountElement.innerHTML = maxAttempts;
	guessCount = 0;
	guessesRemaining = maxAttempts - guessCount;
	allLettersGuessed = [];
	lettersGuessedElement.innerHTML = "";
}

$(document).ready(function() {
	$('#prompt').typeIt({
	     strings: prompt,
	     speed: 30,
	     autoStart: false
	});

	$("#bio").hide();
	$("#bio").fadeIn(1500);
});


renderWord();
winCountElement.innerHTML = winCount;
guessCountElement.innerHTML = guessesRemaining;

document.onkeydown = function(e) {
	var theKey = e.key.toLowerCase();
	var theKeyCode = e.keyCode;

	if(theKeyCode >= 65 && theKeyCode <= 90 && allLettersGuessed.indexOf(theKey) === -1){
		allLettersGuessed.push(theKey);

		if(randomWord.indexOf(theKey) === -1) {
			guessCount++;
			correctWordAudioElement.currentTime = 0;
			correctWordAudioElement.pause();
			wrongLetterAudioElement.currentTime = 0;
			wrongLetterAudioElement.play();
		}

		guessesRemaining = maxAttempts - guessCount;

		if(guessesRemaining === 0) {
			clearWordAndGuesses();
			randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
		} else {
			guessCountElement.innerHTML = guessesRemaining;
		}

		var html = "";
		for(var i = 0; i < allLettersGuessed.length; i++) {
			if(randomWord.indexOf(allLettersGuessed[i]) === -1) {
				html += allLettersGuessed[i].toUpperCase();
			}
		}
		lettersGuessedElement.innerHTML = html;

		renderWord();

		var renderedWord = document.getElementById("current-word").innerHTML;
		if(renderedWord.indexOf("_") === -1) {
			wordComplete = true;
		}
	}

	if(wordComplete) {
		correctWordAudioElement.currentTime = 0;
		correctWordAudioElement.play();
		wordComplete = false;
		winCount++;
		winCountElement.innerHTML = winCount;
		clearWordAndGuesses();
		randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
		renderWord();
	}
}