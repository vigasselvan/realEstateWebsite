// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/Signin"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  )
}
