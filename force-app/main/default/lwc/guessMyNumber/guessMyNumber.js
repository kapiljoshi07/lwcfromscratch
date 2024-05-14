import { LightningElement } from 'lwc';

export default class GuessMyNumber extends LightningElement {

  //Declaring properties
    result = '?';
    guessedNumber = null;
    _secretNumber = Math.trunc(Math.random()*20) + 1;
    _textToDisplay = "Start guessing...";
    score = 20;
    highScore = 0;
    inputField = null;
  
  //To assign the input to 'guessedNumber' property and set the text when input changes
    handleChange(event){
    this.guessedNumber = Number(event.target.value);
    this._textToDisplay = "Start guessing...";
    this.inputField = event.target;
  }

  
  //To handle the game logic
  handleCheck(event){

    //If guessedNumber is not a number or not between 1 and 20
    if(!this.guessedNumber || this.guessedNumber < 1 || this.guessedNumber > 20){
      this._textToDisplay = "Enter a valid number";
    }
    //If guessedNumber is same as secret number
    else if(this.guessedNumber === this._secretNumber){
      this._textToDisplay = "Correct Number!🏆";
      this.result = this._secretNumber;
      this.highScore = this.score > this.highScore ? this.score : this.highScore;
      this.inputField.disabled = true;
    }
    //If guessedNumber is not equal to secret number
    else if(this.guessedNumber !== this._secretNumber){
      //If score is not zero, update text and decrement score
      if(this.score > 1){
        this.guessedNumber < this._secretNumber ? this._textToDisplay = "Too Low ↘️" : this._textToDisplay = "Too High ↗️";
        this.score--;
      }
      //If score is zero, disable input field and update text
      else{
        this._textToDisplay = "You lost the game!👎😓";
        this.score = 0;
        this.inputField.disabled = true;
      }
    }
  }

  //To reset game
  handleAgain(){
    this.result = '?';
    this.guessedNumber = null;
    this._secretNumber = Math.trunc(Math.random()*20) + 1;
    this._textToDisplay = "Start guessing...";
    this.score = 20;
    this.inputField.disabled = false;
  }

  //Getter to re-render text on change
  get displayText(){
    return this._textToDisplay;
  }

  //Getter to re-render result on change
  get getResult(){
    return this.result;
  }

}