import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { List } from './List'
import { Detail } from './Detail'
import { Edit } from './Edit'
import { Create } from './Create'


export default function FAQ(props) {
    return (
        <Switch>
            <Route path="/faq/" exact component={ List }/>
            <Route path="/faq/create/" exact component={ Create }/>
            <Route path="/faq/:id/detail/" exact component={ Detail }/>
            <Route path="/faq/:id/edit/" exact component={ Edit }/>
        </Switch>
    )
}
