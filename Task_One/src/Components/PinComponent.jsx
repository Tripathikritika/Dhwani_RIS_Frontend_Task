import React, { useState } from 'react'
import PropTypes from "prop-types";
import { useDispatch  } from "react-redux"
import { postCreditCardDetails} from '../Redux/action'
import styles from '../Styling/PinComponent.module.css'
import {  useHistory } from 'react-router-dom';

function PinComponent(props) {
    let values =  new Array(props.length).fill("")
    const [query,setQuery] = useState([])
    const [userCard , setUserCard] = useState({cardHolderName : "" ,expiryDate : "" ,expiryMonth : "" , cvv : "" ,bankName : ""})
    const dispatch = useDispatch()
    const history = useHistory()
    let textInput = []
    let numValue = []
   
    const handleChange = ( e ,i) => {
        numValue[i] = e.target.value
        values[i] = e.target.value;
        
        if( values[i].length === Number(4) ){
            setQuery([...query , values[i]])
            if( i < 3){
                textInput[i+1].focus()
            }
        }  
    }

    const handleInputChange =  (e) => {
        setUserCard({
            ...userCard,
            [e.target.name] : e.target.value
        })
    }

    const handleKeyDown = ( e , i) => {
        if( e.keyCode === Number(8) ){
        
            if(textInput[i].value.length === 0 && i > 0 ){
                textInput[i-1].focus()
            }
        }  
    }

    const handlePaste = ( e ,i) => {
        let stringPasted = e.clipboardData.getData("text");
        let sLength = stringPasted.length;
		let { length: inputLength, inputLimitLength } = props;
        let stringIterator = 0
        
		while (stringIterator < sLength && i < inputLength) {
            const inputString = stringPasted.slice(
            stringIterator,
            stringIterator + inputLimitLength
            );
        
            textInput[i].value = inputString
            values[i] = inputString

            if(sLength % 4 === 0 && i < 3){
                textInput[i+1].focus();
            }
            else{
                textInput[i].focus();
                
            }
            stringIterator += inputLimitLength;
            i++;
            props.onChange(values.join(""));
            e.preventDefault()
        }
        setQuery([...values])
    }
    
    const handleSubmit = ( e ) => {
        e.preventDefault()        
        dispatch(postCreditCardDetails({cardNumber : query.join(" ")  ,cardHolderName : userCard.cardHolderName ,expiryDate : userCard.expiryDate ,expiryMonth : userCard.expiryMonth ,cvv : userCard.cvv ,bankName:userCard.bankName }))
        
        for( let i = 0 ; i < props.length ; i++){
            textInput[i].value = ""
        }
        setUserCard({cardHolderName : "" ,expiryDate : "" ,expiryMonth : "" , cvv : "" ,bankName : ""})
        history.push('/cardList')
        
    }

    return (
        <>
            <div >
                <form onSubmit={handleSubmit}>
                    <div className={`${styles.formInputDiv}`}>
                        <div className={`${styles.cardHolderDiv}`}>
                            <input type="text" className={`${styles.cardHolderName}`} placeholder="CARD HOLDER's NAME"  name ="cardHolderName" value = {userCard.cardHolderName}  onChange = {(e) => handleInputChange(e)}/>
                        </div>
                        <div className={`${styles.pinInput}`}>
                            { values && values.map((item , i) => (
                                <input
                                    onKeyDown = {(e) => handleKeyDown(e,i)}
                                    maxLength = "4"
                                    onPaste = {(e) => handlePaste(e,i)}
                                    className = {`${styles.pinComponentInput}`}
                                    onChange = {(e) => handleChange(e , i)}
                                    key={i}
                                    ref={(item) => (textInput[i] = item)}
                                />
                            ))}
                        </div>
                        <div className={`${styles.datesInput}`}>
                            <input type="text" className={`${styles.cardExpiryDate}`}   value = {userCard.expiryDate} name = "expiryDate" placeholder="EXPIRY MONTH" onChange = {(e) => handleInputChange(e)}/>
                            <input type="text" className={`${styles.cardExpiryDate}`}   value = {userCard.expiryMonth} name = "expiryMonth" placeholder="EXPIRY MONTH" onChange = {(e) => handleInputChange(e)}/>
                            <input type="text" className={`${styles.cardExpiryDate}`}   value = {userCard.cvv} name = "cvv" placeholder="CVV" onChange = {(e) => handleInputChange(e)}/>
                        </div>
                        <div className={`${styles.bankNameDiv}`}>
                            <input type="text" className = {`${styles.bankInput}`}   value = {userCard.bankName} name = "bankName" placeholder="BANK NAME" onChange = {(e) => handleInputChange(e)}/>
                        </div>
                        <div>
                            <input type="submit" value="SUBMIT" className={`${styles.submitInput}`}/>
                        </div>
                    </div>
                </form>
            </div>
            <div>
               
            </div>
        </>
    )
}

PinComponent.propTypes = {
    length: PropTypes.number.isRequired,
    inputLimitLength: PropTypes.number
};
  
PinComponent.defaultProps = {
    length: 4,
    inputLimitLength: 4
};

export default PinComponent