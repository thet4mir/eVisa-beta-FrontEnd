import React from 'react'


export function TableHeader(props) {
    return (
        <tr>
            <th scope="col" className="text-center"> <i className="bi bi-chevron-expand"></i> </th>
            <th scope="col"><i className="bi bi-person-bounding-box"></i> Нэвтрэх нэр</th>
            <th scope="col">Нэр</th>
            <th scope="col">Овог</th>
            <th scope="col">Хандах эрх</th>
        </tr>
    )
}
