import React,{useEffect} from 'react'
import styles from '../Styling/CreditCard.module.css'
import {getCreditCardDetails, deleteCreditCardDetails} from '../Redux/action'
import { useDispatch,useSelector  } from "react-redux"

export default function CreditCard() {
    const cardUserInfo = useSelector(state => state.cardUserInfo)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getCreditCardDetails())
    }, [])
    console.log(cardUserInfo)
    const handleSingleDelete = (id) => {
        dispatch(deleteCreditCardDetails(id))
    }

    return (
        <div className={`${styles.creditCardDiv}`}>
            <div >
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
                        <div onClick={() => handleSingleDelete(item.id)} className={styles.deleteButton}><i class="fas fa-trash"></i></div>
                    </div>
                )}
            </div>
        </div>
    )
}