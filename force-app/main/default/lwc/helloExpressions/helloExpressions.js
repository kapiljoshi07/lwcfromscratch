import { LightningElement } from 'lwc';

export default class HelloExpressions extends LightningElement {

  firstName = "";
  lastName = "";

  handleChange(event){
    event.target.label === "First Name" ? this.firstName = event.target.value : event.target.label === "Last Name" ? this.lastName = event.target.value : this.firstName = this.lastName = '';
  }

  get upperCaseName(){
    return `${this.firstName} ${this.lastName}`.trim().toUpperCase();
  }

}