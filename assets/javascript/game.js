
$(document).ready(function() {

	// Comapany Names

	var noLimit= generateCom ("NoLimit", "photo", "assets/images/noLimit.jpg");
	var deathRow= generateCom ("DeathRow", "photo", "assets/images/deathRow.jpg");
	var badBoy= generateCom ("BadBoy", "photo", "assets/images/badBoy.jpg");
	var cashMoney= generateCom ("CashMoney", "photo", "assets/images/cashMoney.jpg");
	var youngMoney= generateCom ("YoungMoney", "photo", "assets/images/youngMoney.jpg");
	var houston= generateCom ("Houston", "photo", "assets/images/swishahouse.jpg");
	var ruthless= generateCom ("Ruthless", "photo", "assets/images/rutheless.jpg");
		

	function generateCom (name, imageType, imageLink) {
		var com = {
			name: name,
			imageType: imageType,
			imageLink: imageLink

		}
		return com;
	}


// the variables for the game

var companies= [noLimit, deathRow, badBoy, cashMoney, youngMoney, houston, ruthless];
var gameImgArray= [];
var letters= /^[A-Za-z]+$/;
var currGame= ""
var lowGame= ""
var solution= [];
var usedLetters= [];
var numWrong= 0;
var randomNumber= 0;
var guess= "";
var displaySolution= $(".gameBoard");
var displayLetters= $("<p>");
var gameOver= "no";
var currentHangman= ""; 
var currentHangmanImage= $(".hangman");

$(displaySolution).attr("class", "usedHeader");
$(displayLetters).attr("class", "letterTracker");


// gets a image on # of incorrect attempts

for (i= 0; i <8; i++) {
	gameImgArray[i]= new Image();
	gameImgArray[i].src= "assets/images/baylor" + i + ".jpg";
}

//reset button is pressed clears board for new game

$(".resetButton").on("click", function() {
	$(".usedArea").empty();
	startGame()
});


startGame();





// when game starts it resets all values


function startGame() {

	randomNumber= Math.floor(Math.random()* companies.length);
	currGame= companies[randomNumber].name;
	lowGame= currGame.toLowerCase();
	currentHangmanImage.attr("src", gameImgArray[0].src);
	solution= [];
	usedLetters= [];
	numWrong= 0;
	guess= "";
	gameOver= "no";
	letterHeader= $("<h1>Letters Used</h1>");
	$(".usedArea").append(letterHeader);
	displayLetters.html(showUsedLetters())
	$(".usedArea").append(displayLetters);
	showUsedLetters();


	//loop for the word and variable for solution 

	for (var i = 0; i< currGame.length; i++) {
		if (currGame[i] === ""){
			solution[i] = "\xa0\xa0";
		}
		else {
			solution[i] = "_";
		}
	};
	showSolution();
};

//shows letters in alpha order

function showUsedLetters() {
	$(displayLetters).html(usedLetters.sort().join("\xa0\xa0"));

}


//displays word in progress

function showSolution() {
	if (solution.length >20) {
		$(displaySolution).attr("class", "longSolution");
	}
	else {
		$(displaySolution).attr("class", "shortSolution");
	}

	$(displaySolution).html(solution.join("\xa0"));
};


//user guess 

document.onkeyup= function(event) {
	guess= event.key;
	if (guess.match(letters)) {
		checkLetter(guess);
	}
}




// guess check on the array of used letters. Displays array in alpha order. If part of array, check, move to following thing 


function checkLetter(letter) {
	//checks: letter been guessed, if guess is part of word. If not, add to wrong guess pile. If game is done, display image 

	if (gameOver=== "no" && lowGame.indexOf(letter.toLowerCase()) == -1 && usedLetters.indexOf(letter.toUpperCase()) === -1){
		numWrong++;
		usedLetters.push(letter.toUpperCase());
		showUsedLetters();
}

else if (gameOver === "no" && usedLetters.indexOf(letter.toUpperCase()) === -1) {

	usedLetters.push(letter.toUpperCase());
	showUsedLetters();

	// if guess is part of word, update array

	for (var i = 0; i < solution.length; i++) {
		if (lowGame[i] === letter.toLowerCase()) {
			solution[i] = currGame[i];
		}

	}
}

//display solution

showSolution();

//hangman parts appear according to guesses

currentHangmanImage.attr("src", gameImgArray[numWrong].src);

//if game over, update var. If won, show "winner" image


if (numWrong == 7) {
	gameOver = "loss";
	
} 
else if (solution.indexOf("_") === -1) {
	gameOver= "win";
	currentHangmanImage.attr("src", "assets/images/teef.gif");
} 


//video

if (gameOver != "no") {
	//solution w/ letters
	for (var i= 0; i <currGame.length; i++) {
		if (currGame[i] === ""){
			solution[i] = "\xa0\xa0";
		}
		else {
			solution[i] = currGame[i];
		}
	};

showSolution ();

//you tube vid

if (companies[randomNumber].imageType == "video") {
	videoDiv= $("<iframe>");
	videoDiv.attr({
		src: companies[randomNumber].imageLink,
		width:"600",
		height: "400",
		frameborder: "0",
		allowfullscreen: ""});

$(".usedArea").append(videoDiv);
}
else {
	// if not vid, pic should be displayed
	pictureDiv= $("<img>");
	pictureDiv.attr({src: companies[randomNumber].imageLink,
		width: "200",
		height: "100"
	});
	$(".usedArea").append(pictureDiv);
}
}
};
});


















































