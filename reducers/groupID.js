const groupID = (state = '', action) => {
    //console.log(action.type);
    switch(action.type)
    {
        
        case 'SET_GROUP_ID':
           // console.log('SET GROUP ID action.payload', action.payload);
            return {
                userGroupID: action.payload
            };
    }
    return state
}

const groupIDReducer = (state, action) => {
    // if (action.type == 'CLEAR_CART') {
    //     console.log("penis");
    //     state = undefined
    // }
    //console.log(action.type);
    return groupID(state,action)
}
export default groupIDReducer;