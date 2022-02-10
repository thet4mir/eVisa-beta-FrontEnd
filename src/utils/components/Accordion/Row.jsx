import React from 'react'


export function Row(props) {

    const { title, body } = props.data
    const { parent_id, expand } = props

    const id_heading = props.unique_id + '_heading'
    const id_collapse = props.unique_id

    return (
        <div className="accordion-item">

            <h2 className="accordion-header" id={ id_heading }>
                <button
                    className={ "accordion-button" + (expand ? "" : " collapsed") }
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={ '#' + id_collapse }
                    aria-expanded={ expand ? "true" : "false" }
                    aria-controls={ id_collapse }
                >
                    { title }
                </button>
            </h2>

            <div
                id={ id_collapse }
                className={ "accordion-collapse collapse" + (expand ? " show" : "") }
                aria-labelledby={ id_heading }
                data-bs-parent={ '#' + parent_id }
            >
                <div className="accordion-body">
                    <p dangerouslySetInnerHTML={{ __html: body }} />
                </div>
            </div>

        </div>
    )
}
