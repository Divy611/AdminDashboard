import './App.css'
import { useState } from 'react'
import Home from './Components/Home/home'
import ACCA from './Components/ACCA/acca'
import Login from './Components/Auth/login'
import Signup from './Components/Auth/signup'
import Header from './Components/Header/header'
import AdminLogin from './Components/Auth/adminLogin'
import EditEntry from './Components/Utility/editEntry'
import AuthHeader from './Components/Header/authHeader'
import MasterData from './Components/ACCA/masterData/masterData'
import PageNotFound from './Components/Utility/404/pageNotFound'
import AdminProfile from './Components/AdminProfile/adminProfile'
import Skillenrollments from './Components/ACCA/skillenrollments'
import TXDetails from './Components/subjectDetails/skill/txDetails'
import AADetails from './Components/subjectDetails/skill/aaDetails'
import FRDetails from './Components/subjectDetails/skill/frDetails'
import FMDetails from './Components/subjectDetails/skill/fmDetails'
import PMDetails from './Components/subjectDetails/skill/pmDetails'
import CBLDetails from './Components/subjectDetails/skill/cblDetails'
import LeadDetails from './Components/StudentData/details/leadDetails'
import StudentDetails from './Components/subjectDetails/studentDetails'
import FADetails from './Components/subjectDetails/knowledge/faDetails'
import MAdetails from './Components/subjectDetails/knowledge/maDetails'
import CPAEnrollments from './Components/CPAEnrollments/cpaenrollments'
import BTDetails from './Components/subjectDetails/knowledge/btDetails'
import KnowledgeEnrollments from './Components/ACCA/knowledgeEnrollments'
import Optionals from './Components/ACCA/professionalEnrollments/optionals'
import Totalenrollments from './Components/TotalEnrollments/totalenrollments'
import Essentials from './Components/ACCA/professionalEnrollments/essentials'
import EditStudentProfile from './Components/subjectDetails/editStudentProfile'
import MasterStudentData from './Components/TotalEnrollments/studentDetailsMaster'
import SkillDevEnrollment from './Components/SkillDevEnrollments/skilldevenrollments'
import AFMDetails from './Components/subjectDetails/professional/optionals/afmDetails'
import AAADetails from './Components/subjectDetails/professional/optionals/aaaDetails'
import ATXDetails from './Components/subjectDetails/professional/optionals/atxDetails'
import APMDetails from './Components/subjectDetails/professional/optionals/apmDetails'
import SBLDetails from './Components/subjectDetails/professional/essentials/sblDetails'
import SBRDetails from './Components/subjectDetails/professional/essentials/sbrDetails'
import ProfessionalEnrollments from './Components/ACCA/professionalEnrollments/professionalEnrollments'
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

  const shouldShowAuthHeader = () => {
    if (location.pathname === '/' && authStatus === AuthStatus.LOGGED_IN) { return false; }
    return hideHeaderPaths.includes(location.pathname);
  };
  return (
    <div>
      {shouldShowAuthHeader() ? <AuthHeader /> : location.pathname === '/'?<></>:<Header/>}
      <div className="main-content">
        <Switch>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/404"><PageNotFound /></Route>
          <Route exact path="/edit-user"><EditEntry /></Route>
          <Route exact path="/login"><Link to={{ pathname: "/" }} /></Route>
          <Route exact path="/login-admin"><AdminLogin setAuthStatus={setAuthStatus} /></Route>
          <Route exact path="/">{authStatus === AuthStatus.LOGGED_IN ? <Home /> : <Login setAuthStatus={setAuthStatus} />}</Route>
          <Route exact path="/admin">{authStatus === AuthStatus.LOGGED_IN ? <AdminProfile /> : <PageNotFound/>}</Route>
          <Route exact path="/optionals">{authStatus === AuthStatus.LOGGED_IN ? <Optionals /> : <PageNotFound/>}</Route>
          <Route exact path="/details-tx">{authStatus === AuthStatus.LOGGED_IN ? <TXDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-aa">{authStatus === AuthStatus.LOGGED_IN ? <AADetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-fr">{authStatus === AuthStatus.LOGGED_IN ? <FRDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-fm">{authStatus === AuthStatus.LOGGED_IN ? <FMDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-ma">{authStatus === AuthStatus.LOGGED_IN ? <MAdetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-bt">{authStatus === AuthStatus.LOGGED_IN ? <BTDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-fa">{authStatus === AuthStatus.LOGGED_IN ? <FADetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-pm">{authStatus === AuthStatus.LOGGED_IN ? <PMDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/acca-enrollments">{authStatus === AuthStatus.LOGGED_IN ? <ACCA /> : <PageNotFound/>}</Route>
          <Route exact path="/essentials">{authStatus === AuthStatus.LOGGED_IN ? <Essentials /> : <PageNotFound/>}</Route>
          <Route exact path="/details-atx">{authStatus === AuthStatus.LOGGED_IN ? <ATXDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-cbl">{authStatus === AuthStatus.LOGGED_IN ? <CBLDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-aaa">{authStatus === AuthStatus.LOGGED_IN ? <AAADetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-sbr">{authStatus === AuthStatus.LOGGED_IN ? <SBRDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-afm">{authStatus === AuthStatus.LOGGED_IN ? <AFMDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-apm">{authStatus === AuthStatus.LOGGED_IN ? <APMDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/details-sbl">{authStatus === AuthStatus.LOGGED_IN ? <SBLDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/master-data">{authStatus === AuthStatus.LOGGED_IN ? <MasterData /> : <PageNotFound/>}</Route>
          <Route exact path="/lead-details">{authStatus === AuthStatus.LOGGED_IN ? <LeadDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/student-details">{authStatus === AuthStatus.LOGGED_IN ? <StudentDetails /> : <PageNotFound/>}</Route>
          <Route exact path="/cpa-enrollments">{authStatus === AuthStatus.LOGGED_IN ? <CPAEnrollments /> : <PageNotFound/>}</Route>
          <Route exact path="/total-enrollments">{authStatus === AuthStatus.LOGGED_IN ? <Totalenrollments /> : <PageNotFound/>}</Route>
          <Route exact path="/skill-enrollments">{authStatus === AuthStatus.LOGGED_IN ? <Skillenrollments /> : <PageNotFound/>}</Route>
          <Route exact path="/edit-student-profile">{authStatus === AuthStatus.LOGGED_IN ? <EditStudentProfile /> : <PageNotFound/>}</Route>
          <Route exact path="/skill-dev-enrollments">{authStatus === AuthStatus.LOGGED_IN ? <SkillDevEnrollment /> : <PageNotFound/>}</Route>
          <Route exact path="/student-details-master">{authStatus === AuthStatus.LOGGED_IN ? <MasterStudentData /> : <PageNotFound/>}</Route>
          <Route exact path="/knowledge-enrollments">{authStatus === AuthStatus.LOGGED_IN ? <KnowledgeEnrollments /> : <PageNotFound/>}</Route>
          <Route exact path="/professional-enrollments">{authStatus === AuthStatus.LOGGED_IN ? <ProfessionalEnrollments /> : <PageNotFound/>}</Route>
        </Switch>
      </div>
    </div>
  )
}
