import React, { Component  } from 'react'
import { Switch, Route } from 'react-router-dom'

import { List } from './List'
import { Detail } from './Detail'

export default function VisaRequest(props) {
    return (
        <Switch>
            <Route path="/visarequest/" exact component={ List } />
            <Route path="/visarequest/:id/" exact component={ Detail }/>
        </Switch>
    )
}
