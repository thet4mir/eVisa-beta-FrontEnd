import React from 'react'


export function List(props) {
    const { used, unused, total } = props.data
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col"> Ашигласан тоо </th>
                    <th scope="col"> Ашиглаагүй тоо </th>
                    <th scope="col"> Нийт тоо </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{ used } </th>
                    <th>{ unused }</th>
                    <th>{ total }</th>
                </tr>
            </tbody>
        </table>
    )
}
