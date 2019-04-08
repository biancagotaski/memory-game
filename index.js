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

function unflipCards(){
	waitFinishShowUp = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 1500);
}

//VERIFICAR SE ISSO SERÁ ULTIL NO FIXME DE UNFLIP CARD NO MOMENTO EM QUE VIRO APENAS DUAS OU 4 CARTAS PARA REINICIAR O JOGO
// function unflipAllCards(){
// 	setTimeout(() => {
// 		for(var i=0; i<cards.length; i++){
// 			cards[i].classList.remove('flip');
// 		}
// 		resetBoard();
// 	}, 1500);
// }

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
	for(var i=0; i<cards.length; i++){
		cards[i].addEventListener('click', flipCard);
	}
	shuffle();
}

//FIXME: Está mexendo com o layout e não deveria fazer isso
document.getElementById("buttonRestart").addEventListener("click", function(){
	console.log('I was clicked  ------- RESTART GAME');
	// for(var i=0; i<cards.length; i++){
	// 	cards[i].classList.remove('flip');
	// }
	// shuffle();
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.classList.remove('flip');
		card.style.order = randomPos;
	});	
	cards.forEach(card => card.addEventListener('click', flipCard));
	resetBoard();
	resetStopWatch();
});

document.getElementById("buttonStart").addEventListener("click", function(){
	buttonStart = true;
	initGame();
	resetBoard();
	resetStopWatch();
});

//FIXME: melhorar layout da Div ou exibir uma modal 
//clearTimeout(clearTime); ->> inserir tempo total do jogo na modal
//TÁ DANDO XABU
document.getElementById("checkWinGame").addEventListener('click', function(){
	if(countWinGame == numWinGame){
		if(!waitFinishShowUp){
			setTimeout(() => {
				//essa linha abaixo não está funcionando
				showStatusGame.textContent = "Parabéns, você ganhou o jogo!!!";
				clearTimeout(clearTime);
				alert("Parabéns, você ganhou o jogo!!!");
				countWinGame = 0;
			}, 150);
		}
	}
});