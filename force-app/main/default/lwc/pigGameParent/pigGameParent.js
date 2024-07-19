import { LightningElement } from 'lwc';

export default class PigGameParent extends LightningElement {

  gameOn = false;
  playerOneName = "";
  playerTwoName = "";

  startGame(){
    if(this.playerOneName === "" || this.playerOneName === null) this.playerOneName = "Player 1";
    if(this.playerTwoName === "" || this.playerTwoName === null) this.playerTwoName = "Player 2";
    this.gameOn = true;
  }

  endGame(){
    this.gameOn = false;
    this.playerOneName = "";
    this.playerTwoName = "";
  }

  handleChange(event){
    if(event.target.name === "playerOne"){
      this.playerOneName = event.target.value;
    }
    if(event.target.name === "playerTwo"){
      this.playerTwoName = event.target.value;
    }
  }

}