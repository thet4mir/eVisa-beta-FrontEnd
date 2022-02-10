import React from 'react'


export function TableHeader(props) {
    return (
        <tr>
            <th scope="col" className="text-center"><i className="bi bi-chevron-expand"></i></th>
            <th scope="col"><i className="bi bi-question-circle"></i> Question</th>
            <th scope="col" className="col-1 text-center"><i className="bi bi-filter"></i> Sort</th>
        </tr>
    )
}
