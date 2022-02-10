import React from 'react'


function TabItem(props) {

    const { is_active, children, ...other_props } = props

    return (
        <li className="nav-item" role="presentation">
            <button
                className={ 'nav-link' + (is_active ? ' active' : '') }
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-selected="true"
                { ...other_props }
            >
                { children }
            </button>
        </li>
    )

}


export function TabHeader(props) {

    const { id_prefix } = props

    return (
        <ul className="nav nav-tabs" role="tablist">

            { props.children.map((child, idx) => {

                const prefix = id_prefix + '-' + idx

                return (

                    <TabItem
                        key={ idx }
                        is_active={ idx == 0 }
                        id={ `${prefix}-tab` }
                        data-bs-target={ `#${prefix}-tab-content` }
                    >
                        { child }
                    </TabItem>

                )

            })}

        </ul>
    )

}
