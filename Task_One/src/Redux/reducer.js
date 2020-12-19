import actionConstant from './actionTypes'

export const initState = {
    cardUserInfo :  [],
}

const reducer = ( state = initState , action ) => {
    switch(action.type){
        case actionConstant.ADD_CREDIT_CARD_DETAILS_REQUEST:
            return {
                ...state ,
               
            }
        case actionConstant.ADD_CREDIT_CARD_DETAILS_SUCCESS:
           
            return {
                ...state,
                cardUserInfo : [action.payload , ...state.cardUserInfo],
               
            }
        case actionConstant.ADD_CREDIT_CARD_DETAILS_FAILURE:
            return{
                ...state
            }
           
        case actionConstant.GET_CREDIT_CARD_DETAILS_REQUEST:
            return {
                ...state , 
            }
        case actionConstant.GET_CREDIT_CARD_DETAILS_SUCCESS:
            
            return {
                ...state,
                cardUserInfo : action.payload 
            }
        case actionConstant.GET_CREDIT_CARD_DETAILS_FAILURE:
            return{
                ...state
            }

        case actionConstant.DELETE_CREDIT_CARD_DETAILS_REQUEST:
            return {
                ...state ,
            }
        case actionConstant.DELETE_CREDIT_CARD_DETAILS_SUCCESS:
            
            return {
                ...state,
                cardUserInfo : state.cardUserInfo.filter((item) => item.id !== Number(action.payload)),
            }
        case actionConstant.DELETE_CREDIT_CARD_DETAILS_FAILURE:
            return{
                ...state
            }
        default :
            return state
    }
}

export default reducer