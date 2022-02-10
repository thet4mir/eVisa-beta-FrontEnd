import React from 'react'



export function TableHeader(props) {
    return (
        <tr>
            <th scope="col" className="text-center"><i className="bi bi-chevron-expand"></i></th>
            <th scope="col"><i className="bi bi-file-earmark-richtext"></i> Бичиг баримтын нэр</th>
            <th scope="col"><i className="bi bi-clock"></i> Үүсгэсэн</th>
            <th scope="col"><i className="bl bi-clock-fill"></i> Зассан</th>
        </tr>
    )
}