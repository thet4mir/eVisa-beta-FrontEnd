import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Create } from './Create'
import { List } from './List'
import { Update } from './Update'
import { Detail } from './Detail'


export default function Country(props) {
    return (
        <Switch>
            <Route path="/country/" exact component={ List } />
            <Route path="/country/create/" exact component={ Create } />
            <Route path="/country/:id/update/" exact component={ Update } />
            <Route path="/country/:id/detail/" exact component={ Detail }/>
        </Switch>
    )
}
