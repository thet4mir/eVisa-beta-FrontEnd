import React from 'react'

export function DiscountList(props) {

    const items = props.items || []

    return (
        <table className="table table-sm">

            <tbody>
                { items.map((item, idx) =>
                    <tr key={ idx }>
                        <td scope="row">{ item.num_person }-аас доошгүй хүн { item.percent } % хямдарна</td>
                        <td scope="row"></td>
                    </tr>
                )}
            </tbody>
        </table>
    )

}