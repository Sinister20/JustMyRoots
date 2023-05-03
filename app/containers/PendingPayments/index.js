import React from "react"
import { Switch, Route } from "react-router-dom"
import PaymentViewPage from "./page/PaymentViewPage"

const PendingPayments = () => {
    return <Switch>
        <Route exact path="/pending-payment" component={PaymentViewPage} />

    </Switch>
}
export default PendingPayments