import './App.css'
import { auth } from './firebase-config'
import Home from './Components/Home/home'
import { useEffect, useState } from 'react'
import Login from './Components/Auth/login'
import Signup from './Components/Auth/signup'
import Header from './Components/Header/header'
import { onAuthStateChanged } from 'firebase/auth'
import AdminLogin from './Components/Auth/adminLogin'
import EditEntry from './Components/Utility/editEntry'
import AuthHeader from './Components/Header/authHeader'
import PageNotFound from './Components/Utility/404/pageNotFound'
import AdminProfile from './Components/AdminProfile/adminProfile'
import { Link, Route, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

export const AuthStatus = {
  NOT_DETERMINED: 0,
  NOT_LOGGED_IN: 1,
  LOGGED_IN: 2
};


function App() {
  return (<Router><AppContent /></Router>);
}

export default App;


const AppContent = () => {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState(AuthStatus.NOT_DETERMINED);
  const hideHeaderPaths = ['/', '/login', '/login-admin', '/signup', '/404'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthStatus(AuthStatus.LOGGED_IN);
      } else {
        setAuthStatus(AuthStatus.NOT_LOGGED_IN);
      }
    });
    return () => unsubscribe();
  }, []);

  const shouldShowAuthHeader = () => {
    if (location.pathname === '/' && authStatus === AuthStatus.LOGGED_IN) { return false; }
    return hideHeaderPaths.includes(location.pathname);
  };
  return (
    <div>
      {shouldShowAuthHeader() ? <AuthHeader /> : location.pathname === '/' ? <></> : <Header />}
      <div className="main-content">
        <Switch>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/404"><PageNotFound /></Route>
          <Route exact path="/edit-user"><EditEntry /></Route>
          <Route exact path="/login"><Link to={{ pathname: "/" }} /></Route>
          <Route exact path="/login-admin"><AdminLogin setAuthStatus={setAuthStatus} /></Route>
          <Route exact path="/">{authStatus === AuthStatus.LOGGED_IN ? <Home /> : <Login setAuthStatus={setAuthStatus} />}</Route>
          <Route exact path="/admin">{authStatus === AuthStatus.LOGGED_IN ? <AdminProfile /> : <PageNotFound />}</Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  )
}
