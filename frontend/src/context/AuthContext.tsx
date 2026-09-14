import { createContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  nombre: string
  rol: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  loginWithGoogle: (email: string) => User | null
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_USERS = [
  { id: '1', email: 'admin@gmail.com', password: 'admin123', nombre: 'Admin', rol: 'admin' as const },
  { id: '2', email: 'admin@ucin.edu.pe', password: 'admin123', nombre: 'Administrador', rol: 'admin' as const },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('smartcampus_user')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      // Error al parsear, ignorar
    }
  }, [])

  const login = (email: string, password: string): boolean => {
    const adminUser = ADMIN_USERS.find((u) => u.email === email && u.password === password)

    if (adminUser) {
      const user: User = {
        id: adminUser.id,
        email: adminUser.email,
        nombre: adminUser.nombre,
        rol: adminUser.rol,
      }
      setUser(user)
      localStorage.setItem('smartcampus_user', JSON.stringify(user))
      return true
    }

    return false
  }

  const loginWithGoogle = (email: string): User | null => {
    const user: User = {
      id: 'google_' + Date.now(),
      email: email,
      nombre: email.split('@')[0],
      rol: 'admin',
    }
    setUser(user)
    localStorage.setItem('smartcampus_user', JSON.stringify(user))
    return user
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('smartcampus_user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
