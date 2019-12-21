import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

const UserList = (props) => (
    <div>
        <Header as='h2'>Users</Header>
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {props.users.map(u =>
                    <tr key={u.username}>
                        <td>
                            <Link to={`/users/${u.id}`}>{u.name}</Link>
                        </td>
                        <td>{u.blogs.length}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
)

const mapStateToProps = (state) => {
    return {
        // blogs: state.blogs,
        users: state.users,
    }
}

export default connect(
    mapStateToProps
)(UserList)