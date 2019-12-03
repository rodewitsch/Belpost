import { combineReducers } from 'redux';
import profile from './profile';
import services from './services';
import transport from './transport';

export default combineReducers({
    profile,
    services,
    transport
})