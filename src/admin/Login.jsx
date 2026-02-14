import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Login = () => {

  const [email, setEmail] = useState("admin@gmail.com")
  const [password, setPassword] = useState("1234")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post("/auth/login", { email, password })

      if (res.data.success) {

        toast.success("Login Successful ✅")

        localStorage.setItem("adminLoggedIn", "true")

        setTimeout(() => {
          navigate("/admin/dashboard")
        }, 1000)
      }

    } catch (error) {
      toast.error("Invalid Credentials ❌")
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8f6f2, #ece9e4)"
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "45px",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
          transition: "0.3s"
        }}
      >
        <h2 style={{
          textAlign: "center",
          marginBottom: "35px",
          fontSize: "28px",
          letterSpacing: "1px"
        }}>
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #e0e0e0",
              fontSize: "14px",
              outline: "none"
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "25px",
              borderRadius: "10px",
              border: "1px solid #e0e0e0",
              fontSize: "14px",
              outline: "none"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg, #111, #333)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "0.3s"
            }}
          >
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login