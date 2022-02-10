import React, { useState, Fragment } from 'react'

import { DatePicker } from '@admin/components/Form'



export function DateSearch(props) {

    const [ start_value, setStartValue ] = useState()
    const [ end_value, setEndValue ] = useState()

    function handleStartDate(date) {
        props.getStartDate(date)
    }

    function handleEndDate(date) {
        props.getEndDate(date)
    }

    return (
        <div className="row row-cols-2">
            <div className="col">
                <DatePicker
                    id="#start_date"
                    name="start_date"
                    value={ start_value }
                    onChange={ (name, value ) => {
                            setStartValue(value);
                            handleStartDate(value)
                        }
                    }
                />
            </div>
            <div className="col">
                <DatePicker
                    id="#end_date"
                    name="end_date"
                    value={ end_value }
                    onChange={ (name, value) => {
                            setEndValue(value);
                            handleEndDate(value)
                        }
                    }
                />
            </div>
        </div>
    )

}