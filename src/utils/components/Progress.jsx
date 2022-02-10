import React from 'react'


export function Progress(props) {

    const style = {
        width: (props.value || 0) * 100 + '%',
    }

    const label = props.label || style.width

    return (
        <div class="progress">
            <div class="progress-bar progress-bar-striped" role="progressbar" style={ style }>
                { label }
            </div>
        </div>
    )
}
