import React, { Component } from 'react'


function SortIcon(props) {
    if (props.direction == 'asc') {
        return <i className="bi bi-sort-alpha-down"></i>
    } else {
        return <i className="bi bi-sort-alpha-up"></i>
    }
}


export class TableHeader extends Component {

    constructor(props) {
        super(props)
        this.handleSort = this.handleSort.bind(this)
    }

    handleSort(field) {

        const {
            sort_key,
            sort_direction,
        } = this.props

        const direction = (
            field == sort_key
                ? (sort_direction == 'desc' ? 'asc' : 'desc')
                : 'asc'
        )

        this.props.onSort(field, direction)

    }

    render() {

        const {
            sort_key,
            sort_direction,
        } = this.props

        const sortOpts = (field) => ({
            style: { cursor: 'pointer' },
            onClick: (e) => this.handleSort(field),
        })

        return (
            <tr className="text-nowrap">

                <th scope="col" className="text-center"><i className="bi bi-chevron-expand"></i></th>
                <th scope="col" { ...sortOpts('number') }>
                    { sort_key == 'number' && <SortIcon direction={ sort_direction }/> }
                    Визийн дугаар
                </th>
                <th scoep="col">Нэр</th>
                <th scope="col" { ...sortOpts('country') }>
                    { sort_key == 'country' && <SortIcon direction={ sort_direction }/> }
                    Улс
                </th>
                <th scope="col">@ Цахим шуудан</th>
                <th scope="col"><i className="bi bi-cash"></i> Визийн төлбөр</th>
                <th scope="col">Визийн төрөл</th>
                <th scope="col" { ...sortOpts('created_at') }>
                    { sort_key == 'created_at' && <SortIcon direction={ sort_direction }/> }
                    Хүсэлт гаргасан цаг
                </th>
                <th scope="col" { ...sortOpts('status') }>
                    { sort_key == 'status' && <SortIcon direction={ sort_direction }/> }
                    Төлөв
                </th>
                <th scope="col">Шийдвэрлэсэн</th>
            </tr>
        )
    }
}
