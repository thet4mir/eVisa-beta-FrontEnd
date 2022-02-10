import React from 'react'


export function TableHeader(props) {
    return (
        <tr>
            <th scope="col" className="text-center"><i className="bi bi-chevron-expand"></i></th>
            <th scope="col">Нэр</th>
            <th scope="col"><i className="bi bi-flag"></i> Нэр (тухайн хэлээр) </th>
            <th scope="col"><i className="bi bi-code-slash"></i> Хэлний код</th>
            <th scope="col"><i className="bi bi-clock"></i> Үүсгэсэн</th>
        </tr>
    )
}
