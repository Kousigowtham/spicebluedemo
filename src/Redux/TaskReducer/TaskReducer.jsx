const INITIAL_STATE ={
    taskDetails: null
};

export const taskReducer=(state=INITIAL_STATE,action)=>{

    switch (action.type){
        case 'GET_TASK_DETAILS':
            return{
                ...state,
                taskDetails: action.payload
            };
        default:
            return state;
    }


}