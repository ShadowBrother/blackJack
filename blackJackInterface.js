//interface for blackJackClasses
//Jesse Hoyt - jesselhoyt@gmail.com

//requires blackJackClasses.js
//requires Jquery


cardStyle = ["checkered/", "oxygen/", "oxygen_white/"] ;//array of card styles
Array.prototype.index = 0 ; //default card style is checkered
Array.prototype.next = function(){//function to increment index to point to next card style

	this.index = (this.index + 1) % this.length ;
};
Array.prototype.previous = function(){//function to decrement index to point to previous card style

	if(this.index === 0) this.index = this.length ;
	else this.index -= 1 ;
};

function updateCardStyle(){//updates cardstyle of all cards

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
//deck : (Deck object) deck to deal from
function dealCard(id, hand, deck){

	
	//deal new card and add to hand
	try{
		var newCard = deck.dealCard() ;
	}
	catch(e){
		if(e.name == "EmptyDeck"){//deck is empty
			alert(e.message + " Adding new deck.");
			addDeck(deck) ;
			var newCard = deck.dealCard() ;
		}
		else{
			alert(e.name + ": " + e.message)
		}
	}
	
	hand.addCard(newCard) ;
	//create new image element for card and append to hand
	var newCardElement = $('<img class="card" src="cards/' + cardStyle[cardStyle.index] + newCard.suit + newCard.rank +'.png"></img>') ;
	$('#' + id).append(newCardElement) ;
	newCard.element = newCardElement ;//give card an element property to keep track of image
	updateScore() ;
	
	//remove card from deck
	$('#deck .card:last').remove() ;
	--deckLayer ;
}

//updates player and computer scores
function updateScore(){

	//alert("updateScore") ;
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
		addLoss() ;
	}
	else {//player won
	
		alert('You win!') ;
		addWin() ;
	
	}
}

//add a win to record
function addWin(){
	$('#wins').html(++wins) ;
}

//add a loss to record
function addLoss(){
	$('#losses').html(++losses) ;
}

//New Hand
function newHand(){

	//alert("New Hand") ;
	$('.hand .card').remove();//remove cards from last hand
	
	playerHand = new Hand() ;
	computerHand = new Hand() ;
	dealCard('playerHand', playerHand, deck) ;
	dealCard('playerHand', playerHand, deck) ;
	dealCard('computerHand', computerHand, deck) ;
	flipCard(computerHand.hand[0]) ;//first card to dealer face down
	dealCard('computerHand', computerHand, deck) ;
	updateScore() ;
	if(playerHand.value() === 21){
		alert('Black Jack! You Win!') ;
		addWin() ;
		$('#buttons').off('click', '#hit') ;
		$('#buttons').off('click', '#stay') ;//games over
	}
	else {
		computerHand.hand[0].flip();//flip card invisibly to check for black Jack
		if(computerHand.value() === 21){
			computerHand.hand[0].flip() ;//flip card back so flipCard functions properly
			flipCard(computerHand.hand[0]) ;//visibly flip card so player can see black jack
			updateScore() ;
			alert('Computer has Black Jack. You lose.') ;
			addLoss() ;
			$('#buttons').off('click', '#hit') ;
			$('#buttons').off('click', '#stay') ;//games over
		}
		else{//neither has black Jack, game resumes
			computerHand.hand[0].flip();//fix flipped computer card
			$('#buttons').off('click', '#hit') ;//remove click handlers if they are still there
			$('#buttons').off('click', '#stay') ;//to prevent multiple bindings
			$('#buttons').on('click','#hit', hit) ;
			$('#buttons').on('click', '#stay', stay) ;
		}
	}
}

//when player clicks hit
function hit(){

	//alert('hit') ;
	
	dealCard('playerHand', playerHand, deck) ;
		
	if(playerHand.value() > 21){

		alert('You bust!') ;
		addLoss() ;
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

//recursive function to perform computer's hits
function computerHit(){

	if(computerHand.value() < 17){//computer must hit if score is less than 17
	
	dealCard('computerHand', computerHand, deck) ;
	updateScore() ;
	setTimeout(computerHit, 1000) ;
	}
	else calculateWinner() ;

}

//flips over card
//card : (Card object) card to flip
function flipCard(card){

	//alert("flipping card") ;
	card.flip() ;
	
	//update image for card
	
	if(card.faceUp) $(card.element).attr('src', 'cards/' + cardStyle[cardStyle.index] + card.suit + card.rank +'.png') ;
	else $(card.element).attr('src', 'cards/' + cardStyle[cardStyle.index] + 'back.png') ;
	
}

deckLayer = 0 ;//keeps track of the layer of cards on the deck
//adds deck
//deck : (Deck object) deck to add cards to
function addDeck(deck){

	deck.addDeck() ;
	deck.shuffle() ;
	for(i = 0 ; i < 52 ; i++){
			$('#deck')
			.append($('<img class="card deck" src="cards/' + cardStyle[cardStyle.index] + 'back.png"></img>')
			.css({"left" : -deckLayer/2, "top": deckLayer/10})) ;
			++deckLayer ;
			
		}
		

}