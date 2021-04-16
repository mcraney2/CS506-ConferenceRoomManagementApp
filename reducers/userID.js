const userID = (state = '', action) => {
    
    switch(action.type)
    {
        case 'SET_USER_ID':
            return {
                userid: action.payload
            };
    }
    return state
}

const userIDReducer = (state, action) => {
    // if (action.type == 'CLEAR_CART') {
    //     console.log("penis");
    //     state = undefined
    // }
    return userID(state,action)
}
export default userIDReducer;