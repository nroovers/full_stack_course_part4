import React from 'react'
import BlogForm from './BlogForm'
import Toggable from './Toggable'
// import Blog from './Blog'
import SimpleBlog from './SimpleBlog'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'


const Blogs = (props) => {

    return (
        <div>
            <Header as='h2'>Blogs</Header>

            <Toggable buttonLabel='new note'>
                <BlogForm ></BlogForm>
            </Toggable>

            <div>
                {props.blogs ? props.blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog =>
                        // <Blog key={blog.id} blog={blog} />
                        <SimpleBlog key={blog.id} blog={blog} />
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