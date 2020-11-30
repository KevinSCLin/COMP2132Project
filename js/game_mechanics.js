/**
 * Dice game
 * 
 * @author Kevin Lin
 * @version 2020
 */

/**
 * Global Variables
 */
let playerDice1ChangeTimes
let playerDice2ChangeTimes
let npcPlayerDice1ChangeTimes
let npcPlayerDice2ChangeTimes
let playerDice1Value;
let playerDice2Value;
let npcDice1Value;
let npcDice2Value;
let isResetGame = false;
let currentRound = 1;

 /**
  * a Player object.
  */
 class Player {
     constructor(name) {
         this.score = 0;
         this.name = name;
     }

     returnScore() {
         return this.score;
     }
 }

 /**
  * Returns the score base on the value of two dice
  * 
  * @param {Number} dice1 the value on dice1
  * @param {Number} dice2 the value on dice2
  */
 function determineScore(dice1, dice2) {
    if (dice1 === 1 && dice2 === 1) {
        return 0;
    }
    else if (dice1 === dice2) {
        return dice1 * dice2;
    }
    else {
        return dice1 + dice2;
    }
 }

 /**
  * Changes die image.
  * 
  * @param {String} imageID the element ID to change image
  * @param {Number} diceValue the value of the dice
  */
 function swapDiceImage(imageID, diceValue) {
     document.getElementById(imageID).src = `img\\${diceValue}.png`;
    //  console.log(`Called, dice value: ${diceValue}`);
 }


  /**
  * Recursively rerolls Player die 1 until roll count reaches zero.
  * 
  * @param {Number} rollNum the number of rolls to perform
  */
 function player1Dice1Roll(rollNum){
    setTimeout(function() {
        playerDice1Value = parseInt(1 + Math.random() * 6);
        swapDiceImage("playerDice1", playerDice1Value);
        if (rollNum > 0) {
            player1Dice1Roll(--rollNum);
        }
    }, 300);
 }

 /**
  * Recursively rerolls Player die 2 until roll count reaches zero.
  * 
  * @param {Number} rollNum the number of rolls to perform
  */
 function player1Dice2Roll(rollNum){
    setTimeout(function() {
        playerDice2Value = parseInt(1 + Math.random() * 6);
        swapDiceImage("playerDice2", playerDice2Value);
        if (rollNum > 0) {
            player1Dice2Roll(--rollNum);
        }
    }, 300);
 }


 /**
  * Recursively rerolls NPC die 1 until roll count reaches zero.
  * 
  * @param {Number} rollNum the number of rolls to perform
  */
 function npc1Dice1Roll(rollNum){
    setTimeout(function() {
        npcDice1Value = parseInt(1 + Math.random() * 6);
        swapDiceImage("npcDice1", npcDice1Value);
        if (rollNum > 0) {
            npc1Dice1Roll(--rollNum);
        }
    }, 300);
 }

 /**
  * Recursively rerolls NPC die 2 until roll count reaches zero.
  * 
  * @param {Number} rollNum the number of rolls to perform
  */
 function npc1Dice2Roll(rollNum){
    setTimeout(function() {
        npcDice2Value = parseInt(1 + Math.random() * 6);
        swapDiceImage("npcDice2", npcDice2Value);
        if (rollNum > 0) {
            npc1Dice2Roll(--rollNum);
        }
    }, 300);
 }

 /**
  * Returns a random number between 5 and 9.
  */
 function getRandDiceRollNumber() {
    return parseInt(5 + Math.random() * 5);
 }

 /**
  * Resets game by resetting global variables;
  */
 function resetGame() {
    currentRound = 1;
    humanPlayer.score = 0;
    npcPlayer.score = 0;
    document.getElementById("playerScore").textContent = `Total Score: `;
    document.getElementById("npcScore").textContent = `Total Score: `
    document.getElementById("round1PlayerScore").textContent = `Round 1 Score: `;
    document.getElementById("round2PlayerScore").textContent = `Round 2 Score: `;
    document.getElementById("round3PlayerScore").textContent = `Round 3 Score: `;
    document.getElementById("round1NPCScore").textContent = `Round 1 Score: `;
    document.getElementById("round2NPCScore").textContent = `Round 2 Score: `;
    document.getElementById("round3NPCScore").textContent = `Round 3 Score: `;
    document.getElementById("winLoseStatus").innerHTML = `<br>`;
    // document.getElementById("startGame").addEventListener("click", playGame);
 }

 function showWinner() {
    console.log("show winner");
    let statusOutputString = ``;
    if (humanPlayer.score > npcPlayer.score) {
    statusOutputString = `You win!`;
    } else if (npcPlayer.score > humanPlayer.score) {
        statusOutputString = `You lose!`;
    } else {
        statusOutputString = `A draw! No winner.`;
    }
    console.log(statusOutputString);
    document.getElementById("winLoseStatus").innerHTML = statusOutputString;
 }

 /**
  * Plays the game.
  */
 function playGame() {
    if(isResetGame) {
        resetGame();
        console.log("reset game");
        isResetGame = false;
    }


    //disables Start Game button once the game begins
    document.getElementById("startGame").removeEventListener("click", playGame);

    /*
    Recursion base case - game ends and show the winner
    Activates Start Game button for a new game
    */
    if (currentRound > 3) {
        console.log("stop game");
        document.getElementById("startGame").addEventListener("click", playGame);
        showWinner();
        isResetGame = true;
        return;
    }


    console.log(`current Round: ${currentRound}`);
    playerDice1ChangeTimes = getRandDiceRollNumber()
    playerDice2ChangeTimes = getRandDiceRollNumber()
    npcPlayerDice1ChangeTimes = getRandDiceRollNumber()
    npcPlayerDice2ChangeTimes = getRandDiceRollNumber()
    player1Dice1Roll(playerDice1ChangeTimes);
    player1Dice2Roll(playerDice2ChangeTimes);
    npc1Dice1Roll(npcPlayerDice1ChangeTimes);
    npc1Dice2Roll(playerDice2ChangeTimes);
    let waitTime = Math.max(playerDice1ChangeTimes, playerDice2ChangeTimes, npcPlayerDice1ChangeTimes, npcPlayerDice2ChangeTimes) * 300 + 500;
    setTimeout(function(){

        //calculate scores
        humanPlayerScore = determineScore(playerDice1Value, playerDice2Value);
        npcPlayerScore = determineScore(npcDice1Value, npcDice2Value);
        humanPlayer.score += humanPlayerScore;
        npcPlayer.score += npcPlayerScore;
        document.getElementById("playerScore").textContent = `Total Score: ` + humanPlayer.score;
        document.getElementById("npcScore").textContent = `Total Score: ` + npcPlayer.score;
        const currentRoundPlayerScoreID = `round${currentRound}PlayerScore`;
        const currentRoundNPCScoreID = `round${currentRound}NPCScore`;
        document.getElementById(currentRoundPlayerScoreID).textContent += humanPlayerScore;
        document.getElementById(currentRoundNPCScoreID).textContent += npcPlayerScore;
        currentRound++;

        //recursive call - next round
        setTimeout(function() {
            playGame();
            console.log("next round");
        }, 1000);
    }, waitTime)
 }


 /**
  * Run the game.
  */
 const humanPlayer = new Player("Human");
 const npcPlayer = new Player("NPC");
 document.getElementById("startGame").addEventListener("click", playGame);



