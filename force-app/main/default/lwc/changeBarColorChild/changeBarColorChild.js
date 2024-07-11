import { api, LightningElement } from 'lwc';

export default class ChangeBarColorChild extends LightningElement {

  
  className = 'greenBar';
  @api changeColor(){
    this.className = 'redBar';
  }

}