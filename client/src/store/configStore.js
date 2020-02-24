import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css';
import userReducer from '../reducers/userReducer'
import tweetsReducer from '../reducers/tweetsReducer';
import feedsReducer from '../reducers/feedsReducer';
import searchUserReducer from '../reducers/searchReducer';
import searchHashReducer from '../reducers/searchHashReducer';

const configureStore = () => {
    const store = createStore(combineReducers({
        user : userReducer,
        tweets : tweetsReducer,
        feeds : feedsReducer,
        searchUser : searchUserReducer,
        searchHash : searchHashReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore