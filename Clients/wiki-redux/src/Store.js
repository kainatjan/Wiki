import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import AllReducers from './Reducers/AllReducers' 

export default  createStore(AllReducers,{},applyMiddleware(thunk));