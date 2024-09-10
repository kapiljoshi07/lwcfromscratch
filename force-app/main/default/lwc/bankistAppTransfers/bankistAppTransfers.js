import { LightningElement, wire } from 'lwc';
import  LightningAlert from 'lightning/alert';
import {subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext, publish} from 'lightning/messageService';
import bankistAppMessageService from '@salesforce/messageChannel/Bankist_App_Messages__c';

export default class BankistAppTransfers extends LightningElement {

  @wire(MessageContext)
  messageContext;

  _recipientUsername = "";
  _transferAmount = "";
  _message = {};
  _owner = '';
  _showTransferPanel = false;
  subscription = null;
  
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

  handleChange(event){
    event.target.name === 'recipientUsername' ? this.recipientUsername = event.target.value : event.target.name === 'transferAmount' ? this.transferAmount = Number(event.target.value) : this.recipientUsername = this.transferAmount = '';
  }

  handleTransfer(){
    if(!this.recipientUsername || !this.transferAmount){
      LightningAlert.open({
        message: "Recipient's username and amount needed",
        theme: "error",
        label: "Inputs missing!",
      });
    }else{
      if(this.recipientUsername === this.owner){
        LightningAlert.open({
          message: "Cannot send money to your own account.",
          theme: "error",
          label: "Transfer Error!",
        });
        this.recipientUsername = this.transferAmount = '';
      }else{
        const fromUser = this.owner;
        const toUser = this.recipientUsername;
        const amount = this.transferAmount;
        this.sendAmount(fromUser, toUser, amount);
        this.recipientUsername = '';
        this.transferAmount = '';
      }
    }
  }
  
  sendAmount(sender, receiver, amount){
    const dt = new Date().getTime();
    const payload = {
      lmsData:{
        sender: sender, receiver: receiver, amount: amount 
      },
      lmsType: "amountTransfer"
    }
    publish(this.messageContext, bankistAppMessageService, payload);
  }

  handleMessage(message) {
    this.message = message;
    if(this.message && this.message.lmsType === 'logger'){
      this.message.lmsData.login ? this.showTransferPanel = true : this.showTransferPanel = false;
      this.owner = this.message.lmsData.uname;
    }
  }

  get owner(){
    return this._owner;
  }
  set owner(val){
    this._owner = val;
  }

  get showTransferPanel(){
    return this._showTransferPanel;
  }
  set showTransferPanel(val){
    this._showTransferPanel = val;
  }

  get message(){
    return this._message;
  }
  set message(val){
    this._message = val;
  }

  get recipientUsername(){
    return this._recipientUsername;
  }
  set recipientUsername(val){
    this._recipientUsername = val;
  }

  get transferAmount(){
    return this._transferAmount;
  }
  set transferAmount(val){
    this._transferAmount = val;
  }

}