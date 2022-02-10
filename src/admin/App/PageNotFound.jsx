import React from 'react'

import { useHistory } from "react-router-dom"


export default function PageNotFound(props) {
    let history = useHistory()

    function goBack(e) {
        e.preventDefault()
        history.goBack()
    }

    return (
        <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">404 Not Found</h4>
            <p>
                The page you requested doesn't exist!
                {} <a href="#" onClick={ goBack }>Click here</a> to go back.
            </p>
        </div>
    )
}
