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

const create = (newPost) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newPost, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken }