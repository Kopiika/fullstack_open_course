import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import styles from './App.module.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sorted)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('Token set from localStorage:', user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log('Token set:', user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut =() => {
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      console.log('Token being used:', blogService.token)
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setSuccessMessage(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('error creating blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const updateBlog = async (id, updatedBlog, userObj) => {
    const returned = await blogService.update(id, updatedBlog)
    const blogWithUser = {
      ...returned,
      user: userObj
    }
    const updatedBlogs = blogs.map(b => b.id !== id ? b : blogWithUser)

    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type="error"/>
        <Notification message={successMessage} type="success" />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id)) // видаляємо зі state
      setSuccessMessage('Blog deleted successfully')
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      console.log(error)
      setErrorMessage('Error deleting blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      <div className={styles.topBar}>
        <p className={styles.userInfo}><span className={styles.username}>{user.name}</span> logged in</p>
        <button className={styles.logoutButton} onClick={handleLogOut}>Log out</button>
      </div>

      <h2 className={styles.title}>Blogs</h2>
      <div className={styles.newBlogContainer}>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef} buttonClass="newBlogButton">
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>

      <div className={styles.blogList}>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            currentUser={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}/>
        )}
      </div>

    </div>
  )
}

export default App

