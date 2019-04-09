var cards = document.querySelectorAll('.memory-card');
var time = document.getElementById('time');
var showStatusGame = document.getElementById("winOrLoseMessage");
var buttonStart = false;

var hoursElement = document.getElementsByClassName('.hours');
var minutesElement = document.getElementsByClassName('.minutes');
var secondsElement = document.getElementsByClassName('.seconds');

let hasFlippedCard = false;
let firstCard, secondCard;
let waitFinishShowUp = false; //flag that will not allow select the thirty card when setTimeout is in execution
var countWinGame = 0;
const numWinGame = 6;

//variables to stopWatch
var count = 0; 
var clearTime; 
var seconds = 0, minutes = 0, hours = 0; 
var clearState; 
var secs, mins, gethours;

var timer = document .getElementById("timer");
timer.innerHTML = 'Time: ' + hours + '0:' + minutes + '0:' + seconds + '0';

let totalTimeGame;
var waitUnflipAllCards;

function flipCard(){
	if(buttonStart == true){
		if (waitFinishShowUp) return;
		if (this === firstCard) return;
		this.classList.add('flip');

		if(!hasFlippedCard){
			hasFlippedCard = true;
			firstCard = this;
			return;
		}
		secondCard = this;
		checkForMatch();	
	}
}

function checkForMatch(){
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

	if(isMatch){
		disableCards();
		countWinGame += 1;
	} else {
		unflipCards();
	}
}

function disableCards(){
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

//this function only unflip the cards that aren't have a match
function unflipCards(){
	waitFinishShowUp = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 1500);
}

function unflipAllCardsAfterWinGame(){
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.classList.remove('flip');
		card.style.order = randomPos;
	});	
	activateAllCards();
}

function unflipAllCards(){
	setTimeout(() => {
		for(var i=0; i<cards.length; i++){
			cards[i].classList.remove('flip');
		}
		resetBoard();
	}, 100);
}

function resetBoard(){
	[hasFlippedCard, waitFinishShowUp] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function shuffle(){
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
};

function disableAllCards(){
	for(var i=0; i<cards.length; i++){
		cards[i].removeEventListener('click', flipCard);
	}
	resetBoard();
}

function activateAllCards(){
	cards.forEach(card => card.addEventListener('click', flipCard));
}

function startWatch() {
	if (seconds === 60){ 
		seconds = 0; minutes = minutes + 1; 
	}
	mins = (minutes < 10) ? ('0' + minutes + ': ') : (minutes + ': ');
	if ( minutes === 60 ){
		minutes = 0; hours = hours + 1;
	}
	gethours = (hours < 10) ? ('0' + hours + ': ') : (hours + ': ');
	secs = (seconds < 10) ? ('0' + seconds) : (seconds);
	// var x = document .getElementById("timer");
	timer.innerHTML = 'Time: ' + gethours + mins + secs;
	seconds++;
	clearTime = setTimeout("startWatch()", 1000);
}

function resetStopWatch(){
	seconds = 0; minutes = 0; hours = 0; count = 0;
	clearTimeout(clearTime);
	startWatch();
}

function initGame(){
	if(countWinGame < numWinGame){
		unflipAllCards();
		resetBoard();
		resetStopWatch();
		countWinGame = 0;
		activateAllCards();
		setTimeout(() => {
			shuffle();
		}, 1000);
	} else {
		unflipAllCardsAfterWinGame();
		resetBoard();
		resetStopWatch();
		shuffle();
		countWinGame = 0;
	}
}

function restartGame(){
	if(countWinGame < numWinGame){
		unflipAllCards();
		resetBoard();
		resetStopWatch();
		countWinGame = 0;
		activateAllCards();
		setTimeout(() => {
			shuffle();
		}, 1000);
	} else {
		unflipAllCardsAfterWinGame();
		resetBoard();
		shuffle();
		resetStopWatch();
		countWinGame = 0;
	}
}

function checkWinGame(){
	if(countWinGame == numWinGame){
		if(!waitFinishShowUp){
			setTimeout(() => {
				//This gonna be replaced by an modal screen
				showStatusGame.textContent = "Parabéns, você ganhou o jogo!!!";
				clearTimeout(clearTime);
				totalTimeGame = mins.toString() + secs.toString();
				alert(`Parabéns, você ganhou o jogo!!!\nO tempo total do jogo foi: ${totalTimeGame}`);
				countWinGame = 0;
			}, 150);
		}
	}
}

//This function bellow it's just for a better display of the total time
// function displayTotalTime(){
// 	if(seconds <= 60 && minutes < 0 && hours < 0){
// 		totalTimeGame = mins.toString() + secs.toString() + ' segundos';
// 		return totalTimeGame;
// 	}
// 	if(minutes <= 60 && seconds > 60 && hours < 0){
// 		totalTimeGame = mins.toString() + secs.toString() + ' minutos';
// 		return totalTimeGame;
// 	}
// 	if(hours <= 0 && minutes > 60 && seconds > 60){
// 		totalTimeGame = mins.toString() + secs.toString() + ' horas';
// 	}
// 	// totalTimeGame = mins.toString() + secs.toString();
// }

document.getElementById("buttonRestart").addEventListener("click", function(){
	restartGame();
});

document.getElementById("buttonStart").addEventListener("click", function(){
	buttonStart = true;
	initGame();
});

//FIXME: melhorar layout da Div ou exibir uma modal 
document.getElementById("checkWinGame").addEventListener('click', function(){
	checkWinGame();
});