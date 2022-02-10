import React from 'react'

import { Button } from './Button'


export function ButtonEdit(props) {
    return (
        <Button className="btn btn-outline-primary" { ...props }>
            <i className="bi-pencil-fill"></i> Засах
        </Button>
    )
}
