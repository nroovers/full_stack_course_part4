import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Header, List } from 'semantic-ui-react'


const UserView = (props) => {

    console.log('UserView props', props)

    if (props.user === undefined) {
        return null
    }

    console.log('props.user', props.user)

    return (
        <div>
            <Header as='h2'>{props.user.name}</Header>
            <Header as='h3'>Added blogs</Header>
            <List bulleted>
                {props.user.blogs.map(blog =>
                    <List.Item key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </List.Item>
                )}
            </List>
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