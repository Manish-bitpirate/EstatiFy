import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from "./components/PrivateRoute";
import Search from "./pages/Search.jsx";
import Listing from "./pages/Listing";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";

export default function App() {
  return (
    <BrowserRouter >
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/search" element={<Search/>} />
       
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        
        <Route path="/listing/:listingId" element={<Listing/>}/>

        <Route element={<PrivateRoute/>}>
          <Route path="/create-listing" element={<CreateListing/>} />
          <Route path="/update-listing/:listingId" element={<UpdateListing/>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}