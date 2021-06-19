const INITIAL_STATE ={
    currentUser: null,
    currentUserDetails: null
};

export const userReducer=(state=INITIAL_STATE,action)=>{

    switch (action.type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                currentUser: action.payload
            };
        case 'SET_CURRENT_USER_DETAILS':
            return{
                ...state,
                currentUserDetails: action.payload
            };
        default:
            return state;
    }


}