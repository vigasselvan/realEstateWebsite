// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import CreateListing from "./pages/CreateListing"
import UpdateListing from "./pages/UpdateListing"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route element={<PrivateRoute />}>                        
          <Route path="/profile" element={<Profile />} />  
          <Route path="/create-listing" element={<CreateListing />} />         
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />         
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}
