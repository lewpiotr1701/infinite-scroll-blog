const postsContainer = document.querySelector('#posts-container')
const filter = document.querySelector('#fitler')
const loaderElem = document.querySelector('#loader')

let limit = 5
let page = 1

// Event listeners

// Show more posts on scroll
window.addEventListener('scroll', showMorePosts)

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

  posts.forEach(post => {
    const postElem = document.createElement('div')
    postElem.classList.add('post')

    postElem.innerHTML = `
      <div class="post-number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <div class="post-body">
          ${post.body}
        </div>
      </div>
    `

    postsContainer.appendChild(postElem)
  })
}

// Show more posts on scroll
function showMorePosts() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    console.log('dupa')
    showLoader()
  }
}

// Show loader & fetch more posts
function showLoader() {
  loaderElem.classList.add('show')

  setTimeout(() => {
    loaderElem.classList.remove('show')

    setTimeout(() => {
      page++
      showPosts()
    }, 300)

  }, 1000)
}

// Show initial posts
showPosts()