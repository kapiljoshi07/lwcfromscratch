import { LightningElement } from 'lwc';

export default class ModalParent extends LightningElement {

  openModal = false;

  get openModal(){
    return this.openModal === true;
  }

  showModal(){
    this.openModal = true;
  }

  closeModal(){
    this.openModal = false;
  }

}