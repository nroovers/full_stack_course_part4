import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'

import { Header, Input, Button } from 'semantic-ui-react'


const Comments = (props) => {

    const comment = useField('text')

    const commentInputProps = { ...comment }
    delete commentInputProps.reset

    const handleAddComment = (event) => {
        event.preventDefault()

        if (comment.value) {
            props.addComment(props.blog, comment.value)
            comment.reset()
        }
    }

    return (
        <div>
            <Header as='h3'>Comments</Header>
            <div>
                <Input name="comment" {...commentInputProps} data-cy='comment-field'/> 
                <Button primary data-cy='add-comment-btn' onClick={handleAddComment}>add</Button>
            </div>
            <div>
                <ul>
                    {props.blog.comments.map(c => <li key={c}>{c}</li>)}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        blog: ownProps.blog,
        // login: state.login,
        notification: state.notification,
    }
}

const mapDispatchToProps = {
    addComment
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Comments)