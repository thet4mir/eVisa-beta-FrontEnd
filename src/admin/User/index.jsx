import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { List } from './List'
import { Detail } from './Detail'
import { Edit } from './Edit'
import { Create } from './Create'


export default function User(props) {
    return (
        <Switch>
            <Route path="/user/" exact component={ List }/>
            <Route path="/user/create/" exact component={ Create }/>
            <Route path="/user/:id/detail/" exact component={ Detail }/>
            <Route path="/user/:id/edit/" exact component={ Edit }/>
        </Switch>
    )
}
