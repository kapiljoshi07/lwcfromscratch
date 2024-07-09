import { LightningElement } from 'lwc';

export default class DemoForEach extends LightningElement {

  listOfContacts = [
    {id:1, name: 'Amy Taylor', title: 'VP of Engineering'},
    {id:2, name: 'Michael Jones', title: 'VP of Sales'},
    {id:3, name: 'Jennifer Wu', title: 'CEO'},
  ];

}