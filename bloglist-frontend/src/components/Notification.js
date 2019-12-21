import React from 'react'
import './Notification.css'
import { connect } from 'react-redux'

import { Message } from 'semantic-ui-react'

const Notification = (props) => {

    // console.log(props)
    if (!props.notification.text) {
        return null
    }

    return (
        <Message positive={!props.notification.isError} error={props.notification.isError}>
            {props.notification.text}
        </Message>
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