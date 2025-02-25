import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { logIn, logOut } from './store/authSlice'
import { Outlet } from "react-router-dom"
import { Header, Footer } from "./Components"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(logIn({ userData }))
        } else {
          dispatch(logOut())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>Loading</div>
  } else {
    return <div className="min-h-screen bg-gray-400  flex flex-wrap content-between" >
      <div className="w-full block" >
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  }
}

export default App