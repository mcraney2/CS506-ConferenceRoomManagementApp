import { combineReducers } from 'redux'
import groupCode from './groupCode'
import userID from './userID'
import groupID from './groupID'
export default combineReducers({
  groupCode,
  userID,
  groupID
})