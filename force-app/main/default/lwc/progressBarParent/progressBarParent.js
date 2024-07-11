import { LightningElement } from 'lwc';

export default class ProgressBarParent extends LightningElement {

  percentage = '';

  handleChange(event){
    this.percentage = event.target.value;
  }

}