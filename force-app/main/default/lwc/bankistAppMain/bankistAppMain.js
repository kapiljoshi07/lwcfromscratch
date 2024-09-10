import { LightningElement, track, wire } from 'lwc';
import  LightningAlert from 'lightning/alert';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import signInTemplate from './signInTemplate.html';
import bankistMainPage from './bankistAppMain.html';
import {accounts} from './accounts.js';
import { publish, MessageContext, subscribe, APPLICATION_SCOPE, unsubscribe } from 'lightning/messageService';
import bankistAppMessageService from '@salesforce/messageChannel/Bankist_App_Messages__c';


export default class BankistAppMain extends LightningElement {

  _loggedIn = false;
  _username = '';
  _password = '';
  _currentBalance = 0;
  _accountDeposits = 0;
  _accountWithdrawals = 0;
  _accountInterest = 0;
  _ownerName = '';
  _message = null;
  _sort = false;
  _locale = null;
  subscription = null;
  @track accounts = accounts;
  @track _userAccount = {};

  @wire(MessageContext)
  messageContext;

  get loggedIn(){
    return this._loggedIn;
  }
  set loggedIn(val){
    this._loggedIn = val;
  }

  get username(){
    return this._username;
  }
  set username(val){
    this._username = val;
  }

  get password(){
    return this._password;
  }
  set password(val){
    this._password = val;
  }

  get currentBalance(){
    const movValArr = [];
    this._userAccount['movements'].forEach( mov => movValArr.push(mov.movVal));
    return movValArr.reduce((acu, cur) => acu+cur, 0);
  }

  get accountDeposits(){
    const mov = this.movements;
    const movVal = mov.map(x => x['movVal']);
    return Math.abs(movVal.filter(x => x > 0).reduce((acc, curr) => acc+curr, 0));
  }

  get accountWithdrawals(){
    const mov = this.movements;
    const movVal = mov.map(x => x['movVal']);
    return Math.abs(movVal.filter(x => x<0).reduce((acc, curr)=>acc+curr, 0));
  }

  get accountInterest(){
    const interest = this._userAccount['interestRate'];
    const mov = this.movements;
    const movVal = mov.map(x => x['movVal']);
    return movVal.filter(x => x>0).map(dep => dep*interest/100).reduce((acc, curr)=>acc+curr, 0);
  }

  get ownerName(){
    let ownerName = this._userAccount.owner.toLowerCase().split(' ')[0];
    return ownerName[0].toUpperCase()+ownerName.slice(1, ownerName.length);
  }

  get message(){
    return this._message;
  }
  set message(val){
    this._message = val;
  }

  get sort(){
    return this._sort;
  }
  set sort(val){
    this._sort = val;
  }

  get locale(){
    return this._userAccount["locale"];
  }

  get movements(){
    //return this._userAccount['movements'];
    const movements = this._userAccount['movements'].slice();
    return this.sort ? movements.sort((a, b) => a.movVal - b.movVal) : movements;
  }

  get todayDate(){
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long"
    }
    const dateText = new Intl.DateTimeFormat(this._userAccount['locale'], options).format(now);
    return dateText;
  }

  constructor(){
    super();
    this.accounts.forEach( acc => this.assignUserNames(acc));
  }

  subscribeToMessageChannel(){
    if(!this.subscription){
      this.subscription = subscribe(
        this.messageContext,
        bankistAppMessageService,
        (message) => this.handleMessage(message),
        { scope : APPLICATION_SCOPE}
      )
    }
  }

  connectedCallback(){
    this.subscribeToMessageChannel();
  }

  unsubscribeToMessageChannel(){
    unsubscribe(this.subscription);
    this.subscription = null;
    this.message = null;
  }

  disconnectedCallback(){
    this.unsubscribeToMessageChannel();
  }

  //Method to assign usernames to all account when component is initialized
  assignUserNames(acc){
    const user = acc['owner'];
    acc.username = user.toLowerCase().split(' ').map(name => name[0]).join('');  
  }

  //Conditional Rendering of Bankist App (Sign In page and Main Page)
  render(){
    if(this.loggedIn) return bankistMainPage;
    return signInTemplate;
  }

  handleChange(event){
    event.target.label === 'Username' ? this.username = event.target.value : event.target.label === 'Password' ? this.password = event.target.value : this.username = this.password = '';
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.username && this.password){
      this._userAccount = this.verifyCredentials(this.username, this.password);
      if(this._userAccount){
        this.loggedIn = true;
        this.publishMessagesToApp(true);
      }else{
        LightningAlert.open({
        message: 'Invalid Credentials',
        theme: 'error',
        label: "Login Error!",
      });
      this.username = this.password = '';
      }
    }else{
      LightningAlert.open({
        message: 'Both Username and Password needed for Login',
        theme: 'error',
        label: "Login Error!",
      });
    }
  }

  handleMessage(message){
    this.message = message;
    if(this.message){
      if(this.message["lmsType"] === "amountTransfer"){
        this.handleAmountTransfer();
      }else if(this.message["lmsType"] === "loan"){
        console.log(`INSIDE bankistAppMain requestLoan logic`);
        const requesterAcc = this.findAccountFromAccountJS(this.message["lmsData"].owner);
        this.handleLoan(requesterAcc,Math.floor(this.message["lmsData"].amount));
      }else if(this.message["lmsType"] === "closeAccount"){
        console.log(`INSIDE bankistAppMain closeAccount logic`);
        this.handleAccountClosure();
      }
    }
  }

  handleSignOut(){
    const evt = new ShowToastEvent({
      title : "Logging Out",
      variant : "success",
      message : "You have logged out successfully."
    });
    this.handleLogOut(evt);
  }

  handleLogOut(evt){
    this.dispatchEvent(evt);
    this.loggedIn = false;
    this.publishMessagesToApp(false);
    this.username = this.password = "";
    this._userAccount = null;
  }

  handleAmountTransfer(){
    try{
      let receiverAccount = null;
      let senderAccount = null;
      let todayDate = new Date();
      if(this.findAccountFromAccountJS(this.message["lmsData"].receiver)){
        receiverAccount = JSON.parse(JSON.stringify(this.findAccountFromAccountJS(this.message["lmsData"].receiver)));
      }
      if(this.findAccountFromAccountJS(this.message["lmsData"].sender)){
        senderAccount = JSON.parse(JSON.stringify(this.findAccountFromAccountJS(this.message["lmsData"].sender)));
      }
      const transferAmount = Number(this.message["lmsData"].amount);
      const transactionid = todayDate.getTime();
      if(transferAmount < this.currentBalance){
        if(receiverAccount){
          receiverAccount['movements'].push({
            movId: transactionid,
            movVal: transferAmount,
            movDate: todayDate.toISOString()
          });
          senderAccount['movements'].push({
            movId: transactionid,
            movVal: -transferAmount,
            movDate: todayDate.toISOString()
          });          
          this._userAccount = senderAccount;
          LightningAlert.open({
            message: `${transferAmount} EUR sent to ${receiverAccount.owner}`,
            theme: "success",
            label: "Transfer Success!"
          })
          this.updateAccountObject(senderAccount);
          this.updateAccountObject(receiverAccount);
        }else{
          LightningAlert.open({
            message: `Cannot locate the receiver '${this.message['lmsData'].receiver}' account. Please check username and try again.`,
            theme: "error",
            label: "Transfer Error!"
          })
        }
      }else{
        LightningAlert.open({
          message: `Not enough balance. Current balance ${this.currentBalance} EUR`,
          theme: "error",
          label: "Transfer Error!"
        })
      }
    }catch(err){
      console.error(JSON.stringify(err.message));
    }
  }

  handleAccountClosure(){
    const requestedAccount = JSON.parse(JSON.stringify(this.findAccountFromAccountJS(this.message["lmsData"].owner)));
    if(requestedAccount.pin === Number(this.message["lmsData"].pin)){
      const index = this.accounts.findIndex((acc) => acc.username === requestedAccount.username);
      this.accounts.splice(index, 1);
      const evt = new ShowToastEvent({
        title : "Account Closed!",
        variant : "success",
        message : "Account is closed successfully. You are being logged out."
      });
      this.handleLogOut(evt);
    }else{
      LightningAlert.open({
        message: "Incorrent pin.",
        theme: "error",
        label: "Account Error!"
      })
    }
  }

  handleLoan(acc, loanAmount){
    const loanee = JSON.parse(JSON.stringify(acc));
    const movements = loanee.movements;
    const movVal = [];
    const todayDate = new Date();
    movements.forEach( m => movVal.push(m.movVal));
    if(loanAmount > 0 && movVal.some( mov => mov > loanAmount * 0.1)){
      const transactionId = `${todayDate.getTime()}loan`;
      loanee.movements.push({
        movId: transactionId,
        movVal: loanAmount,
        movDate: todayDate.toISOString()
      });
      LightningAlert.open({
        label: "Loan Information",
        theme: "success",
        message: `An amount of ${loanAmount} EUR is disbursed to your account`
      });
      this._userAccount = loanee;
      this.updateAccountObject(loanee);
    }else{
      LightningAlert.open({
        label: "Loan Information",
        theme: "info",
        message: `You are not eligible for loan of amount ${loanAmount} EUR`
      });
    }
  }

  handleSort(){
    this.sort = !this.sort;
  }

  verifyCredentials(usrName, pwd){
    const account = this.findAccountFromAccountJS(usrName);
    if(account && account['pin'] === Number(pwd))
      return account;
    return false;
  }

  findAccountFromAccountJS(usrName){
    return this.accounts.find(el => el['username'] === usrName);
  }

  updateAccountObject(account){
    const index = this.accounts.findIndex((acc) => acc.username === account.username);
    this.accounts[index] = account;
  }

  printLoginMessage(owner){
    let ownerName = owner.toLowerCase().split(' ')[0];
    this._ownerName = ownerName[0].toUpperCase()+ownerName.slice(1, ownerName.length);
  }

  publishMessagesToApp(login){
    const payload = { 
      lmsType: 'logger',
      lmsData: {
        uname: this._userAccount.username,
        login: login
      }  
    };
    publish(this.messageContext, bankistAppMessageService, payload);
  }

}