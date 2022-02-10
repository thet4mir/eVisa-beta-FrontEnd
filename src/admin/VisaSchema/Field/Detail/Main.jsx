import React from 'react'

import { FieldOptions } from '@/options'
import { Preview } from '../Preview'
import { KindDetails } from './KindDetails'


export function Main(props) {

    const { language, item } = props
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-9">

                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs" role="tablist">
                                {language.map((lang, idx) =>
                                    <li className="nav-item" key={ idx }>
                                        <button className={ "nav-link" + (idx == 0 ? ' active' : '')}
                                        data-bs-toggle="tab"
                                        data-bs-target={ `#language-tab-content-${idx}` }
                                        type="button"
                                        >
                                            {lang.name_local}
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content p-0 m-0">
                                { language.map((lang, idx) =>
                                    <div key={ idx }
                                    className={ "tab-pane" + (idx == 0 ? ' active' : '') }
                                    id={ `language-tab-content-${idx}` }
                                    >
                                        <p>{lang.name}</p>
                                    </div>

                                )}
                                <div className="tab-pane active" id="language-tab-content-0">
                                    <dl className="row">

                                        <dt className="col-2">Төрөл:</dt>
                                        <dd className="col-10">
                                            { FieldOptions.kinds.options[item.kind] }
                                        </dd>

                                        <dt className="col-2">Талбарын нэр:</dt>
                                        <dd className="col-10">
                                            { item.label }
                                        </dd>

                                        <dt className="col-2">Код:</dt>
                                        <dd className="col-10">
                                            <code className="bg-light px-1 border rounded-1">
                                                { item.code_name }
                                            </code>
                                        </dd>

                                        <dt className="col-2">Тайлбар:</dt>
                                        <dd className="col-10">
                                            { item.description }
                                        </dd>

                                        <dt className="col-2">Заавал оруулах:</dt>
                                        <dd className="col-10">
                                            <div> { item.is_required ? "Тийм" : "Үгүй" } </div>
                                            <small className="text-danger">{ item.is_required_error }</small>
                                        </dd>

                                        <KindDetails kind={ item.kind } items={item.options} values={item}/>

                                        <dt className="col-2">Үүсгэсэн:</dt>
                                        <dd className="col-10">
                                            <small className="text-muted">{ item.created_at }</small>
                                        </dd>

                                        <dt className="col-2">Зассан:</dt>
                                        <dd className="col-10">
                                            <small className="text-muted">{ item.updated_at }</small>
                                        </dd>

                                    </dl>
                                </div>
                                <div className="tab-pane" id="language-tab-content-1">1</div>
                            </div>
                            <dl className="row"></dl>
                        </div>
                    </div>

                </div>
                <div className="col-3">
                    <Preview values={ item }/>
                </div>
            </div>
        </div>
    )
}
