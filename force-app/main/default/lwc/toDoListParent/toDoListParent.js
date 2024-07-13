import { LightningElement } from 'lwc';

export default class ToDoListParent extends LightningElement {

  toDoToItemId = 0;
  toDoList = [];


  isPriority = false;
  description = '';

  handleChange(event){
    event.target.name === "desc" ? this.description = event.target.value : this.isPriority = event.target.checked;
  }

  handleClick(){
    this.toDoToItemId ++;
    this.toDoList = [
      ...this.toDoList, 
      {
        id: this.toDoToItemId,
        item: this.description,
        priority: this.isPriority
      }
    ];
    this.description = '';
    this.isPriority = false;
  }

}