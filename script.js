const postsContainer = document.querySelector('#posts-container')
const filter = document.querySelector('#fitler')
const loader = document.querySelector('#loader')

let limit = 3
let page = 1

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  )

  const data = await res.json()

  return data
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts()

  console.log(posts[0])

  posts.forEach(post => {
    const postEl = document.createElement('div')
    postEl.classList.add('post')

    postEl.innerHTML = `
      <div class="post-number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <div class="post-body">
          ${post.body}
        </div>
      </div>
    `

    postsContainer.appendChild(postEl)
  })
}

// Show initial posts
showPosts()