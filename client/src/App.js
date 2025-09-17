import './App.css';
import Navbar from './Navbar.js';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import FrontPage from './pages/FrontPage.jsx';
import Events from './pages/Events.jsx';
import ManageEvents from './pages/ManageEvents.jsx';
import VolunteerHistory from './pages/VolunteerHistory.jsx';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Navbar/>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage/>}/>
          <Route path="/log-in" element={<LogIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/manage-events" element={<ManageEvents/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/volunteer-history" element={<VolunteerHistory/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
