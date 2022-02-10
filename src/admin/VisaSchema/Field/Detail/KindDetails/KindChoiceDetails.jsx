import React,{ Fragment } from 'react'


export function KindChoiceDetails(props) {

    const items = props.items || []

    return (
        <Fragment>
            <dt className="col-2">Сонгох утга:</dt>
            <dd className="col-10">
                <table className="table table-sm table-hover table-borderless">
                    <tbody>
                        { items.map((item, idx) =>
                            <tr key={ idx} scope="row">
                                <td scope="row">
                                    { item.label ? (item.label) : null}<br/>
                                    (<code>{ item.code_name ? (item.code_name) : null }</code>)
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </dd>
        </Fragment>
    )

}