import { Route  } from 'react-router-dom'
import { Switch } from 'react-router'
import React from 'react'
import CardForm from '../Components/CardForm'
import CreditCard from '../Components/CreditCard'

export default function Routers() {
    return (
        <div>
            <Switch>
                <Route path ="/" exact render={() => <CardForm />} /> 
                <Route path ="/cardList" exact render={() => <CreditCard />} /> 
            </Switch>
        </div>
    )
}
