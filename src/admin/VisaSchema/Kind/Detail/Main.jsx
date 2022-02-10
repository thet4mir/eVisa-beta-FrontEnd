import React from 'react'

import { Documents } from './Components/Documents'
import { DiscountList } from './Components/DiscountList'
import { VisaExemptCountries } from './Components/VisaExemptCountries'
import { FeeExemptCountries } from './Components/FeeExemptCountries'

import { KindOptions } from '@/options'


export function Main(props) {

    const {
        item: {
            fee_exempt_countries,
            visa_exempt_countries,
            documents,
            discount_list,
            ...item
        }
    } = props

    const { language }= props

    const {
        entry_kind,
    } = item

    return (
        <div className="card mb-3">
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
                        <div className="row">

                            <div className="col-8">

                                <dl className="row">
                                    <dt className="col-4">Визийн ангилал:</dt>
                                    <dd className="col-8">{  item.title}</dd>

                                    <dt className="col-4">Товч нэр:</dt>
                                    <dd className="col-8">{  item.code_name}</dd>

                                    <dt className="col-4">Хүчинтэй хугацaa:</dt>
                                    <dd className="col-8"><span className="badge bg-primary">{ item.days_valid } хоног</span> </dd>

                                    <dt className="col-4">Байх хугацаа:</dt>
                                    <dd className="col-8"><span className="badge bg-success ">{ item.days_stay } хоног</span></dd>

                                    <dt className="col-4">Үйлчилгээний хураамж:</dt>
                                    <dd className="col-8"><code>{ item.fee_person }$/хүн</code></dd>

                                    <dt className="col-4">Төрөл:</dt>
                                    <dd className="col-8">
                                        { KindOptions.entry_kinds.options[entry_kind] }
                                    </dd>

                                    <dt className="col-4">Тайлбар:</dt>
                                    <dd className="col-8">{ item.description }</dd>

                                    <dt className="col-4">Хөнгөлөлт:</dt>
                                    <dd className="col-8">
                                        <DiscountList items={ discount_list }/>
                                    </dd>

                                    <dt className="col-4">Төлбөргүй зорчих улс:</dt>
                                    <dd className="col-8">
                                        <FeeExemptCountries items={ fee_exempt_countries } />
                                    </dd>

                                    <dt className="col-4">Идэвхитэй эсэх:</dt>
                                    <dd className="col-8">
                                        { item.is_active
                                            ?
                                                <small className="text-muted">
                                                    <strong>Идэвхитэй</strong>.
                                                </small>
                                            :
                                                <small className="text-muted">
                                                    <div className="alert alert-warning col-5">
                                                        Визийн хүсэлт хүлээн авахгүй
                                                    </div>
                                                </small>
                                        }

                                        <p>
                                            <button
                                                className="btn btn-outline-secondary btn-sm mt-3"
                                                onClick={ props.onToggleActive }
                                            >
                                                <i className={ item.is_active ? 'bi-eye-slash-fill' : 'bi-eye-fill' }></i>
                                                { item.is_active ? ' Идэвхигүй болгох' : ' Идэвхитэй болгох'}
                                            </button>
                                        </p>
                                    </dd>

                                    <dt className="col-4">Зөвшөөрөх бичиг баримт</dt>
                                    <dd className="col-8">
                                        <Documents items={ documents } />
                                    </dd>

                                    <dt className="col-4">Визгүй зорчих улс:</dt>
                                    <dd className="col-8">
                                        <VisaExemptCountries items={ visa_exempt_countries } />
                                    </dd>

                                    <dt className="col-4">Үүсгэсэн:</dt>
                                    <dd className="col-8">
                                        <small className="text-muted">{ item.created_at && item.created_at.substr(0, 16) }</small>
                                    </dd>

                                    <dt className="col-4">Өөрчлөлт:</dt>
                                    <dd className="col-8">
                                        <small className="text-muted">{ item.updated_at && item.updated_at.substr(0, 16) }</small>
                                    </dd>

                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="language-tab-content-1">1</div>
                </div>
            </div>
        </div>

    )

}
