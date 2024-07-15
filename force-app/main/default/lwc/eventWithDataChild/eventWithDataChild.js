import { api, LightningElement } from 'lwc';

export default class EventWithDataChild extends LightningElement {

  @api contact

  handleClick(event){
    event.preventDefault();
    console.log(`contact id: ${this.contact.id}`);
    const selectEvent = new CustomEvent('selected',{
      detail: this.contact.id
    })
    this.dispatchEvent(selectEvent);
  }

}