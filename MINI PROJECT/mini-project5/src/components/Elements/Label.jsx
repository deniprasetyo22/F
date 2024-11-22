import React from 'react'

function Label(props) {
    return (
        <label htmlFor={props.htmlFor} className="block text-sm font-medium text-gray-700 mb-2">{props.children}</label>
    )
}

export default Label