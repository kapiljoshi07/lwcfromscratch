import { LightningElement, wire } from 'lwc';
import {subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext, publish} from 'lightning/messageService';
import bankistAppMessageService from '@salesforce/messageChannel/Bankist_App_Messages__c';

export default class BankistAppLoans extends LightningElement {

  @wire(MessageContext)
  messageContext;

  subscription = null;
  _showLoanPanel = false;
  _owner = null;
  _loanAmount = null;
  
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
      this.message.lmsData.login ? this.showLoanPanel = true : this.showLoanPanel = false;
      this.owner = this.message.lmsData.uname;
    }
  }

  handleChange(event){
    this.loanAmount = event.target.value;
  }

  requestLoan(){
    const payload = {
      lmsType: "loan",
      lmsData: {
        owner: this.owner,
        amount: this.loanAmount
      }
    }
    publish(this.messageContext, bankistAppMessageService, payload);
    this.loanAmount = "";
  }

  get owner(){
    return this._owner;
  }
  set owner(val){
    this._owner = val;
  }

  get showLoanPanel(){
    return this._showLoanPanel;
  }
  set showLoanPanel(val){
    this._showLoanPanel = val;
  }

  get loanAmount(){
    return this._loanAmount;
  }
  set loanAmount(val){
    this._loanAmount = val;
  }

}