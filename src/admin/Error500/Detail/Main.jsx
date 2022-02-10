import React from 'react'


function Headers(props) {

    const headers = Object.entries(
            JSON.parse(props.headers)
        )

    return (
        <table className="table table-sm">
            <tbody>
                { headers.map(([ key, value ], idx) =>
                    <tr key={ idx }>
                        <th>{ key }</th>
                        <td>{ value }</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}


function PayloadPost(props) {

    const payload = Object.entries(
            JSON.parse(props.payload)
        )

    return (
        <table className="table table-sm">
            <tbody>
                { payload.map(([ key, value ], idx) =>
                    <tr key={ idx }>
                        <th>{ key }</th>
                        <td>{ value }</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}


function PayloadBody(props) {

    const payload = Object.entries(
            JSON.parse(props.payload)
        )

    return (
        <table className="table table-sm">
            <tbody>
                { payload.map(([ key, value ], idx) =>
                    <tr key={ idx }>
                        <th>{ key }</th>
                        <td>{ JSON.stringify(value) }</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}


function Description(props) {

    const { description } = props
    return (
        <pre>
            { description }
        </pre>
    )
}


export function Main(props) {
    const { item } = props
    return (
        <dl className="row">

            <dt className="col-2">ID:</dt>
            <dd className="col-10">
                {item.id }
            </dd>

            <dt className="col-2">Scheme:</dt>
            <dd className="col-10">
                {item.request_scheme}
            </dd>

            <dt className="col-2">Method:</dt>
            <dd className="col-10">
                { item.request_method == 'POST' &&
                    <span className="badge bg-success">POST</span>
                }
                { item.request_method == 'GET' &&
                    <span className="badge bg-info">GET</span>
                }
            </dd>

            <dt className="col-2">Url:</dt>
            <dd className="col-10">
                <code> { item.request_url } </code>
            </dd>

            <dt className="col-2">Үүсгэсэн:</dt>
            <dd className="col-10">
                <small className="text-muted">
                    { item.created_at && item.created_at.substr(0, 16) }
                </small>
            </dd>


            <dt className="col-2">Headers:</dt>
            <dd className="col-10">
                { item.request_headers &&
                    <Headers headers={ item.request_headers }/>
                }
            </dd>

            <dt className="col-2">Payload (POST):</dt>
            <dd className="col-10">
                { item.request_data &&
                    <PayloadPost payload={ item.request_data }/>
                }
            </dd>

            <dt className="col-2">Payload (body):</dt>
            <dd className="col-10">
                { item.request_body &&
                    <PayloadBody payload={ item.request_body }/>
                }
            </dd>

            <dt className="col-2">Description:</dt>
            <dd className="col-10">
                { item.description &&
                    <Description description={ item.description }/>
                }
            </dd>

        </dl>
    )
}
