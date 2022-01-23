import reducer from '../reducers';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;