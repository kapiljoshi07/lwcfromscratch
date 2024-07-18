import { LightningElement } from 'lwc';

export default class GuessMyNumber extends LightningElement {

  results = '?';
  textMessage = '🤔Start Guessing!'
  guessedNumber;
  randomNumber = Math.trunc(Math.random()*20+1);
  score = 20;
  highScore = 0;
  checkBtn;
  inputField;
  
  handleChange(event){
    console.log(this.randomNumber);
    this.inputField = event.target;
    this.guessedNumber = event.target.value;
  }

  checkNumber(event){
    this.checkBtn = event.target;
    if(this.randomNumber !== Number(this.guessedNumber)){
      this.score--;
      if(this.score > 0){
        if(this.randomNumber > this.guessedNumber){
          this.textMessage = '⬇️Too Low!';
        }else if(this.randomNumber < this.guessedNumber){
          this.textMessage = '⬆️Too High!';
        }
      }else{
        this.textMessage = '🥲YOU LOSE!!';
        this.checkBtn.disabled = true
        this.inputField.disabled = true;
      }
    }else{
      this.textMessage = '🏆Correct Answer!';
      this.results = this.randomNumber;
      if(this.highScore < this.score)
        this.highScore = this.score;
      this.checkBtn.disabled = true
      this.inputField.disabled = true;
    }
  }

  resetGame(){
    this.results = '?';
    this.textMessage = '🤔Start Guessing!'
    this.randomNumber = Math.trunc(Math.random()*20+1);
    this.guessedNumber = '';
    this.score = 20;
    this.checkBtn.disabled = false;
    this.inputField.disabled = false;
  }

  get getResults(){
    return this.results;
  }

  get guessedNumber(){
    return this.guessedNumber;
  }

  get textMessage(){
    return this.textMessage;
  }

  get highScore(){
    return this.highScore;
  }

  get score(){
    return this.score;
  }

}