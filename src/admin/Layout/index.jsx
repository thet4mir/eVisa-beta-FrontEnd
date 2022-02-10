import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { Menu } from './Menu'
import './style.css'

export class Layout extends Component {

    render() {
        const { current_user } = this.props
        return (
            <div className="admin-layout">
                { current_user.is_authenticated &&
                    <Menu current_user={current_user}/>
                }
                <main role="main" className="mt-3">
                    { this.props.children }
                </main>
            </div>
        )
    }

}
