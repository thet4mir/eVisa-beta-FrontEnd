import React from 'react'


export function TableHeader(props) {
    return (
        <tr>
            <th scope="col" className="text-center">ID</th>
            <th scope="col">Scheme</th>
            <th scope="col">Method</th>
            <th scope="col">URL</th>
            <th scope="col">Үүсгэсэн</th>
        </tr>
    )
}
