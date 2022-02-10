import React, { Fragment } from 'react'

import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'


export function Table(props) {
    const { items, ...other_props} = props
    return (
        <Fragment>
            <table className="table table-hover">
                <thead>
                    <TableHeader/>
                </thead>
                <tbody>
                        {items.map((item, idx) =>
                            <TableRow key={idx}
                                idx={idx + 1}
                                item={item}
                                {...other_props}
                            />
                        )}
                </tbody>
            </table>
        </Fragment>

    )
}
