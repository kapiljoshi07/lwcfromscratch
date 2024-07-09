import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {

  isChecked = false;

  handleChange(event){
    this.isChecked = !this.isChecked;
  }

}