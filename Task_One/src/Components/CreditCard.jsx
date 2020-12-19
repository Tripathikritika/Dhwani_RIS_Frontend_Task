import React,{useEffect} from 'react'
import styles from '../Styling/CreditCard.module.css'
import {getCreditCardDetails, deleteCreditCardDetails} from '../Redux/action'
import { useDispatch,useSelector  } from "react-redux"
import {  useHistory } from 'react-router-dom';

export default function CreditCard() {
    const cardUserInfo = useSelector(state => state.cardUserInfo)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getCreditCardDetails())
    }, [])
    console.log(cardUserInfo)
    const handleSingleDelete = (id) => {
        dispatch(deleteCreditCardDetails(id))
    }

    const handleBackButton = () => {
       return history.push("/")
    }
    return (
        <div className={`${styles.creditCardDiv}`}>
            <div >
                <div  className={styles.buttonDiv}>
                    <button className={styles.backButton} onClick={handleBackButton}>
                    <i className="fas fa-arrow-circle-left"></i>
                    </button>
                </div>
             
                {
                cardUserInfo && cardUserInfo.length > 0 && cardUserInfo.map((item) =>  
                    <div className={`${styles.creditCardOuter}`} key={item.id}>
                        <div className={styles.bankName}>
                            { item.bankName}
                        </div>
                        <div>
                            <img src="./chip.png" alt="Chip" width='100px'/>
                        </div>
                        <div className={styles.cardNumber}>
                            <div>{item.cardNumber}</div>
                        </div>
                       
                        <div className={styles.cardHolderName}>
                            <div>{item.cardHolderName}</div>
                            <div className={styles.expiryDates}>
                                <div>{item.expiryDate} /</div>
                                <div>{item.expiryMonth}</div>
                            </div>
                        </div>
                        <div onClick={() => handleSingleDelete(item.id)} className={styles.deleteButton}><i className="fas fa-trash"></i></div>
                    </div>
                )}
            </div>
        </div>
    )
}