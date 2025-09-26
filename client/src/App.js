import './App.css';
import Navbar from './Navbar.js';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import FrontPage from './pages/FrontPage.jsx';
import Events from './pages/Events.jsx';
import ManageEvents from './pages/ManageEvents.jsx';
import VolunteerHistory from './pages/VolunteerHistory.jsx';
import AccountDetails from './pages/AccountDetails.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import Notifications from './pages/Notifications.jsx';
import ProtectedAdminRoutes from './utils/ProtectedAdminRoutes.jsx';
import ProtectedVolunteerRoutes from './utils/ProtectedVolunteerRoutes.jsx';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from './utils/AuthContext.js';


function App() {
  return (
    <div className="App">
      

      <Navbar/>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<FrontPage/>}/>
          <Route path="/log-in" element={<LogIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          
          <Route path="/events" element={<Events/>}/>
          
          
          

          

          <Route element={<ProtectedAdminRoutes/>}>
            <Route path="/create-event" element={<CreateEvent/>}/>
            <Route path="/manage-events" element={<ManageEvents/>}/>
          </Route>

          <Route element={<ProtectedVolunteerRoutes/>}>
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/account-details" element={<AccountDetails/>}/>
            <Route path="/volunteer-history" element={<VolunteerHistory/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
