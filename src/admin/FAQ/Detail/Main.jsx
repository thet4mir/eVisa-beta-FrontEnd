import React,{ Fragment } from 'react'


export function Main(props) {
    const { item, language } = props

    return (
        <Fragment>

            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs" role="tablist">
                        {language.map((lang, idx) =>
                            <li className="nav-item" key={ idx }>
                                <button className={ "nav-link" + (idx == 0 ? ' active' : '') }
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
                                <dt className="col-2">Дугаар:</dt>
                                <dd className="col-10">
                                    <p>#{ item.sort_order + 1 }</p>
                                </dd>

                                <dt className="col-2">Асуулт:</dt>
                                <dd className="col-10">
                                    <strong>{ item.question }</strong>
                                </dd>

                                <dt className="col-2">Хариулт:</dt>
                                <dd className="col-10">
                                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                                </dd>

                                <dt className="col-2">Харагдах эсэх:</dt>
                                <dd className="col-10">
                                    { item.is_active
                                        ?
                                            <small className="text-muted">
                                                Сайтын түгээмэл асуултуудын хэсэгт <strong>харагдана</strong>.
                                            </small>
                                        :
                                            <small className="text-muted">
                                                Сайтын түгээмэл асуултуудын хэсэгт <strong>харагдахгүй</strong>.
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
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
