//blackJack.js
//Jesse Hoyt - jesselhoyt@gmail.com

//requires blackJackInterface.js
//requires jquery

$(document).ready(function(){

	$('#newGame').click(function(){//sets newGame button's click event
	
		//alert('New Game') ;
		$('.card').remove() ; //clear old cards
		
		wins = 0 ;
		losses = 0 ;
		$('#wins').html(wins) ;
		$('#losses').html(losses);
		
		deckLayer = 0 ; //so deck doesn't shift every game
		
		
		//create new deck, shuffle it and deal hands
		deck = new Deck(false) ;
		addDeck(deck) ;
				
		newHand();
	
		
	}) ;
	
	$('#newHand').click(newHand);
	
	$('#deck').click(function(){//clicking on deck changes card style
	
		cardStyle.next() ;
		updateCardStyle() ;
	
	}) ;

}) ;