import React, { Fragment } from 'react'


import { StatusOptions, KindOptions } from '@/options'


function DeadLine(props) {

    const { item } = props
    return (
        <Fragment>
            {Math.round(item.dead_line/60/60) < 12
                ?
                    <h5>
                        <span className="badge bg-danger text-center">
                            {Math.round(item.dead_line/60/60) < 0
                                ?   <div>Хариу өгөх <br/>хугацаа өнгөрсөн</div>
                                :   <div>Хариу өгөхөд <br/>{Math.round(item.dead_line/60/60)} цаг</div>
                            }
                            <br/>   <small>{ item.created_at ? item.created_at.substr(0,16) : null }</small>
                        </span>
                    </h5>
                :
                    <Fragment>
                        {item.status == 1
                            ?   <h5 className="border border-secondary rounded col-6">
                                    <span className="badge text-dark fw-normal">
                                        Хариу өгөхөд <br/>{Math.round(item.dead_line/60/60)} цаг <br/>
                                        <small>{ item.created_at ? item.created_at.substr(0,16) : null }</small>
                                    </span>
                                </h5>
                            : <small>{ item.created_at ? item.created_at.substr(0,16) : null }</small>
                        }
                    </Fragment>
            }
        </Fragment>
    )
}

export function Main(props) {

    const {
        item : {
            discount_list,
            fee_exempt_countries,
            ...item
        }
    } = props

    return (
        <div className="container-fluid px-0">

            <div className="row justify-content-center mb-3 ">

                <div className="col-9">

                    <div className="row mb-3">
                        <div className="col-7">
                            <table className="table table-sm table-hover table-borderless mt-3">
                                <tbody>
                                    <tr>
                                        <td className="col-6">Визийн дугаар</td>
                                        <td className="col-6">: {item.number}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Цахим шуудан</td>
                                        <td className="col-6 text-break">: { item.created_by }</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Улс</td>
                                        <td className="col-6">: { item.country }</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Бичиг баримт</td>
                                        <td className="col-6">: { item.document }</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Ирэх огноо</td>
                                        <td className="col-6">: {item.date_of_arrival}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Утас</td>
                                        <td className="col-6">: {item.phone_no}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-6">Хаяг</td>
                                        <td className="col-6">: {item.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-5">
                            <div className="card">
                                <div className="card-header"> <h6>{ item.visa_kind }</h6> </div>
                                <div className="card-body">
                                    <p>Визийн төрөл : { KindOptions.entry_kinds.options[item.entry_kind] }</p>

                                    <p>Хүчинтэй хугацaa : <span className="badge bg-primary">{item.days_valid} хоног</span></p>

                                    <p>Байх хугацаа : <span className="badge bg-success">{item.days_stay} хоног</span></p>

                                    <p>Хураамж : <code>{ item.fee_person }$/хүн</code></p>

                                    <div>
                                        <button type="button" className="btn btn-link btn-sm" data-bs-toggle="modal" data-bs-target="#discount_procent">
                                            Хөнгөлөлтийн хувь
                                        </button>

                                        <div className="modal fade" id="discount_procent" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header text-center"><h4 className="text-center">Хөнгөлөлтийн хувь</h4></div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Хаах</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="button" className="btn btn-link btn-sm" data-bs-toggle="modal" data-bs-target="#fee_exempt_countries">
                                            Төлбөрөөс чөлөөлөгдсөн улс
                                        </button>

                                        <div className="modal fade" id="fee_exempt_countries" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header text-center"><h4 className="text-center">Төлбөрөөс чөлөөлөгдсөн улс</h4></div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Хаах</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-7">
                            <table className="table table-sm table-hover table-borderless">
                                <thead>
                                    <tr>
                                        <td className="col-6 align-middle">Хүсэлт гаргасан огноо</td>
                                        <td className="col-6"><DeadLine item={item}/></td>
                                    </tr>
                                    <tr>
                                        <td className="col-6 align-middle">Төлөв</td>
                                        <td className="col-6">
                                            { StatusOptions.status.options[item.status] }
                                            <small>{item.updated_by ? item.updated_at : null}</small>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="col-5">
                            <img src={ item.image_portrait } alt="" className="img-thumbnail"/><br/>
                            <img src={ item.image_document } alt="" className="img-thumbnail"/>
                        </div>
                    </div>

                </div>
            </div>



            <div className="row justify-content-center mb-3">
                { item.status == 1
                    ?
                        <Fragment>
                            <div className="col-4">
                                <button className="btn btn-secondary" onClick={ props.onDecline }>
                                    Татгалзах
                                </button>
                            </div>
                            <div className="col-4 text-end">
                                <button className="btn btn-success" onClick={ props.onApprove }>
                                    Зөвшөөрөх
                                </button>
                            </div>
                        </Fragment>
                    : null
                }

            </div>
        </div>
    )
}
