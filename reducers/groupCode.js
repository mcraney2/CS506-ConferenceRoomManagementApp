const INITIAL_STATE = ''
const groupCode = (state = '', action) => {
    switch(action.type)
    {
        case 'SET_USER_GROUP':
            
            return {
                userGroupCode: action.payload,
                
            }
        case 'RESET_USER_GROUP':
            return {
                userGroupCode: INITIAL_STATE
            };
    }
    return state
}
const groupCodeReducer = (state, action) => {
    // if (action.type == 'CLEAR_CART') {
    //     console.log("penis");
    //     state = undefined
    // }
    return groupCode(state,action)
}
export default groupCodeReducer; 