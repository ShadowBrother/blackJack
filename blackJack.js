//blackJack.js
//Jesse Hoyt - jesselhoyt@gmail.com

//requires blackJackInterface.js
//requires jquery

$(document).ready(function(){

	$('#newGame').click(function(){//sets newGame button's click event
	
		//alert('New Game') ;
		$('.card').remove() ; //clear old cards
		deckLayer = 0 ; //so deck doesn't shift every game
		addDeck() ;
		
		//create new deck, shuffle it and deal hands
		deck = new Deck() ;
		deck.shuffle() ;
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
		
	}) ;
	
	$('#deck').click(function(){//clicking on deck changes card style
	
		cardStyle.next() ;
		updateCardStyle() ;
	
	}) ;

}) ;