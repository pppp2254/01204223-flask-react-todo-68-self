import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null)
  const [username, setUsername] = useState(localStorage.getItem('username') || null)

  function login(username, token) {
    setAccessToken(token)
    setUsername(username)
    localStorage.setItem('accessToken', token)
    localStorage.setItem('username', username)
  }

  function logout() {
    setAccessToken(null)
    setUsername(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
  }

  return (
    <AuthContext.Provider value={{ username, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}