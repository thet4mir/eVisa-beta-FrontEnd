import React from "react"

import { Row } from './Row'


export function Accordion(props) {

    const {
        rows,
        id,
    } = props

    const parent_id = props.id

    return (
        <div className="accordion" id="faq-list">
            { props.rows.map((row, idx) =>
                <Row data={ row } key={ idx }
                    parent_id={ parent_id }
                    unique_id={ `${parent_id}-${idx}` }
                />
            )}
        </div>
    )
}
