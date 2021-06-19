import {combineReducers} from 'redux'
import {userReducer} from './UserReducer/userReducer'
import {teamReducer} from './TeamReducer/TeamReducer'
import {taskReducer} from './TaskReducer/TaskReducer'

export default combineReducers({
    user : userReducer,
    team : teamReducer,
    tasks: taskReducer
})