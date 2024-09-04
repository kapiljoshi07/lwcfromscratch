import { LightningElement, wire } from 'lwc';
import  LightningAlert from 'lightning/alert';
import {subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext, publish} from 'lightning/messageService';
import bankistAppMessageService from '@salesforce/messageChannel/Bankist_App_Messages__c';

export default class BankistAppCloseAccount extends LightningElement {

  @wire(MessageContext)
  messageContext;

  _showClosingAccountPanel = false;
  _owner = "";
  _username = "";
  _pin = "";
  
  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        bankistAppMessageService,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
    this.message = null;
  }

  disconnectedCallback(){
    this.unsubscribeToMessageChannel();
  }

  handleMessage(message) {
    this.message = message;
    if(this.message && this.message.lmsType === 'logger'){
      this.message.lmsData.login ? this.showClosingAccountPanel = true : this.showClosingAccountPanel = false;
      this.owner = this.message.lmsData.uname;
    }
  }

  handleChange(event){
    event.target.name === "username" ? this.username = event.target.value : event.target.name === "userpin" ? this.pin = Number(event.target.value) : this.username = this.pin = "";
  }

  closeAccount(){
    console.log(`Inside closeAccount method`);
    console.log(this.owner, this.username.toLowerCase());
    if(this.owner !== this.username.toLowerCase()){
      console.log(`Inside if block`);
      LightningAlert.open({
        message: "Incorrect username of the logged in account",
        theme: "error",
        label: "Account Error!"
      });
      this.username = this.pin = "";
    }else{
      console.log(`Inside else block`);
      const payload = {
        lmsType: "closeAccount",
        lmsData: {
          owner: this.username,
          pin: this.pin
        }
      }
      publish(this.messageContext, bankistAppMessageService, payload);
      this.username = this.pin = "";
    }
  }

  get owner(){
    return this._owner;
  }
  set owner(val){
    this._owner = val;
  }

  get showClosingAccountPanel(){
    return this._showClosingAccountPanel;
  }
  set showClosingAccountPanel(val){
    this._showClosingAccountPanel = val;
  }

  get username(){
    return this._username;
  }
  set username(val){
    this._username = val;
  }

  get pin(){
    return this._pin;
  }
  set pin(val){
    this._pin = val;
  }

}