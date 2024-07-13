import { LightningElement } from 'lwc';

export default class PaginatorParent extends LightningElement {

  pageNo = 1;

  handlePrev(){
    if(this.pageNo>1){
      this.pageNo--
    }
  }

  handleNext(){
    this.pageNo++;
  }

}