import React from 'react'
import styles from '../Styling/CreditCard.module.css'
import PinComponent from './PinComponent'

export default function CreditCard() {

    return (
        // Credit Card Component
        <div className={`${styles.creditCardOuterDiv}`}>
            <div className={`${styles.creditCardDiv}`}>
                <div className={`${styles.bankNameDiv}`}>
                    <div className={`${styles.bankName}`}>
                        City Bank
                    </div>
                </div>
                <div className={`${styles.chipDiv}`}>
                    <img src="./chip.png" width='50px' alt=""/>
                </div>
                <PinComponent length = {4}  name="cardNumber"/>
            </div>
        </div>
    )
}
