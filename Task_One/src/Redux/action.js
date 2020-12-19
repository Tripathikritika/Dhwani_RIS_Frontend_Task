import actionConstant from './actionTypes'
import axios from 'axios'

export const addCardDetailsRequest = payload => ({
    type : actionConstant.ADD_CREDIT_CARD_DETAILS_REQUEST,
    payload
})

export const addCardDetailsSuccess = payload => ({
    type : actionConstant.ADD_CREDIT_CARD_DETAILS_SUCCESS,
    payload
})

export const addCardDetailsFailure = () => ({
    type : actionConstant.ADD_CREDIT_CARD_DETAILS_FAILURE,
})

export const getCardRequest = payload => ({
    type : actionConstant.GET_CREDIT_CARD_DETAILS_REQUEST,
    payload
})

export const getCardSucess = payload => ({
    type : actionConstant.GET_CREDIT_CARD_DETAILS_SUCCESS,
    payload
})

export const getCardFailure = () => ({
    type : actionConstant.GET_CREDIT_CARD_DETAILS_FAILURE,
})


export const getCreditCardDetails= ( ) => (dispatch)  => {
    dispatch( getCardRequest() )
    axios.get(`http://localhost:5000/userInfo`)
        .then((res) => {
            dispatch(getCardSucess(res.data))
        })
        .catch((err) => dispatch(getCardFailure(err)))
}

export const postCreditCardDetails= ( payload ) => (dispatch)  => {
    dispatch( addCardDetailsRequest() )
    axios.post(`http://localhost:5000/userInfo`,{
        cardNumber: payload.cardNumber,
        cardHolderName : payload.cardHolderName,
        expiryDate : payload.expiryDate,
        expiryMonth : payload.expiryMonth,
        bankName : payload.bankName
    })
        .then((res) =>{
            console.log(res.data)
            dispatch(addCardDetailsSuccess(res.data))
        })
        .catch((err) => {
            console.log(err)
            dispatch(addCardDetailsFailure())
        })
}

export const deleteCardDetailsRequest = () => ({
    type : actionConstant.DELETE_CREDIT_CARD_DETAILS_REQUEST,
})

export const deleteCardDetailsSuccess = payload => ({
    type : actionConstant.DELETE_CREDIT_CARD_DETAILS_SUCCESS,
    payload
})

export const deleteCardDetailsFailure = () => ({
    type : actionConstant.DELETE_CREDIT_CARD_DETAILS_FAILURE,
})

export const deleteCreditCardDetails = ( payload ) => ( dispatch ) => {
    dispatch(deleteCardDetailsRequest())
    axios.delete(`http://localhost:5000/userInfo/${payload}`)
        .then(() =>  dispatch(deleteCardDetailsSuccess(payload)))
        .catch(err => dispatch(deleteCardDetailsFailure(err)))
        
}
