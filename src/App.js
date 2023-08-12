import React, {useState, useEffect, setState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { auth, handleUserProfile } from './firebase/utils';
// import { onAuthStateChanged } from 'firebase/auth';
// import { doc, onSnapshot } from "firebase/firestore";
import { setCurrentUser, checkUserSession } from './redux/User/user.actions';
import './default.scss';

// HOC 
import { WithAuth, WithoutAuth } from './hoc/withAuth';

// Layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';

const HomepageWrapper = (props) => {
  return (
    <HomepageLayout {...props}>
      <Homepage />
    </HomepageLayout>
  )
}

const RegistrationWrapper = (props) => {
  return (
    <WithoutAuth>
      <MainLayout {...props}>
        <Registration />
      </MainLayout>
    </WithoutAuth>
  )
}

const LoginWrapper = (props) => {
  return (
    <WithoutAuth>
      <MainLayout {...props}>
        <Login />
      </MainLayout>
    </WithoutAuth> 
  )
}

const RecoveryWrapper = (props) => {
  return (
      <MainLayout {...props}>
          <Recovery />
      </MainLayout>
  )
}

const DashboardWrapper = (props) => {
  return (
    <WithAuth>
      <MainLayout {...props}>
        <Dashboard />
      </MainLayout>
    </WithAuth>
  )
}

function App(props) { 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
 
  }, []);

  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<HomepageWrapper />} />
          <Route path="/registration" element={<RegistrationWrapper />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/recovery" element={<RecoveryWrapper />} />
          <Route path="/dashboard" element={<DashboardWrapper />} />
      </Routes>
    </div>
  );
}

export default App;
