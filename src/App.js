import React, {useState, useEffect, setState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, handleUserProfile } from './firebase/utils';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import { setCurrentUser } from './redux/User/user.actions';
import './default.scss';

// Layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';

const HomepageWrapper = (props) => {
  return (
    <HomepageLayout {...props}>
      <Homepage />
    </HomepageLayout>
  )
}

const RegistrationWrapper = (props) => {
  return (
    <MainLayout {...props}>
      <Registration />
    </MainLayout>
  )
}

const LoginWrapper = (props) => {
  return (
    props.currentUser ? <Navigate to="/"/> :
    <MainLayout {...props}>
      <Login />
    </MainLayout>
  )
}

const RecoveryWrapper = (props) => {
  return (
    props.currentUser ? <Navigate to="/"/> :
    <MainLayout {...props}>
      <Recovery />
    </MainLayout>
  )
}

function App(props) {

  useEffect(() => {
    const { setCurrentUser } = props;

    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      }

      setCurrentUser(userAuth);
    });
  }, []);

  const { currentUser } = props;
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<HomepageWrapper />} />
          <Route path="/registration" element={currentUser ? <Navigate to="/" /> :
           <RegistrationWrapper />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> :
            <LoginWrapper />} />
          <Route path="/recovery" element={<RecoveryWrapper />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
