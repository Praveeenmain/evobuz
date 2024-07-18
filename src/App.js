import ProfilePage from './Components/ProfilePage'
import Contact from './Components/Contact'
import ServicePage from './Components/servicePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    
    <BrowserRouter>
        <Routes>
          <Route index element={<Contact />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/service" element={<ServicePage/>} />
         
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
