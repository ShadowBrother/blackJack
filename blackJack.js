$(document).ready(function(){

	$('#newGame').click(function(){
	
		//alert('New Game') ;
		$('.card').remove() ; //clear old cards
		deckLayer = 0 ; //so deck doesn't shift every game
		addDeck() ;
		num = Math.random() ;
		
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
		else if(computerHand.value() === 21){
			alert('Computer has Black Jack. You lose.') ;
			$('#buttons').off('click', '#hit') ;
			$('#buttons').off('click', '#stay') ;//games over
		}
		else{
			$('#buttons').off('click', '#hit') ;//remove click handlers if they are still there
			$('#buttons').off('click', '#stay') ;//to prevent multiple bindings
			$('#buttons').on('click','#hit', hit) ;
			$('#buttons').on('click', '#stay', stay) ;
		}
		
	}) ;
	
	$('#deck').click(function(){
	
		cardStyle.next() ;
		updateCardStyle() ;
	
	}) ;

}) ;