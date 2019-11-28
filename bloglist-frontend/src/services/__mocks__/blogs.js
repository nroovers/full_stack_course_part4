const blogs = [
  {
    title: 'Travel blog',
    author: 'Aava',
    url: 'http://www.travel.com',
    likes: 5,
    user: {
      username: 'user1',
      name: 'Test user'
    }
  },
  {
    title: 'React blog',
    author: 'Nicolai',
    url: 'http://www.react.com',
    likes: 3,
    user: {
      username: 'user1',
      name: 'Test user'
    }
  },
  {
    title: 'Toy blog',
    author: 'Lilja',
    url: 'http://www.lelut.fi',
    likes: 7,
    user: {
      username: 'user2',
      name: 'Test user2'
    }
  }
]


const setToken = (token) => {}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }