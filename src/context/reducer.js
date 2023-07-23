const reducer=(state,action)=>{// custom action: {type:...,payload:...} 
    switch(action.type){
        case "HIDE_LOADING" :return  {
            ...state,loading:false
        };
        case "SHOW_LOADING" :return {
            ...state,loading:true
        };
        case "ADD_SCRIPT":return {
            ...state,afterScript:action.payload
        }
        case "ADD_USTYLE":return {
            ...state,userStyle:action.payload
        }
        default: return state;
    }
}
export default reducer;