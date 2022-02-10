import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'


import { List } from './List'
import { Create } from './Create'
import { Detail } from './Detail'
import { Edit } from './Edit'


export default function Field(props) {

    return (
        <Switch>
            <Route path="/visa-schema/field/" exact component={ List }/>
            <Route path="/visa-schema/field/create/" exact component={ Create }/>
            <Route path="/visa-schema/field/:id/detail/" exact component={ Detail }/>
            <Route path="/visa-schema/field/:id/edit/" exact component={ Edit }/>
        </Switch>
    )
}
