import React, { Fragment } from 'react'


export function KindDateDetails(props) {

    const values = props.values || []

    return (
        <Fragment>
            <dt className="col-2">Минимум утга:</dt>
            <dd className="col-10">
                { values.min_now_delta
                    ?
                        <Fragment>
                            { values.min_now_delta ? '[одоо] ' + Math.round(values.min_now_delta/24/60/60) + ' хоног': null}
                        </Fragment>
                    :
                        <Fragment>
                            { values.min_date ? 'огноо: ' + values.max_date : null}
                        </Fragment>
                }
                <br/><small className="text-danger">{ values.min_date_error }</small>
            </dd>

            <dt className="col-2">Максимум утга:</dt>
            <dd className="col-10">
                { values.max_now_delta
                    ?
                        <Fragment>
                            { values.max_now_delta ? '[одоо] ' + Math.round(values.max_now_delta/24/60/60) + ' хоног': null}
                        </Fragment>
                    :
                        <Fragment>
                            { values.max_date ? 'огноо: ' + values.max_date : null}
                        </Fragment>
                }
                <br/><small className="text-danger">{ values.max_date_error }</small>
            </dd>
        </Fragment>
    )

}