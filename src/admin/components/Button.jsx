import React from 'react'

import { Link } from 'react-router-dom'


export function Button(props) {

    if (props.to) {
        return (
            <Link { ...props }>
                { props.children }
            </Link>
        )
    }

    if (props.onClick) {
        return (
            <button { ...props }>
                { props.children }
            </button>
        )
    }

    return null
}
