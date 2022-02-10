import React from 'react'

import { Button } from './Button'


export function ButtonView(props) {
    return (
        <Button className="btn btn-outline-primary" { ...props }>
            <i className="bi bi-eye"></i> Харах
        </Button>
    )
}
