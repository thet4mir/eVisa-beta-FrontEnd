import React,{ Fragment } from 'react'

export function Fields(props) {

    const items = props.items || []

    return (
        <Fragment>
            <table className="table table-hover table-sm table-borderless">
                <tbody>
                    { items.map((item, idx) =>(
                        <tr key={idx}>
                            <td className="col-6 text-wrap"> { item.label } <code> ({ item.code_name }) </code> </td>
                            <td className="col-6 align-middle">: { item.value ? item.value : "Хоосон утга!" }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}
