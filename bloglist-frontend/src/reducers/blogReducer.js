import blogsService from '../services/blogs'

const initialState = []


export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const createBlog = ({ title, author, url }) => {
    return async dispatch => {
        const createdBlog = await blogsService.create({
            title,
            author,
            url,
            likes: 0,
        })
        dispatch({
            type: 'NEW_BLOG',
            data: createdBlog
        })
    }
}

export const updateBlog = (blog) => {
    return async dispatch => {
        await blogsService.update(blog.id, blog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: blog
        })
    }
}

export const likeBlog = (blog) => {
    const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
    }
    return updateBlog(updatedBlog)
}

export const addComment = (blog, comment) => {
    return async dispatch => {
        const updatedBlog = await blogsService.addComment(blog.id, comment)
        console.log('reducer addComment updatedBlog',comment, updatedBlog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: updatedBlog
        })
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogsService.remove(blog)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog
        })
    }
}

const blogReducer = (state = initialState, action) => {
    console.log('blogReducer', state, action)
    switch (action.type) {
        case 'INIT_BLOGS':
            console.log('INIT_BLOGS', state.concat(action.data))
            return action.data
        case 'NEW_BLOG':
            console.log('NEW_BLOG', state.concat(action.data))
            return state.concat(action.data)
        case 'UPDATE_BLOG':
            console.log('UPDATE_BLOG', state.concat(action.data))
            return state.map(b => b.id === action.data.id ? action.data : b)

        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data.id)

        // case 'LIKE_BLOG':
        //     const blogToLike = state.find(b => b.id === action.data)
        //     if (blogToLike) {
        //         const updatedBlog = {
        //             ...blogToLike,
        //             likes: blogToLike.likes + 1
        //         }
        //         return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
        //     }
        //     else
        //         return state
        default:
            return state
    }
}


export default blogReducer