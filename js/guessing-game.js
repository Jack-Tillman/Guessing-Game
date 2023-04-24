/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

Function to generate a random number between 1-100

function generateWinningNumber()
* returns random number 1-100 

function shuffle
*uses the fisher-yates shuffle algorithm
*takes an array as an argument, and returns an array
*shuffles an array using math.random to place elements
*returns the array shuffled in place, which means that the original array is modified, not making a new array

newGame function
*let game;
*it returns a new game object each time it is called 
*it should have a playersGuess property and a pastGuesses property
*it should have a winningNumber property, which calls generateWinningNumber
- game object methods
*returns the absolute value of the difference between the playersGuess and winningNumber

isLower function
*returns true if playersGuess is lower than winningNumber, and false if not

playersGuessSubmission function 
*takes a number as an argument and sets that as playersGuess
*throws error if the number is invalid (less than 1, greater than 100, or not a number )
*it calls the function checkGuess

checkGuess function
* returns a string
*returns "You Win!" if playersGuess equals winningGuess
*returns "You have already guessed that number." if playersGuess is in pastGuesses
*if playersGuess isn't the winningNumber or a duplicate, add it to pastGuesses 
*returns "You Lose" if this is the players 5th guess
* returns "You\'re burning up!" if the difference between playersGuess and winningGuess is less than 10'
* 'returns "You\'re lukewarm." if the difference between playersGuess and winningGuess is less than 25'
* 'returns "You\'re a bit chilly." if the difference between playersGuess and winningGuess is less than 50'
* 'returns "You\'re ice cold!" if the difference between playersGuess and winningGuess is less than 100'

newGame function(optional)

provideHint function (optional)
*/

function generateWinningNumber(){
let winningNumber =  Math.floor(Math.random() * 100) + 1;
return winningNumber;
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }


  function newGame(){
    let game = {
      playersGuess: 'INSERT PLAYER INPUT HERE',
      pastGuesses: [],
      winningNumber: generateWinningNumber()
    };
    //has a playersGuess and pastGuesses property
    // game.playersGuess = 'INSERT PLAYER INPUT HERE';
    // game.pastGuesses = 'INSERT PAST GUESSES HERE';
    // game.winningNumber = 'generateWinningNumber()'





    return game;
  }
// const testButton = document.querySelector("button");



// testButton.addEventListener("click", runTests, false);