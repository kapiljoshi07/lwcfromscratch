import { api, LightningElement } from 'lwc';

export default class ModalChild extends LightningElement {

  @api headerText;
  @api messageText;

  closeModal(){
    this.dispatchEvent(new CustomEvent('modalclose'));
  }

}