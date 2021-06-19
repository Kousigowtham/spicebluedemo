const INITIAL_STATE ={
    teamDetails: null
};

export const teamReducer=(state=INITIAL_STATE,action)=>{

    switch (action.type){
        case 'SET_TEAM_DETAILS':
            return{
                ...state,
                teamDetails: action.payload
            };
        default:
            return state;
    }


}