import ProfilePage from './Components/ProfilePage'
import Contact from './Components/Contact'
import ServicePage from './Components/servicePage'
import About from './Components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotificationPage from './Components/NotificationPage'
const Home=()=>{
  return(
    <h1> Hello ,Home</h1>
  )
}
function App() {
  return (
    <div className="App">
    
    <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/service" element={<ServicePage/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Notification" element={<NotificationPage/>} />
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
