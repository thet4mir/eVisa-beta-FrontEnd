import React from 'react'


export function Main(props) {
    const { item } = props
    return (
        <dl className="row">

            <dt className="col-2">Улсын нэр:</dt>
            <dd className="col-10">
                <strong>{ item.name }</strong>
            </dd>

            <dt className="col-2">Үндэстэн:</dt>
            <dd className="col-10">
                { item.nationality }
            </dd>

            <dt className="col-2">Alpha 2 code:</dt>
            <dd className="col-10">
                <code class="bg-light px-1 border rounded-1">{ item.code_alpha2 }</code>
            </dd>

            <dt className="col-2">Alpha 3 code:</dt>
            <dd className="col-10">
                <code class="bg-light px-1 border rounded-1">{ item.code_alpha3 }</code>
            </dd>

            <dt className="col-2">Numeric code:</dt>
            <dd className="col-10">
                <code class="bg-light px-1 border rounded-1">{ item.code_numeric }</code>
            </dd>

            <dt className="col-2">Харагдах эсэх:</dt>
            <dd className="col-10">
                { item.is_active
                    ?
                        <small className="text-muted">
                            <strong>идэвхитэй</strong>.
                        </small>
                    :
                        <small className="text-muted">
                            <strong>идэвхигүй</strong>.
                        </small>
                }
                <p>
                    <button
                        className="btn btn-outline-secondary btn-sm mt-3"
                        onClick={ props.onToggleActive }
                    >
                        <i className={ item.is_active ? 'bi-eye-slash-fill' : 'bi-eye-fill' }></i>
                        { item.is_active ? ' нуух' : ' харуулах'}
                    </button>
                </p>
            </dd>

            <dt className="col-2">Үүсгэсэн:</dt>
            <dd className="col-10">
                <small className="text-muted">{ item.created_at }</small>
            </dd>

            <dt className="col-2">Зассан:</dt>
            <dd className="col-10">
                <small className="text-muted">{ item.updated_at }</small>
            </dd>

        </dl>
    )
}
