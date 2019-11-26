import React from 'react'
import './Notification.css'

const Notification = (props) => {

// console.log(props)


    if (props.notification === null) {
        return null
    }

    return (
        <div className={props.notification.isError ? 'error' : 'notif'}>
            {props.notification.text}
        </div>
    )
}

export default Notification