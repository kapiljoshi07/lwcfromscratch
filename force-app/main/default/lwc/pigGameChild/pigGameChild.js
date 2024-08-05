import { LightningElement, api } from 'lwc';
import DICE_IMAGES from '@salesforce/resourceUrl/dices';

export default class PigGameChild extends LightningElement {

  //Declaring properties
  current;
  scoreOne;
  scoreTwo;
  currentScoreOne;
  currentScoreTwo;
  hasRendered;
  diceImg;
  currentplayer;
  
  //Contructor callback lifecycle hook: Fires when component is created
  constructor(){
    super();
    this.current = "Current";
    this.hasRendered = false;
    this.diceImg = `${DICE_IMAGES}/dice-1.png`;
  }

  //Rendered callback lifecycle hook: Fires when a component has finished rendering phase
  renderedCallback(){
    if(this.hasRendered) return;

    this.init();
    this.hasRendered = true;
  }

  //Exposing properties to parent component
  @api playerOne;
  @api playerTwo;

  //Methods for game functioning

  //Sets the properties values to first state
  init(){
    this.scoreOne = 0;
    this.scoreTwo = 0;
    this.currentScoreOne = 0;
    this.currentScoreTwo = 0;
    this.template.querySelector("img").classList.add("hidden");
  }
  
  //Dispatches event to parent when "Close Game" button is clicked on child
  closeHandler(){
    this.dispatchEvent(new CustomEvent('close'));
  }

  //Resets the game
  newGame(){
    this.init();
    this.template.querySelectorAll(".player").forEach(el => el.classList.remove("player--winner"));
    this.template.querySelector(".btn--hold").classList.remove("hidden");
    this.template.querySelector(".btn--roll").classList.remove("hidden");
    this.switchPlayer(2);
  }

  //Calls random number generator and displays the dice image corresponding to the number
  //If random number is '1' then calls method to switch the player
  //If random number is not '1' then adds the random number to current score of active player
  rollDice(){
    let activePlayer;
    let randDiceNumber = this.calcRandomNumber();
    this.template.querySelector("img").classList.remove("hidden");
    this.diceImg = `${DICE_IMAGES}/dice-${randDiceNumber}.png`;
    activePlayer = this.getActivePlayer();
    if(randDiceNumber !== 1){
      if(activePlayer === 1){
        this.currentScoreOne += randDiceNumber;
      }else if(activePlayer === 2){
        this.currentScoreTwo += randDiceNumber;
      }
    }else{
      this.switchPlayer(activePlayer);
    }
  }

  //Returns random number generated between 1 and 6
  calcRandomNumber(){
    return Math.trunc(Math.random()*6) + 1;
  }

  //Calls method to find active player and adds the current score to active player score tally.
  //If score of active player is greater than 100 then declares the winner.
  holdScore(){
    let activePlayer;
    activePlayer = this.getActivePlayer();
    activePlayer === 1 ? this.scoreOne += this.currentScoreOne : this.scoreTwo += this.currentScoreTwo;
    if(this.scoreOne >= 100)
      this.declareWinner(1);
    else if(this.scoreTwo >= 100)
      this.declareWinner(2);
    else
      this.switchPlayer(activePlayer);
  }

  //Finds active player by identifying the player that element with 'player-active' class
  getActivePlayer(){
    this.currentplayer = this.template.querySelector(".player--active");
    return this.currentplayer.dataset.playerId === "player--1" ? 1 : this.currentplayer.dataset.playerId === "player--2" ? 2 : null;
  }

  //Switches the player and toggles the class of the players by removing/adding 'player-active'
  switchPlayer(activePlayer){
    activePlayer === 1 ? this.currentScoreOne = 0 : this.currentScoreTwo = 0;
    this.template.querySelector(`.player[data-player-id="player--${activePlayer}"]`).classList.toggle("player--active");
    this.template.querySelector(`.player[data-player-id="player--${3-activePlayer}"]`).classList.toggle("player--active");
  }

  //Adds 'player-winner' class to winner player element
  declareWinner(winnerNum){
    this.template.querySelector(`.player[data-player-id="player--${winnerNum}"]`).classList.add("player--winner");
    this.template.querySelector(".btn--hold").classList.add("hidden");
    this.template.querySelector(".btn--roll").classList.add("hidden");
    this.template.querySelector("img").classList.add("hidden");
  }

  //Getters
  get getDiceImg(){
    return this.diceImg;
  }
  get getCurrentScoreOne(){
    return this.currentScoreOne;
  }
  get getCurrentScoreTwo(){
    return this.currentScoreTwo;
  }
  get getScoreOne(){
    return this.scoreOne;
  }
  get getScoreTwo(){
    return this.scoreTwo;
  }
  
}