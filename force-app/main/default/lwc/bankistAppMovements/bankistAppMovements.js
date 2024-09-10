import { api, LightningElement } from 'lwc';

export default class BankistAppMovements extends LightningElement {

  @api movement;
  @api index;
  @api locale

  get movementType(){
    return this.movement.movVal > 0 ? 'movements__type movements__type--deposit' : 'movements__type movements__type--withdrawal'; 
  }

  get getIndex(){
    return this.movement.movVal > 0 ? `${this.index + 1} deposit` : `${this.index + 1} withdrawal`;
  }

  get getMovementVal(){
    return Math.abs(this.movement.movVal);
  }

  get getMovementDate(){
    const dt = new Date(this.movement.movDate);
    const formattedDate = this.formatMovementDate(dt);
    return formattedDate;
  }

  formatMovementDate(movDate){
    const hours = `${movDate.getHours()}`.padStart(2, 0);
    const minutes = `${movDate.getMinutes()}`.padStart(2, 0);
    const daysPassed = this.calcDaysPassed(new Date(), movDate);
    if(daysPassed === 0) return `Today, at ${hours}:${minutes}`;
    else if( daysPassed === 1 ) return `Yesterday, at ${hours}:${minutes}`;
    else if( daysPassed <= 7 ) return `${daysPassed} days ago, at ${hours}:${minutes}`;
    else return new Intl.DateTimeFormat(this.locale).format(movDate);
  }

  calcDaysPassed(dateOne, dateTwo){
    return Math.round( Math.abs( dateOne - dateTwo ) / (1000 * 60 * 60 * 24) );
  }
}