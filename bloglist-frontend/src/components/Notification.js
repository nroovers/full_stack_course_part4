import React from 'react'
import './Notification.css'
import { connect } from 'react-redux'

const Notification = (props) => {

    // console.log(props)
    if (!props.notification.text) {
        return null
    }

    return (
        <div className={props.notification.isError ? 'error' : 'notif'}>
            {props.notification.text}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('Notification - mapStateToProps', state)
    return {
        notification: state.notification
    }
}

// const mapDispatchToProps = {
//   selectAnecdote
// }

export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Notification)