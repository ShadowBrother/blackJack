//interface for blackJackClasses

cardStyle = ["checkered/", "oxygen/", "oxygen_white/"] ;//array of card styles
cardStyle.index = 0 ; //default card style is checkered
cardStyle.next = function(){//function to increment index to point to next card style

	this.index = (this.index + 1) % cardStyle.length ;
};

function updateCardStyle(){

	$('#deck').attr('src', 'cards/' + cardStyle[cardStyle.index] + 'back.png') ;
	$('.card').each(function(){
	//alert($(this).attr('src')) ;
	$(this).attr('src', $(this).attr('src')
	.replace(/(cards\/)\w*\/((back|\d*)\.png)/, '$1' + cardStyle[cardStyle.index] + '$2')) ;
	//alert($(this).attr('src')) ;
	});

}
//deals a card from deck to specified hand
//id : (string) html element id for hand. Either playerHand or computerHand
//hand : (Hand object) playerHand or computerHand, should be same as id
//deck : deck to deal from
function dealCard(id, hand, deck){

	//deal new card and add to hand
	var newCard = deck.dealCard() ;
	hand.addCard(newCard) ;
	//create new image element for card and append to hand
	var newCardElement = $('<img class="card" src="cards/' + cardStyle[cardStyle.index] + newCard.suit + newCard.rank +'.png"></img>') ;
	$('#' + id).append(newCardElement) ;
	newCard.element = newCardElement ;//give card an element property to keep track of image
	updateScore() ;
}

//updates player and computer scores
function updateScore(){

	$('#playerScore').html(playerHand.value()) ;
	$('#computerScore').html(computerHand.value()) ;

}

//calculates the winner

function calculateWinner(){

	cpScore = computerHand.value() ;
	plScore = playerHand.value() ;
	
	//dealer wins on ties
	if(plScore > 21 || (plScore <= cpScore && cpScore <= 21)){//player lost
	
		alert('You lose.') ;
	}
	else {//player won
	
		alert('You win!') ;
	
	}
	


}

//when player clicks hit
function hit(){

	//alert('hit') ;
	dealCard('playerHand', playerHand, deck) ;
	if(playerHand.value() > 21){

		alert('You bust!') ;
		$('#buttons').off('click', '#hit') ;
		$('#buttons').off('click', '#stay') ;//games over
	}	

}

//ends player turn, performs computer's turn
function stay(){

	$('#buttons').off('click', '#hit') ;//once player chooses to stay, can't choose to hit again
	$('#buttons').off('click', '#stay') ;//games over
	flipCard(computerHand.hand[0]) ;
	updateScore() ;
	/*implementing recursive computer hit to work with setTimeout
	while(computerHand.value() < 17){//dealer hits until 17 or higher
	
		dealCard('computerHand', computerHand, deck) ;
		updateScore() ;
	}
	
	calculateWinner() ;
	*/
	
	setTimeout(computerHit, 1000) ;
	
}

function computerHit(){

	if(computerHand.value() < 17){
	
	dealCard('computerHand', computerHand, deck) ;
	updateScore() ;
	setTimeout(computerHit, 1000) ;
	}
	else calculateWinner() ;

}

//flips over card
function flipCard(card){

	
	card.flip() ;
	if(card.faceUp) $(card.element).attr('src', 'cards/' + cardStyle[cardStyle.index] + card.suit + card.rank +'.png') ;
	else $(card.element).attr('src', 'cards/' + cardStyle[cardStyle.index] + 'back.png') ;

}

deckLayer = 0 ;//keeps track of the layer of cards on the deck
//adds deck
function addDeck(){

	for(i = 0 ; i < 52 ; i++){
			$('#deck')
			.append($('<img class="card deck" src="cards/' + cardStyle[cardStyle.index] + 'back.png"></img>')
			.css({"left" : -deckLayer/2, "top": deckLayer/10})) ;
			++deckLayer ;
		}

}