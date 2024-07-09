import { LightningElement } from 'lwc';
import { contacts } from "./contacts";

export default class DemoCompositionContactSearch extends LightningElement {

  searchText;
  contactList;

  findContacts(searchKey){
    try{
      if(searchKey.length === 0) return [];
      const res = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      return res;
    }catch(err){
      console.error(err);
    }
  }

  handleChange(event){
    this.searchText = event.target.value;
    this.contactList = this.findContacts(this.searchText);
    console.log(JSON.stringify(this.contactList));
  }

}