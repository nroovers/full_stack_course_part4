import React, { useState } from 'react'
import './Blog.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import blogsService from '../services/blogs'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = (props) => {

    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = () => {
        setShowDetails(!showDetails)

        console.log(props.login, props.blog)
    }

    const setButtonVisbility = () => {
        return { display: props.blog.user && props.login.username === props.blog.user.username ? '' : 'none' }
    }

    const handleLikeClick = () => {
        props.likeBlog(props.blog)
    }

    const handleRemoveClick = () => {
        if (window.confirm(`Remove blog ${props.blog.title}?`)) {
            props.removeBlog(props.blog)
        }
    }

    if (!showDetails) {
        return (
            <div className='blog' onClick={toggleDetails}>
                {props.blog.title} [{props.blog.author}]
            </div>
        )
    }
    else {
        return (
            <div className='blog'>
                <div onClick={toggleDetails}>
                    {props.blog.title} [{props.blog.author}]
                </div>
                <div>
                    <a href={props.blog.url}>{props.blog.url}</a>
                </div>
                <div>
                    {props.blog.likes} likes <button onClick={handleLikeClick}>like</button>
                </div>
                <div>
                    added by {props.blog.user ? props.blog.user.name : 'unknown'}
                </div>
                <button onClick={handleRemoveClick} style={setButtonVisbility()}>remove</button>
            </div>
        )
    }
}

Blog.propTypes = {
    // user: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired,
    // handleLikeClick: PropTypes.func.isRequired,
    // handleRemoveClick: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        login: state.login,
        // blogs: state.blogs,
        blog: ownProps.blog,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    likeBlog, removeBlog
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog)