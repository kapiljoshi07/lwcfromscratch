import { LightningElement } from 'lwc';

export default class PaginatorChild extends LightningElement {

  handlePrevious(){
    this.dispatchEvent(new CustomEvent('prev'));
  }

  handleNext(){
    this.dispatchEvent(new CustomEvent('next'));
  }

}