import { LightningElement } from 'lwc';
import CONTACT_IMAGES from '@salesforce/resourceUrl/contacts';

export default class DemoComposition extends LightningElement {

  contactImages = CONTACT_IMAGES; 

  contact = {
    name: 'Amy Taylor',
    title: 'VP of Engineering',
    phone: '4152568563',
    picture: `${this.contactImages}/images/amy_taylor.jpg`
  };

}