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
let playerDice1status = false;
let playerDice2status = false;
let npcDice1status = false;
let npcDice2status = false;

 /**
  * a Player object.
  */
 class Player {
     constructor(name) {
         this.score = 0;
         this.name = name;
     }
     debugPrintScore() {
         console.log `The score is ${this.score}`;
     }

     returnScore() {
         return this.score;
     }
 }

 /**
  * Returns the score base on the value of two dice
  * 
  * @param {*} dice1 the value on dice1
  * @param {*} dice2 the value on dice2
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
  * @param {*} imageID the element ID to change image
  * @param {*} diceValue the value of the dice
  */
 function swapDiceImage(imageID, diceValue) {
     document.getElementById(imageID).src = `img\\${diceValue}.png`;
     console.log(`Called, dice value: ${diceValue}`);
 }


 function player1Dice1Roll(rollNum){
    setTimeout(function() {
        playerDice1Value = parseInt(1 + Math.random() * 6);
        swapDiceImage("playerDice1", playerDice1Value);
        if (rollNum > 0) {
            player1Dice1Roll(--rollNum);
        }
    }, 300);
 }

 function player1Dice2Roll(rollNum){
    setTimeout(function() {
        playerDice2Value = parseInt(1 + Math.random() * 6);
        swapDiceImage("playerDice2", playerDice2Value);
        if (rollNum > 0) {
            player1Dice2Roll(--rollNum);
        }
    }, 300);
 }

 function npc1Dice1Roll(rollNum){
    setTimeout(function() {
        npcDice1Value = parseInt(1 + Math.random() * 6);
        swapDiceImage("npcDice1", npcDice1Value);
        if (rollNum > 0) {
            npc1Dice1Roll(--rollNum);
        }
    }, 300);
 }

 function npc1Dice2Roll(rollNum){
    setTimeout(function() {
        npcDice2Value = parseInt(1 + Math.random() * 6);
        swapDiceImage("npcDice2", npcDice2Value);
        if (rollNum > 0) {
            npc1Dice2Roll(--rollNum);
        }
    }, 300);
 }



 function round1() {
    playerDice1ChangeTimes = parseInt(5 + Math.random() * 5);
    playerDice2ChangeTimes = parseInt(5 + Math.random() * 5);
    npcPlayerDice1ChangeTimes = parseInt(5 + Math.random() * 5);
    npcPlayerDice2ChangeTimes = parseInt(5 + Math.random() * 5);
    player1Dice1Roll(playerDice1ChangeTimes);
    player1Dice2Roll(playerDice2ChangeTimes);
    npc1Dice1Roll(npcPlayerDice1ChangeTimes);
    npc1Dice2Roll(playerDice2ChangeTimes);
    let waitTime = Math.max(playerDice1ChangeTimes, playerDice2ChangeTimes, npcPlayerDice1ChangeTimes, npcPlayerDice2ChangeTimes) * 300 + 500;
    

    setTimeout(function(){
        humanPlayer.score += determineScore(playerDice1Value, playerDice2Value);
        npcPlayer.score += determineScore(npcDice1Value, npcDice2Value);
        console.log(`player1 score: ${humanPlayer.score}`)
        document.getElementById("playerScore").textContent = `Score: ` + humanPlayer.score;
        document.getElementById("npcScore").textContent = `Score: `+ npcPlayer.score;
    }, waitTime)

 }


 /**
  * Run the game.
  */

 const humanPlayer = new Player("Human");
 const npcPlayer = new Player("NPC");

 /*Round 1*/
 document.getElementById("round1").addEventListener("click", round1);



