import { LightningElement } from 'lwc';

export default class HelloBinding extends LightningElement {
  name = '';
  handleChange(event){
    this.name = event.target.value;
  }
}