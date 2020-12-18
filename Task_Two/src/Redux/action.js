import actionConstant from './actionTypes'
import axios from 'axios'

export const addCardDetailsRequest = payload => ({
    type : actionConstant.USER_CREDIT_CARD_REQUEST,
    payload
})

export const addCardDetailsSuccess = payload => ({
    type : actionConstant.USER_CREDIT_CARD_SUCCESS,
    payload
})

export const addCardDetailsFailure = payload => ({
    type : actionConstant.USER_CREDIT_CARD_FAILURE,
    payload
})

export const getCreditCardDetails= ( ) => (dispatch)  => {
    dispatch( addCardDetailsRequest() )
    axios.get(`http://localhost:3000/userInfo`)
        .then((res) => {
            dispatch(addCardDetailsSuccess())
        })
        .catch((err) => dispatch(addCardDetailsFailure(err)))
}

export const postCreditCardDetails= ( payload ) => (dispatch)  => {
    dispatch( addCardDetailsRequest() )
    axios.post(`http://localhost:3000/userInfo`,{
        cardNumber: payload.query,
        cardHolderName : payload.cardHolderName,
        expiryDate : payload.expiryDate
    })
        .then((res) =>{
            console.log(res.data)
            dispatch(addCardDetailsSuccess(res.data))
        })
        .catch((err) => dispatch(addCardDetailsFailure()))
}