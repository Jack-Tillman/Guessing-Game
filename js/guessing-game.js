/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/
/*
Function to generate a random number between 1-100

function generateWinningNumber()
* returns random number 1-100 

function shuffle
*uses the fisher-yates shuffle algorithm
*takes an array as an argument, and returns an array
*shuffles an array using math.random to place elements
*returns the array shuffled in place, which means that the original array is modified, not making a new array

newGame function
*initialize and declare an object, game , each time it is called
  *game should have a playersGuess property and a pastGuesses property
  *game should have a winningNumber property, which calls generateWinningNumber
  *Methods for the game object: 
    *returns the absolute value of the difference between the playersGuess and winningNumber
    *isLower function returns true if playersGuess is lower than winningNumber, and false if not
    *playersGuessSubmission function that: 
      *takes a number as an argument and sets that as playersGuess 
      *throws an error if the number is invalid (less than 1, greater than 100, or NaN)
      *calls the function, checkGuess
    *checkGuess function 
      *returns a string value => 'You Win!' if playersGuess === winningGuess
      *returns a string value 

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
// 
// window.onkeyup = playersGuessSubmission;
// var input;
// function playersGuessSubmission(e){
//   inputTextValue = e.target.value;
//   if (e.keyCode == 13){
//     console.log("your guess is: " + inputTextValue);
//   }
// }
*/

function generateWinningNumber(){
  const winningNumber =  Math.floor(Math.random() * 100) + 1;
  return winningNumber;
}
let winningNumber;  

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


//attempt 2 at making at least something to turn in, incorporating checkGuess(), hints, a reset function, and gameover function 
//wanted to get nodeList of all the guess-box lists, then loop through the nodeList and ultimately 
//push the user's guess into each of the list items, but I couldn't get it to work.
//I wanted to ultimately repurpose everything from line 96 to line line 167 into newGame(), but I ran out of time and mental fortitude 

//store reference to the guess-box li's 
const recentGuess = document.querySelector('.guess-box');
//store reference to the .lastGuess p  to ultimately show user's last guessed number
const lastGuess = document.querySelector('.lastGuess');
//store reference to the .lowOrHigh p tag to ultimately show whether user's guess was too high or low 
const lowOrHigh = document.querySelector('.lowOrHigh');
//store reference to the submit button to control later
const submitButton = document.querySelector('.submit-button');
//store reference to the player-input input element to control later (this is needed to get user's guess)
const inputGuess = document.querySelector('.inputGuess');
//keep track of number of guesses player is on
let guessCount = 1;
//initialize resetButton to be used later
let resetButton;
/*KNOWN ISSUES: so many, but more specifically:
1) multiple features only work after the game has been reset once, including the message displaying the actual winningNumber (it will display the number as undefined the first time you play, but the actual number after reseting)
2) Neither hint nor reset button on screen work. I was planning to repurpose the functionality from checkGuess() below into the actual newGame function, but failed
3) the reset button that actually works only shows up after you lose or win, and it is just below the guessing group div for some reason
4) guessed numbers are all crammed into the first guess box as a concatenated string 
5)upon reseting the game, the two messages displayed on screen remain until the player guesses 
6) not a bug per se, but the hint system is underdeveloped and i planned to implement the actual hints (like, "Wrong guess, the number is between 20 and 48") later but ran out of time 

*/
function checkGuess() {
   //take user's guess and convert to a number 
   let playersGuess = Number(inputGuess.value);
  //for first guess, replace the first guess-box list item with You guessed: + what the player guessed
   if (guessCount === 1) {
     recentGuess.textContent = "You guessed: ";
   }
   recentGuess.textContent += playersGuess;
   //if player guesses correct, show victory text, change bg color, remove hint prompt, and end the game
   if (playersGuess === winningNumber) {
     lastGuess.textContent = "You Win!";
     lastGuess.style.backgroundColor = "green";
     lowOrHigh.textContent = "";
     setGameOver();
     //if player fails after guess 5, display failure text and end game
   } else if (guessCount === 5) {
     lastGuess.textContent = `You ran out of guesses - game over :(! The winning number was: "${winningNumber}"`;
     setGameOver();
     //if player guesses wrong on any other guess than 5, show indicator to try again, change bg to red
   } else {
     lastGuess.textContent = "Wrong guess, try again!";
     lastGuess.style.backgroundColor = "red";
     //if guess is lower than winning number, show hint
     if (playersGuess < winningNumber) {
       lowOrHigh.textContent = "Your last guess was too low!";
       //if guess is higher than winning number, show hint
     } else if (playersGuess > winningNumber) {
       lowOrHigh.textContent = "Your last guess was too high!";
     }
   }
   //after each guess, increment guess counter, clear the input form, refocus the input form, and return the playersGuess
   guessCount++;
   inputGuess.value = "";
   inputGuess.focus();
   return playersGuess;
 }
//create an event listener for the Guess! button to run checkGuess() when it is clicked 
 submitButton.addEventListener("click", checkGuess);
//disable ability to guess, ability to submit a guess, 
//create a reset button, create eventlistener for reset button to do resetGame() upon click
 function setGameOver() {
   inputGuess.disabled = true;
   submitButton.disabled = true;
   resetButton = document.createElement("button");
   resetButton.textContent = "Start new game";
   document.body.appendChild(resetButton);
   resetButton.addEventListener("click", resetGame);
 }
//reset the game 
//reset the guessCount to 1 
function resetGame(){
  guessCount = 1;
  //get node list of guess boxes, then clear them by setting their textContent to empty string
  const resetGuessBoxes = document.querySelectorAll('.recentGuess-display p li');
  for (let i = 0; i < resetGuessBoxes.length;i++){
    resetGuessBoxes[i].textContent='';
  }
  //remove the elements made by gameOver()
  resetButton.parentNode.removeChild(resetButton);
  inputGuess.disabled = false;
  submitButton.disabled = false;
  inputGuess.value = '';
  inputGuess.focus(); 
  lastGuess.style.backgroundColor='grey';
  //get a new winning number 
  winningNumber = generateWinningNumber();
};
/* this was my first attempt, following the test cases as a model. I felt pretty good up until 
the playersGuessSubmission. The method declaration syntax, arrow function syntax, and other syntax
tripped me up quite a bit, to the extent that I decided on Wednesday to basically restart and try to get
something working even if it isn't exactly correct by the test cases */
function newGame() {
  let game = {
    //initial value of playersGuess should be null
    playersGuess: null,
    //pastGuesses is an array holding all the prior guesses
    pastGuesses: [],
    winningNumber: generateWinningNumber(),
      difference: function getDifference(playersGuess, winningNumber) {
        playersGuess = this.playersGuess;
        winningNumber = this.winningNumber;
        //difference holds the absolute difference between playersGuess and winningNumber
        const difference = Math.abs(playersGuess - winningNumber);
        //return difference to use in guessCheck() and maybe other functions
        return difference;
      },
      //isLower() checks whether the playersGuess is higher or lower than the winning number, returns boolean
      isLower: function (playersGuess, winningNumber) {
        playersGuess = this.playersGuess;
        winningNumber = this.winningNumber;
        if (playersGuess < winningNumber) {
          return true;
        } else {
          return false;
        }
      }, //below is my first attempt at playersGuessSubmission as a method of newGame, but struggled bad and couldnt get it to work  
      // playersGuessSubmission() { //method declaration
      //   let subbtn = document.getElementById('submit-button');
      //   let output1 = document.getElementById('output1');
      //   subbtn.addEventListener('click', function(e){
      //     let input = document.getElementById('player-input').value;
      //     if (input == winningNumber){
      //       output1.innerHTML = `Congratulations, you guessed the correct number, which was ${winningNumber}`
      //     }else if (input < winningNumber ){
      //       output1.innerHTML = `Guess higher!`
      //     }else {
      //       output1.innerHTML = `Guess lower!`
      //     }})}
        }
    
    return game;
  };

  newGame();
  
  
  //everything after this is random attempts at various parts of the program, i left them in for posterity's sake I suppose
  
  //   const subbtn = document.getElementById('submit-button');
  //  let output1 = document.getElementById('output1');
  //  subbtn.addEventListener('click', function(e){
    //   console.log(e.target);
    //  })


/*
  //has a playersGuess and pastGuesses property
  // game.playersGuess = 'INSERT PLAYER INPUT HERE';
  // game.pastGuesses = 'INSERT PAST GUESSES HERE';
  // game.winningNumber = 'generateWinningNumber()'
  // function playersGuessSubmission(){
  //   const playersGuess = document.querySelector('input').value;
  //   console.log(playersGuess);
  //   return playersGuess;

  // }
// const testButton = document.querySelector("button");

// testButton.addEventListener("click", runTests, false);

  playersGuessSubmission: function playersGuessSubmission(numberGuess){
        numberGuess = document.querySelector('input').value;
        const playersGuess = numberGuess;
        return playersGuess;
      },



       let num = document.getElementById('player-input').value;
        playersGuess = document.querySelector('.input');
        let result = document.querySelector('#result');
        playersGuess.addEventListener('click', function () {
         console.log(playersGuess);
          result.textContent = this.value; */

          // const recentGuesses = document.querySelectorAll('.recentGuess-display p li');
// for (let i = 0; i < recentGuesses.length;i++){
  //   recentGuesses[i].textContent='';
  // }
  // let divs = document.getElementsByTagName("li");
  // let size = divs.length;
  
  // for (let i = 0; i < size;i++){
  //   let link = document.createElement("a");
  //   let id = divs[i].getAttribute("id").replace("id_", playersGuess);
    
  //   link.innerHTML = id;
  //   link.href = "" + id;
  //   divs[i].appendChild(link);
  // 