import { api, LightningElement } from 'lwc';

export default class ToDoListChild extends LightningElement {

  _listItems = [];
  filteredItems = [];
  applyFilter = false;
  
  @api
  get toDoList(){
    return this._listItems;
  }
  set toDoList(val){
    this._listItems = val;
    this.filterList();
  }

  filterList(){
    if(this.applyFilter){
      this.filteredItems = this._listItems.filter(
        item => item.priority === true
      );
    }else{
      this.filteredItems = this._listItems;
    }
  }

  handleChange(event){
    this.applyFilter = event.target.checked;
    this.filterList();
  }

}