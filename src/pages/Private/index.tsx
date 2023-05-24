import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { api } from "../../lib/axios"
import { UserProps } from "../../types/User"


export function Private() {
  const [user, setUser] = useState<UserProps | null>(null)
  useEffect(() => {
    async function getProfile() {
      const token = localStorage.getItem('authToken')
      const response = await api.get("/me", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      setUser({ name: response.data.user.name, email: response.data.user.email })
    }
    getProfile()
  }, [])

  return (
    <div>
      <Header />
      <h1>Página Privada</h1>
      <p>Olá, {user?.name}</p>
      <p>Seu e-mail: {user?.email}</p>
    </div>
  )
}