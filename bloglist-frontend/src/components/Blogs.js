import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggable from './Toggable'
import { connect } from 'react-redux'


const Blogs = (props) => {

    return (
        <div>
            <h2>blogs</h2>

            <Toggable buttonLabel='new note'>
                <BlogForm ></BlogForm>
            </Toggable>

            <div>
                {props.blogs ? props.blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    ) : ''}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blogs)