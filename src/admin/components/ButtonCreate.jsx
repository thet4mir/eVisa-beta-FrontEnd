import React from 'react'

import { Button } from './Button'


export function ButtonCreate(props) {
    return (
        <Button className="btn btn-outline-primary" { ...props }>
            <i className="bi-plus"></i> Үүсгэх
        </Button>
    )
}
