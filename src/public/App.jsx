import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Main } from "./Main"


export default class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Switch>
                    {/* last route for default component  */}
                    <Route path="/" component={ Main }/>
                </Switch>
            </div>
        )
    }

}
