import actionConstant from './actionTypes'
import { loadData, saveData } from './localStorage'

export const initState = {
    cardUserInfo :loadData("userInfo") || [],
   
}

const reducer = ( state = initState , action ) => {
    switch(action.type){
        case actionConstant.USER_CREDIT_CARD_REQUEST:
            return {
                ...state ,
                cardUserInfo :[]
            }
        case actionConstant.USER_CREDIT_CARD_SUCCESS:
            saveData("userInfo",action.payload)
            console.log(action.payload)
            return {
                ...state,
                cardUserInfo : action.payload,
               
            }
        case actionConstant.USER_CREDIT_CARD_FAILURE:
            return{
                ...state
            }
        default :
            return state
    }
}

export default reducer