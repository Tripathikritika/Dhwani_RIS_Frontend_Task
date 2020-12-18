import React, {useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { useDispatch  } from "react-redux"
import { getCreditCardDetails, postCreditCardDetails} from '../Redux/action'
import styles from '../Styling/PinComponent.module.css'



function PinComponent(props) {
   
    let values =  new Array(props.length).fill("")
    const [query,setQuery] = useState("")
    const [show,setShow] = useState(false)
    const [userCard , setUserCard] = useState({cardHolderName : "" ,expiryDate : "" })
    const dispatch = useDispatch()
    let textInput = []
    let numValue = []

    const handleDelete = () => {
        
        values =  new Array(props.length).fill("")
        for( let i = 0 ; i < props.length ; i++){
            textInput[i].value = ""
        }
        setShow(false)
        setQuery([])
    }
    useEffect(() => {
        dispatch(getCreditCardDetails())
        
    }, [])
    const handleChange = ( e ,i) => {
        numValue[i] = e.target.value
        values[i] = e.target.value;
        if( values[i].length === Number(4) && i < 3){
            textInput[i+1].focus()
        }  
        console.log(query)
    }
    const handleInputChange =  (e) => {
        setUserCard({
            ...userCard,
            [e.target.name] : e.target.value
        })
    }
    const handleKeyDown = ( e , i) => {
        if( e.keyCode === Number(8) ){
            if(values[i].length === 0 && i > 0){

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

        if(sLength % 4 === 0){
            textInput[i].focus();
        }
        else{
            textInput[i].focus();
            
        }
       
        stringIterator += inputLimitLength;
        i++;
        props.onChange(values.join(""));
        e.preventDefault()
    }
        // let cardNumber = e.clipboardData.getData("text").split("")
       
        // console.log("Hey")
        // let i = 0
        // let j = 0
        // while( j < cardNumber.length ){
        //     values[i] += cardNumber[j]
        //         j++
        //         if( j % 4 === 0){
        //             textInput[i].value = values[i]
        //             i++
        //         }
        // }
        // if( i < 3 && textInput[i].value.length === Number(4)){
        //     textInput[i+1].focus()
        // } 
        // else if( i < 3){
        //     textInput[i].focus()
        // }
        // else{
        //     textInput[3].focus()
        // }
        setQuery([...values])
    }
    

    const handleSubmit = ( e ) => {
        e.preventDefault()
       console.log(query)
        dispatch(postCreditCardDetails({cardNumber : query  ,cardHolderName : userCard.cardHolderName ,expiryDate : userCard.expiryDate }))
    }

    const handleButtonSubmit = ( e ) => {
        if( numValue.length !== 0){
            setQuery( numValue )
        }
        if( query.length > 4){
            setQuery(query.splice(0,4)) 
        }
        setShow(true)
    }
    return (
        <>
        
            <div className={`${styles.dotted}`}>
                <form onSubmit={handleSubmit}>
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
                    <div className={`${styles.cardHolderDiv}`}>
                        <input type="text" className={`${styles.cardHolderName}`} placeholder="Card Holders Name"  name ="cardHolderName" value = {userCard.cardHolderName}  onChange = {(e) => handleInputChange(e)}/>
                        <input type="text" className={`${styles.cardExpiryDate}`}   value = {userCard.expiryDate} name = "expiryDate" placeholder="Expiry Date" onChange = {(e) => handleInputChange(e)}/>
                    </div>
                    <input type="submit" value="Submit"  onClick={handleButtonSubmit}/>
                </form>
            
            </div>
            <div >

            {show && 
            <>
                <div className={`${styles.tableDiv}`}>
                    <div>Sl.No</div>
                    <div>Holder Name</div>
                    <div>Card Number</div>
                    <div>Expiry Date</div>
                </div>
                <h1>{ query}</h1>
                
                <button onClick = {handleDelete} >Del</button>
            </>}
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