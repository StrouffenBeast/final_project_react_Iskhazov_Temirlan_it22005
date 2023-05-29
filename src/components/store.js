import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../components/Data/dataReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
