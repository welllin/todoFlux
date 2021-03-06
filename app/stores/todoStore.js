import AppDispatcher from '../dispatcher/AppDispatcher';
import appConstants from '../constants/appConstants';
import objectAssign from 'react/lib/Object.assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _store = {
  list: []
};

const addItem = (item) => {
  _store.list.push(item);
};

const removeItem = (index) => {
  _store.list.splice(index, 1);
}

const todoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList(){
    return _store.list;
  },
});

AppDispatcher.register(function(payload){
  const action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

export default todoStore;
