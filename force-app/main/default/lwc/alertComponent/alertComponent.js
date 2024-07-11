import { api, LightningElement } from 'lwc';

export default class AlertComponent extends LightningElement {

  @api message;
  @api className;

}