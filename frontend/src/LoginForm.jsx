import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import './App.css'

function LoginForm({ loginUrl }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const { login, username: loggedInUsername } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      })

      if (response.ok) {
        const data = await response.json()
        login(username, data.access_token)
        navigate('/')
      } 
      else if (response.status === 401) {
        setErrorMessage("Invalid username or password")
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={(e) => {handleLogin(e)}}>
      {errorMessage && <p>{errorMessage}</p>}

      Username:
      <input type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <br/>

      Password:
      <input type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <br/>

      <button type="submit">Login</button>

      {loggedInUsername &&
        <p>User {loggedInUsername} is already logged in.</p>
      }
    </form>
  )
}

export default LoginForm