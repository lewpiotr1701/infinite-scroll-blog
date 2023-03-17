const postsContainer = document.querySelector('#posts-container')
const filter = document.querySelector('#filter')
const loaderElem = document.querySelector('#loader')

let limit = 5
let page = 1
let isLoading = false

// Event listeners

// Show more posts on scroll
window.addEventListener('scroll', showMorePosts)

// Filter
filter.addEventListener('input', filterPosts)

// Functions

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

  const dc = document.createDocumentFragment()

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
    dc.append(postElem)
    // postsContainer.appendChild(postElem)
  })

  setTimeout(() => {
    loaderElem.classList.remove('show')

    setTimeout(() => {
      postsContainer.append(dc)
    }, 300)
  }, 600)
}

// Show more posts on scroll
function showMorePosts() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    showLoader()
  }
}

// Show loader & fetch more posts
async function showLoader() {
  if (isLoading) return

  isLoading = true
  page++
  loaderElem.classList.add('show')

  await showPosts()

  isLoading = false
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toLowerCase()
  const posts = document.querySelectorAll('.post')

  posts.forEach(post => {
    const title = post.querySelector('.post-title').textContent.toLocaleLowerCase()
    const body = post.querySelector('.post-body').textContent.toLocaleLowerCase()

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'block'
    } else {
      post.style.display = 'none'
    }
  })
}

// Show initial posts
showPosts()