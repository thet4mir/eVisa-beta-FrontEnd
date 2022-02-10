import React, {Fragment} from 'react'



export function FeeExemptCountries(props) {

    const items = props.items || []

    return (
        <Fragment >
            <ul>
            { items.map((item, idx) =>
                <li key={ idx }>{item.name}</li>
            )}
            </ul>
        </Fragment>
    )

}
