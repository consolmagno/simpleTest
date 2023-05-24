import { ChangeEvent, MouseEvent, useState } from "react"
import { api } from "../../lib/axios"
import { useNavigate } from "react-router-dom"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function handleEmailInput(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  async function handleLogin(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    try {
      const response = await api.post("/session", { email, password })
      const { token } = response.data
      if (token) {
        localStorage.setItem('authToken', token)
        navigate("/private")
      }
    } catch (err) { alert("Usuário invalido") }
  }

  return (
    < div >
      <h1>Login</h1>
      <div>
        <input placeholder="E-mail" type="text" onChange={handleEmailInput} />
        <input placeholder="Senha" type="text" onChange={handlePasswordInput} />
        <button onClick={handleLogin}> Entrar </button>
      </div>
    </div >
  )
}