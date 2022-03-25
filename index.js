async function getResultArray(){
  const POSTS_URL = 'http://jsonplaceholder.typicode.com/posts'
  const USERS_URL = 'http://jsonplaceholder.typicode.com/users'
  const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'

  const posts_response = await fetch(POSTS_URL);
  const posts = await posts_response.json()

  const users_response = await fetch(USERS_URL)
  const users = await users_response.json()

  const comments_response = await fetch(COMMENTS_URL)
  const comments = await comments_response.json()


  const mod_users = users.map((user)=> {
    user.address = `${user.address.city}, ${user.address.street}, ${user.address.suite}`
    user.website = `https://${user.website}`
    user.company = user.company.name
    user.posts = posts.filter(post => {
      post.title_crop = post.title.slice(0,20)+'...'
      return post.userId===user.id})
    if(user.name==='Ervin Howell'){
      user.posts.push(user.posts.map(post=>
        post.comments = comments.filter(comment => comment.postId === post.id)))
    }
    return user
  })
  console.log(mod_users)
  return null;
}

getResultArray()

