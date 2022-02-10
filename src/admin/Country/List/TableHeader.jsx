import React from 'react'


export function TableHeader(props) {
    return (
        <tr className="text-nowrap">
            <th scope="col" className="text-center"><i className="bi bi-chevron-expand"></i></th>
            <th scope="col"><i className="bi bi-flag"></i> Улсын нэр</th>
            <th scope="col"><i className="bi bi-flag-fill"></i> Үндэстэн</th>
            <th scope="col">Alpha 2 code</th>
            <th scope="col">Alpha 3 code</th>
            <th scope="col">Numeric code</th>
            <th scope="col"><i className="bi bi-clock"></i> Үүсгэсэн</th>
        </tr>
    )
}
