import { LightningElement } from 'lwc';
import CONTACT_IMAGES from '@salesforce/resourceUrl/contacts';

export default class DemoCompositionIteration extends LightningElement {

  contactImages = CONTACT_IMAGES; 
  
  contacts = [
    {
        id: '003171931112854375',
        name: 'Amy Taylor',
        title: 'VP of Engineering',
        phone: '4152568563',
        picture: `${this.contactImages}/images/amy_taylor.jpg`
    },
    {
        id: '003192301009134555',
        name: 'Michael Jones',
        title: 'VP of Sales',
        phone: '4158526633',
        picture: `${this.contactImages}/images/michael_jones.jpg`
    },
    {
        id: '003848991274589432',
        name: 'Jennifer Wu',
        title: 'CEO',
        phone: '4158521463',
        picture: `${this.contactImages}/images/jennifer_wu.jpg`
    }
  ];


}