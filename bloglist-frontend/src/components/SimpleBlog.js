import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Blog.css'

const SimpleBlog = (props) => (
    <div className='blog'>
        <div>
            <Link to={`/blogs/${props.blog.id}`}> {props.blog.title} - {props.blog.author}</Link>
        </div>
        {/* <div>
            blog has {blog.likes} likes
            <button onClick={onClick}>like</button>
        </div> */}
    </div>
)

const mapStateToProps = (state, ownProps) => {
    return {
        blog: ownProps.blog,
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SimpleBlog)