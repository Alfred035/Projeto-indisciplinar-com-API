import { createContext, useContext, useState } from 'react'
import { apiLogin, setToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [isAdm,   setIsAdm]   = useState(false)

  // Login via API
  const login = async (email, senha, adm = false) => {
    const data = await apiLogin(email, senha) // lança erro se falhar
    setUsuario({ ...data.usuario, tel: data.usuario.telefone || '' })
    setIsAdm(adm)
    return data.usuario
  }

  // Login manual (usado após cadastro automático)
  const loginDireto = (user, adm = false) => {
    setUsuario(user)
    setIsAdm(adm)
  }

  const logout = () => {
    setToken('')
    setUsuario(null)
    setIsAdm(false)
  }

  return (
    <AuthContext.Provider value={{ usuario, isAdm, login, loginDireto, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
