import React from 'react'
import { connect } from 'react-redux'



const UserView = (props) => {

    console.log('UserView props', props)

    if (props.user === undefined) {
        return null
    }

    console.log('props.user', props.user)

    return (
        <div>
            <h2>{props.user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {props.user.blogs.map(blog => {
                    console.log('blog', blog)
                    return <li key={blog.id}>
                    {blog.title}
                </li>
                })}
            </ul>
        </div>
    )
}

const getUser = (state, ownProps) => {
    return state.users.find(u => u.id === ownProps.userid)
}

const mapStateToProps = (state, ownProps) => {
    return {
        blogs: state.blogs,
        user: getUser(state, ownProps),
    }
}

export default connect(
    mapStateToProps
)(UserView)