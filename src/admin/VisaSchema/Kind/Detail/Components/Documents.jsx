import React, {Fragment} from 'react'

export function Documents(props) {

    const items = props.items || []

    return (
        <Fragment>
            { items.map((item, idx) =>
                <ul key={idx} className="list-group list-group-flush">
                        <li className="list-group-item">{ item.name }</li>
                </ul>
            )}
        </Fragment>
    )

}