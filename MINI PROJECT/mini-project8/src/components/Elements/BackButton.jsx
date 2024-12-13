import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function BackButton(props) {
    return (
        <div>
            <Link to={props.to}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
        </div>
    )
}

export default BackButton