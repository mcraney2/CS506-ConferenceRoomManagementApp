export const SET_GROUP_ID = 'SET_GROUP_ID'


export function setGroupID(item) {
    //console.log("SET GROUP ID ACTION CREATOR CALLED")
    return {
        type:'SET_GROUP_ID', 
        payload: item
    }
  }


