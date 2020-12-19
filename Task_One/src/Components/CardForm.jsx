import React, { useState } from 'react'
import styles from '../Styling/Form.module.css'
import PinComponent from './PinComponent'

export default function CardForm() {

    const [value, setValue] = useState("")
    
    const onChange = () => {
        setValue(value)
    }
    
    return (
        <div className={`${styles.creditCardOuterDiv}`}>
            <div className={`${styles.creditCardDiv}`}>
                <PinComponent length = {4}  name="cardNumber" onChange={onChange}/>
            </div>
        </div>
    )
}
