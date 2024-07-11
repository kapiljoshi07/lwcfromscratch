import { LightningElement } from 'lwc';
import SIGNIN_TEMPLATE from './signInTemplate.html';
import SIGNUP_TEMPLATE from './signUpTemplate.html';
import DEFAULT_TEMPLATE from './demoRenderMultipleTemplates.html';

export default class DemoRenderMultipleTemplates extends LightningElement {

  whichTemplate = '';

  handleClick(event){
    this.whichTemplate = event.target.name;
    console.log(this.whichTemplate);
  }

  handleSubmit(event){
    event.target.name === 'loggedin' ? alert('Logged in Successfully') : event.target.name === 'signedup' ? alert('Signed Up Successfully') : alert('Going back to default page');
    this.whichTemplate = event.target.name;
  }

  render(){
    if(this.whichTemplate === 'signin') return SIGNIN_TEMPLATE;
    if(this.whichTemplate === 'signup') return SIGNUP_TEMPLATE;
    return DEFAULT_TEMPLATE;
  }

}