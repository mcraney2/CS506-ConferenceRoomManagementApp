export const SET_USER_GROUP = 'SET_USER_GROUP'
export const RESET_USER_GROUP = 'RESET_USER_GROUP'

export function setUserGroup(item) {
    return {
        type:'SET_USER_GROUP', 
        payload: item
    }
  }



