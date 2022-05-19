/*

	Yahtze Lite Program
	Allow player to roll 5 dice 3 times to get a large straight, which is
	1,2,3,4,5 or 2,3,4,5,6 
	Before each roll, the player can keep some die and roll only the rest.
	
	
*/
// ----- NEW VARS---
// added new var win
var win = false;

// variables used in program
 var numberDice = 5;
 var keeper = new Array(numberDice);
 var dieValue = new Array(numberDice);
 
 // current number of rolls by player
 var rollNumber = 0;
  
// variables used to refer to page elements
 var dieImages = new Array(numberDice);    // roll die img  
 var messages;                             // "messages" paragraph
 var gameOverMessage;                      // "gameOverMessage" paragraph
 var playButton;                           // Play button
 var rollButton;                           // Roll button
 var diceRollingAudio 					   // audio clip for dice
 
 // TO DO: complete this function
 // ================================= 
 // starts a new game when click Play
 function startGame() 
 {
	 win = false;
	 console.log("Entered startGame()");

	 document.getElementById('gameStateMessage').innerHTML = "If a die is kept, it is not rolled. (Keeper) dice will stay the value they are at";
	 document.getElementById('gameStateMessage').style.color = "blue";
	 
	 // initialize number of rolls; incremented in rollDicesdfsdf
	 rollNumber = 0;
	 // prepare the GUI
	 rollButton.disabled = false; // enable roll button
	 playButton.disabled = true; // game already started playing

	 for ( var i = 0; i < numberDice; ++i ) { 
		keeper[i].disabled = false;
	}

	 // roll the dice to start the game
	rollDice();

 } // end function startGame

 
 // TO DO: complete this function
 // ==========================================================
 // roll the dice
 // this is called by startGame and it is the Roll button event listener
 function rollDice() 
 {
	console.log("rollDice: entered");

	// roll the dice
	// set each die with dieValue[ i ] = Math.floor(1 + Math.random() * 6);
	// for testing: (avoid random input at first)
	// set dice values to specific values. Here is an example.
	// we would ignore the keeper info for this testing
	if(rollNumber == 0)
	{
		//roll for every die at start
		var sum = 0;
		for (var i = 0; i < numberDice; ++i) {
			dieValue [ i ] = Math.floor(1 + Math.random() * 6);
			console.log("rolled die #: " + i + "\ndieValue: " + dieValue[i]);
			sum++;
		}
		console.log("total die rolled:" + sum);

	} else {

		var sum = 0;
		for ( var i = 0; i < numberDice; ++i ) {
			// if the keeper button isn't disabled, we roll the die
			// at the same index. 
			if (keeper[ i ].disabled == false)
			{
				dieValue[ i ] = Math.floor(1 + Math.random() * 6);
				console.log("rolled die #: " + i + "\ndieValue: " + dieValue[i]);
				sum++;
			}
		}
		console.log("total die rolled:" + sum);
			
	}

	

	// modify the messages innerHTML based on the results
	// there are 3 options: win, lose, keep rolling
	// AND take appropriate action

	 

	// increment the number times dice rolled
	rollNumber = rollNumber + 1;
	console.log("number of rolls: " + rollNumber);
	/*
	Disable the roll and all keeper buttons
	after the max number of rolls have 
	been reached, end of game.
	*/
	if(rollNumber >= 3)
	{
		rollButton.disabled = true;
		for ( var i = 0; i < numberDice; ++i ) { 
			keeper[i].disabled = true;
		}

		// set play button to be on
		playButton.disabled = false;
		gameOver();

	// if less than the max number of rolls, set all keep buttons active
	} else {

		for ( var i = 0; i < numberDice; ++i ) { 
			keeper[i].disabled = false;
			keeper[i].value = "keep?"
			keeper[i].style.background = "purple";
		}
	}

	// play dice rolling sound 
	// and this event "ended" calls showDice (set up in start())
	// (uncomment out when ready to test)
	console.log("rollDice: play audio");
	diceRollingAudio.play(); 
	

	//----- checkLargeStraight() --- //
	if (checkLargeStraight == true)
	{
		win = true;
		gameOver();
	} else if (rollNumber >= 3){
		win = false;
		gameOver();
	}
	// lose - no large straight after 3 rolls 

	
 } // end function rollDice

 
 // TO DO: complete this function
 // =========================== 
 // check for a large straight
 // 1,2,3,4,5  and ss2 to 2,3,4,5,6
 // Use sort array method 
 // Tip: don't rearrange the dice!
 
function checkLargeStraight() {
	
	console.log("checkLargeStraight: entered");
	
	// variables for 2 possible large straights all initialized to true
	// ss1 corresponds to 1,2,3,4,5  and ss2 to 2,3,4,5,6
	let ss1 = [1,2,3,4,5];
	let ss2 = [2,3,4,5,6];
	
	
	// copy values so original not changed
	var copyOfDice = new Array (numberDice);

	// ! LEARNING MOMENT ! 
	// I used to have copyOfDice = dieValue (copying it) but
	// when I sorted copyOfDie, it would sort the dieValues.
	// I learned that I made copyOfDice a ref to the same object,
	// so I changed it to the statement below
	copyOfDice = dieValue.slice();
	console.log("dies displyed above: " + dieValue);

	copyOfDice.sort(compareIntegers);
	console.log("copy of array but sorted: " + copyOfDice)
	
	
	// check if there is a small straight
	// values are 1,2,3,4,5 or 2,3,4,5,6
	var ss1Combination = true;
	var ss2Combination = true;

	for (var i = 0; i < copyOfDice.length; i++)
	{
		if(copyOfDice[i] != ss1[i]) {
			ss1Combination = false;
		} 

		if(copyOfDice[ i ] != ss2[i]){
			ss2Combination = false;
		}
	}
	console.log("ss1? " + ss1Combination);
	console.log("ss2? " + ss2Combination);

	if(ss1 || ss2){
		return true;
	} else {
		return false;
	}
	// return result
	// true is winner and false is not winner (lose or continue)
}

// TO DO: complete this function
// ====================================
// send game over message using a special font and/or color
// reset the Play and Roll buttons
// (no need to reset the keepers; player might want to see current state)
function gameOver() {
	
	console.log("gameOver: entered");
	playButton.disabled = false;
	rollButton.disabled = true;
	
	if(win == true){
		document.getElementById('gameStateMessage').innerHTML = "CONGRATS YOU WON! WOOOO. Press 'play' to start again";
		document.getElementById('gameStateMessage').style.color = "green";

	} else {
		document.getElementById('gameStateMessage').innerHTML = "womp womp, you lost. Press 'play' to start again";
		document.getElementById('gameStateMessage').style.color = "red";
	}

	
}
 
 
 // No changes needed to this function
 // ============================ 
 // comparison function for use with sort
function compareIntegers( value1, value2 )        
{                                                 
   return parseInt( value1 ) - parseInt( value2 );
} // end function compareIntegers    



//  No changes needed to this function
 // ============================ 
 // display rolled dice
 function showDice()
 {
	 console.log("showDice: entered");
	 for ( var i = 0; i < numberDice; ++i ) {
		setImage( dieImages[ i ], dieValue[ i ] ); 
	}
	 
 } // end function showDice

 
 // No changes needed to this function
 // ============================ 
 // set image source for a die
 function setImage( dieImages, dieValue ) 
 {
	if ( isFinite( dieValue ) )
	   dieImages.src = "die" + dieValue + ".png";
	else
	   dieImages.src = "blank.png";
 } // end function setImage

 
 // No changes needed to this function
 // updates the keeper buttons, nothing else adjusted
 function updateKeeper(){
	 console.log("updateKeeper: disabled? =",this.disabled);
	 if(rollNumber >= 1) {
		this.disabled = true;
		this.style.background = "lavender";
		this.value = "keeper";
	 };
}

 
 // No changes needed to this function - Be sure to understand this code. 
 // ================================ 
 // load event -- event handler
 // get page elements to interact with and register event listeners 
 function start()
 {
	 console.log("start: entered");
	
	// page elements and event listeners associated with them
	playButton = document.getElementById( "playButton" );
	playButton.addEventListener( "click", startGame, false );
	
	rollButton = document.getElementById( "rollButton" );
	rollButton.addEventListener( "click", rollDice, false );
	
	diceRollingAudio = document.getElementById( "diceRollingAudio" );
	// once audio ended, show dice
	diceRollingAudio.addEventListener( "ended", showDice, false );
	
	messages = document.getElementById( "messages" ); 
	gameOverMessage = document.getElementById( "gameOverMessage");
	 
	for ( var i = 0; i < numberDice; ++i ) {
      dieImages[ i ] = document.getElementById( "die" + (i + 1) );
    };
	
	// prepare the GUI
	rollButton.disabled = true; // disable rollButton
	playButton.disabled = false;  // enable play button
	
	// set image to blank before games start
	for ( var i = 0; i < numberDice; ++i ) {
		setImage( dieImages[ i ] ); 
	};
	 
	 // extract page element for keeper buttons
	 // identify event handler
	 // set disabled flag to roll all dice
	/* My own notes:
		Each object in the keeper[] array is the keeper button
		When the program starts, every keeper is active
		When a keeper button is clicked, it calls updateKeeper()
	*/
	for ( var i = 0; i < numberDice; ++i ) { 
		keeper[i] = document.getElementById( "keeper" + (i + 1));
		keeper[i].disabled = true;
		keeper[i].style.color = "white";
		keeper[i].style.background = "purple"
		keeper[i].addEventListener( "click", updateKeeper);	
	}
	 
	
 } // end function start

window.addEventListener( "load", start, false );
      

 