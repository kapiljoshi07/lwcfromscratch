import { LightningElement } from 'lwc';

export default class RefreshTimeParent extends LightningElement {

  handleClick(){
    this.template.querySelector('c-refresh-time-child').refresh();
  }

}