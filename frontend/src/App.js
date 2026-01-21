import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { UseAuthContext } from './hooks/useAuthContext';

// import pages to be used in routes
import Home from './pages/home';
import Navbar from './components/navbar';
import Signup from './pages/signup';
import Login from './pages/login';

function App() {
  //import global state of user from UseAuthContext. which can either be null or contain email and token
  const {user} = UseAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>

          <Route path='/' element={user ? <Home /> : <Navigate to= "/login" />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to ='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to ='/' />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
