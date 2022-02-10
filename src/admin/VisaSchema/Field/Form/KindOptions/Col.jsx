import React from 'react'


export function Col(props) {
    return (
        <div className="form-group col-6 mb-3">
            { props.children }
        </div>
    )
}
