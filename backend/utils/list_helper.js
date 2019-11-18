const lodash = require('lodash')


const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if (blogs && blogs.length > 0) {
        const likesReducer = (accumulator, blog) => accumulator + blog.likes;
        return blogs.reduce(likesReducer, 0)
    }
    return 0
}

const favoriteBlog = (blogs) => {
    if (blogs && blogs.length > 0) {
        return blogs.sort((b1, b2) => {
            return b1.likes < b2.likes
        })[0]
    }
    return undefined
}

const mostBlogs = (blogs) => {
    if (blogs && blogs.length > 0) {
        const countResult = Object.entries(lodash.countBy(blogs, 'author'));
        const mostBlogsResult = countResult.sort((a, b) => a[1] < b[1])[0];
        // console.log(countResult)
        return { author: mostBlogsResult[0], blogs: mostBlogsResult[1] };
    }
    return undefined
}

const mostLikes = (blogs) => {
    if (blogs && blogs.length > 0) {
        const likesResult = lodash.reduce(blogs, function (result, blog) {
            if (!result[blog.author]) { result[blog.author] = 0; }
            result[blog.author] += blog.likes;
            return result;
        }, {});
        // console.log(likesResult)
        const mostLikesResult = Object.entries(likesResult).sort((a, b) => a[1] < b[1])[0];
        // console.log(mostLikesResult)
        return { author: mostLikesResult[0], likes: mostLikesResult[1] };
    }
    return undefined
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}