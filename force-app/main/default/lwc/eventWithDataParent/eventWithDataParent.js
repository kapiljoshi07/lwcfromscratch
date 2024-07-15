import { LightningElement, track } from 'lwc';
import {contacts} from './contacts.js'

export default class EventWithDataParent extends LightningElement {

  contactList = contacts;
  @track contact;

  get isContactList(){
    return this.contactList.length>0;
  }

  handleContactSelect(event){
    const selectedContactId = event.detail;
    console.log(`selectedContactId: ${selectedContactId}`);
    this.contact = this.contactList.find(
      con => con.id === selectedContactId
    );
    console.log(`contact: ${JSON.stringify(this.contact)}`);
  }

}