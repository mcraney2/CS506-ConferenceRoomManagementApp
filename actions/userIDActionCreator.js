export const SET_USER_ID = 'SET_USER_ID'


export function setUserID(item) {
    console.log(item)
    return {
        type:'SET_USER_ID', 
        payload: item
    }
  }


