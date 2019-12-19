import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('blog service set token', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log('Create', blog, config)

  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const addComment = (id, comment) => {
  return axios.post(`${baseUrl}/${id}/comments`, { text: comment })
    .then(response => response.data)
}

const update = (id, blog) => {
  return axios.put(`${baseUrl}/${id}`, blog)
    .then(response => response.data)
}

const remove = (blog) => {
  const config = {
    data: blog,
    headers: { Authorization: token },
  }

  console.log('Remove', blog, config)

  return axios.delete(`${baseUrl}/${blog.id}`, config)
    .then(response => {
      console.log(response.data)
      // return response.data
    })
}

export default { getAll, create, update, remove, setToken, addComment }