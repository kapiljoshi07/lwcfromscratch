import { LightningElement } from 'lwc';

export default class ChangeBarColorParent extends LightningElement {

  handleClick(){
    this.template.querySelector('c-change-bar-color-child').changeColor();
  }

}