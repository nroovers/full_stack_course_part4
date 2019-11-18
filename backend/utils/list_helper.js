const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) =>{
    if(blogs && blogs.length >0 )
    {
        const likesReducer = (accumulator, blog) => accumulator + blog.likes;
        return blogs.reduce(likesReducer, 0)
    }
    return 0
}

module.exports = {
    dummy,
    totalLikes
}