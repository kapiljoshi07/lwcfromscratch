import { api, LightningElement } from 'lwc';

export default class BankistAppMovements extends LightningElement {

  @api movement;
  @api index;

  get movementType(){
    return this.movement > 0 ? 'movements__type movements__type--deposit' : 'movements__type movements__type--withdrawal'; 
  }

  get getIndex(){
    return this.movement > 0 ? `${this.index + 1} deposit` : `${this.index + 1} withdrawal`;
  }

  get getMovement(){
    return Math.abs(this.movement);
  }

}