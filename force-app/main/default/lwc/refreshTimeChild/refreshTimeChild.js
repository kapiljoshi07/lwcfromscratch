import { api, LightningElement } from 'lwc';

export default class RefreshTimeChild extends LightningElement {

  timeNow = new Date().toISOString();

  @api
  refresh(){
    this.timeNow = new Date().toISOString();
  }

}