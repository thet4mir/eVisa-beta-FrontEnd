import React,{ Fragment } from 'react'

import { Fields } from './Fields'


export function Main(props) {

    const {
        item: {
            fields,
            ...item
        }
    } = props

    return (
        <Fragment>

            <div className="mb-3">

                <dl className="row">
                    <dt className="col-2">Бичиг баримтын нэр:</dt>
                    <dd className="col-10">{ item.name }</dd>

                    <dt className="col-2">Талбарууд:</dt>
                    <dd className="col-10">
                        <Fields items={ fields }/>
                    </dd>
                    <dt className="col-2">Идэвхитэй эсэх:</dt>
                    <dd className="col-10">
                        { item.is_active
                            ?
                                <small className="text-muted">
                                    <strong>Идэвхитэй</strong>
                                </small>
                            :
                                <small className="text-muted">
                                    <div className="alert alert-warning col-3">
                                        Энэ бичиг баримт идэвхигүй байна!
                                    </div>
                                </small>
                        }
                        <p>
                            <button
                                className="btn btn-outline-secondary btn-sm mt-3"
                                onClick={ props.onToggleActive }
                            >
                                <i className={ item.is_active ? 'bi-eye-slash-fill' : 'bi-eye-fill'}></i>
                                { item.is_active ? ' Идэвхигүй болгох ' : ' Идэвхитэй болгох ' }
                            </button>
                        </p>
                    </dd>

                    <dt className="col-2">Үүсгэсэн:</dt>
                    <dd className="col-10">
                        { item.created_at &&
                            <small className="d-block text-muted">
                                { item.created_at.substr(0, 16) }
                            </small>
                        }
                    </dd>

                    <dt className="col-2">Зассан:</dt>
                    <dd className="col-10">
                        { item.updated_at &&
                            <small className="d-block text-muted">
                                { item.updated_at.substr(0, 16) }
                            </small>
                        }
                    </dd>
                </dl>

            </div>

        </Fragment>
    )
}
