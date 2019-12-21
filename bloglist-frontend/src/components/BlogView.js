import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'

import { Button, Icon } from 'semantic-ui-react'

const BlogView = withRouter((props) => {

    const setButtonVisbility = () => {
        return { display: props.blog.user && props.login.username === props.blog.user.username ? '' : 'none' }
    }

    const handleRemoveClick = () => {
        if (window.confirm(`Remove blog ${props.blog.title}?`)) {
            props.removeBlog(props.blog)
            props.setNotification(`blog ${props.blog.title} removed`, false, 5)
            props.history.push('/')
        }
    }

    if (!props.blog) return null

    return (
        <div>

            <div><h2>{props.blog.title} - {props.blog.author}</h2><Button icon onClick={handleRemoveClick} style={setButtonVisbility()}>
                <Icon name='trash' />
            </Button> </div>

            <div>added by {props.blog.user ? props.blog.user.name : 'unknown'}</div>
            <div>{props.blog.likes} likes
                        <Button icon data-cy='like-btn' onClick={() => { props.likeBlog(props.blog) }}>
                    <Icon name='like' />
                </Button></div>
            <div><a href={props.blog.url}>{props.blog.url}</a></div>
            <br />

            <Comments blog={props.blog}></Comments>
        </div>
    )
})

const getBlog = (state, ownProps) => {
    console.log('getBlog', state, ownProps)
    return state.blogs.find(b => b.id === ownProps.blogid)
}

const mapStateToProps = (state, ownProps) => {
    return {
        blog: getBlog(state, ownProps),
        login: state.login,
        notification: state.notification,
    }
}

const mapDispatchToProps = {
    likeBlog, removeBlog, setNotification
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(BlogView)