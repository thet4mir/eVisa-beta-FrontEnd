import React, { Component, Fragment } from 'react'

import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'



export class Table extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {
            total_record,
            total_approve,
            total_decline,
            total_new,
            items,
            sort_key,
            sort_direction,
        } = this.props

        return (
            <Fragment>
                <div className="text-end mt-2 mb-1">
                    <span className="badge bg-warning rounded-pill">Шинэ хүсэлт - {total_new}</span> {}
                    <span className="badge bg-success rounded-pill">Зөвшөөрсөн - {total_approve}</span> {}
                    <span className="badge bg-secondary rounded-pill">Татгалзсан - {total_decline}</span> {}
                    <span className="badge bg-info rounded-pill">Нийт - {total_record}</span> {}
                </div>
                <table className="table table-hover">
                    <thead>
                        <TableHeader
                            sort_key={ sort_key }
                            sort_direction={ sort_direction }
                            onSort={ this.props.onSort }
                            />
                    </thead>
                    <tbody>
                        {items.map((item, idx) =>
                            <TableRow
                                key={ idx }
                                idx={ idx + 1 }
                                item={item}
                            />
                        )}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
