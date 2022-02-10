import React from 'react'


export function Main(props) {
    const { item } = props
    return (
        <dl className="row">

            <dt className="col-2">Дугаар:</dt>
            <dd className="col-10">
                <p>#{ item.id }</p>
            </dd>

            <dt className="col-2">Хэрэглэгчийн нэр:</dt>
            <dd className="col-10">
                <p>{ item.username }</p>
            </dd>

            <dt className="col-2">Нэр:</dt>
            <dd className="col-10">
                <p>{ item.first_name }</p>
            </dd>

            <dt className="col-2">Овог:</dt>
            <dd className="col-10">
                <p>{ item.last_name }</p>
            </dd>

            <dt className="col-2">Role:</dt>
            <dd className="col-10">
                { item.is_superuser
                    ?   <span className="badge rounded-pill bg-success"><i className="bi bi-toggle-on"></i> Админ</span>
                    :   <span className="badge rounded-pill bg-secondary"><i className="bi bi-toggle-off"></i> Хэрэглэгч</span>
                }
            </dd>

            <dt className="col-2">Үүсгэсэн:</dt>
            <dd className="col-10">
                <small className="text-muted">{ item.date_joined }</small>
            </dd>

            <dt className="col-2">Зассан:</dt>
            <dd className="col-10">
                <small className="text-muted">{ item.updated_at }</small>
            </dd>

        </dl>
    )
}
