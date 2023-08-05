import React, {useState, useEffect, setState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import './default.scss';

// Layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';

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

const initialState = {
  currentUser: null
};

function App() {
  
  const [state, setState] = useState(initialState);

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        onSnapshot(userRef, (snapshot) => {
          setState({ currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      setState({...initialState});
    });
  }, []);

  const { currentUser } = state;
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<HomepageWrapper currentUser={currentUser}/>} />
          <Route path="/registration" element={currentUser ? <Navigate to="/" /> :
           <RegistrationWrapper currentUser={currentUser}/>} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> :
            <LoginWrapper currentUser={currentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
