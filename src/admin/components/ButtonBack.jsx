import React from 'react'

import { Button } from './Button'

export function ButtonBack(props) {
    return (
        <Button { ...props } className="btn btn-outline-primary">
            <i className="bi-chevron-double-left"></i> Буцах
        </Button>
    )
}
