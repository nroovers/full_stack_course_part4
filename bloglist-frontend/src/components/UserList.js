import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => (
    <div>
        <h2>Users</h2>
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {props.users.map(u =>
                    <tr key={u.username}>
                        <td>
                            <Link to={`/users/${u.username}`}>{u.name}</Link>
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